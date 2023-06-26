import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { DeliveryStatus } from "./deliveryStatus";


@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column({
    type: "varchar",
    length: 20,
  })
  deliveryStatus: string;
}
