import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cep: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  number: string;

  @Column()
  road: string;

  @Column({ nullable: true })
  complement: string;
}
