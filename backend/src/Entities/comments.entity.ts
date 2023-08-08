import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Annoucement } from "./annoucement.entity";
import { BlobOptions } from "buffer";

@Entity("comments")
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user: User;

  @Column({ default: false })
  is_updated: boolean;

  @JoinColumn()
  @ManyToOne(() => Annoucement, (annoucement) => annoucement.comments, {
    onDelete: "CASCADE",
  })
  announcement: Annoucement;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
