import { BadRequestException, Injectable } from "@nestjs/common";
import { BookmarkRepository } from "./bookmark.repository";
import { Bookmark } from "./bookmark.entity";
import { StoreRepository } from "../store/store.repository";

@Injectable()
export class BookmarkService {
  constructor(
    private bookmarkRepository: BookmarkRepository,
    private storeRepository: StoreRepository
  ) { }

  async addBookmark(userId: number, storeId: number, isBookmarked: boolean): Promise<Bookmark> {
    const isStoreExist = await this.storeRepository.existStoreById(storeId);
    if (!isStoreExist) {
      throw new BadRequestException('존재하지 않는 매장입니다.');
    }

    const findBookmark = await this.bookmarkRepository.findByUserIdAndRestaurantId(userId, storeId);
    if (findBookmark == null) {
      return await this.saveNewBookmark(userId, storeId, isBookmarked);
    }
    findBookmark.isBookmarked = isBookmarked;
    return await this.bookmarkRepository.save(findBookmark);
  }

  private saveNewBookmark(userId: number, restaurantId: number, isBookmarked: boolean) {
    const bookmark = new Bookmark();
    bookmark.userId = userId;
    bookmark.restaurantId = restaurantId;
    bookmark.isBookmarked = isBookmarked;
    return this.bookmarkRepository.save(bookmark);
  }
}