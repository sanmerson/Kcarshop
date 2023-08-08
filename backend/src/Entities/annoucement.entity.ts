import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Image } from "./image.entity";
import { Comments } from "./comments.entity";
import { User } from "./user.entity";

@Entity("annoucements")
export class Annoucement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  brand: string;

  @Column()
  banner: string;

  @Column()
  model: string;

  @Column({ length: 120 })
  year: string;

  @Column({ length: 120 })
  fip: string;

  @Column()
  fuel: string;

  @Column("int")
  mileage: number;

  @Column()
  color: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column({ default: false })
  is_bargain: boolean;

  @Column({ default: true })
  is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Image, (image) => image.annoucement, { onDelete: "CASCADE" })
  images: Image[];

  @OneToMany(() => Comments, (comments) => comments.announcement, {
    onDelete: "CASCADE",
  })
  comments: Comments[];

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.annoucement, { onDelete: "CASCADE" })
  user: User;
}
