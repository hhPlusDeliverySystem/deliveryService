import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number;

  @Column()
  name: string;

  @Column()
  price: number;

}