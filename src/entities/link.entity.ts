import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./index";

@Entity("links")
export class Link {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 10 })
  shortened_link: string;

  @Column()
  original_link: string;

  @Column({ length: 200 })
  title: string;

  @Column({ default: 0 })
  visits: number;

  @ManyToOne(() => User, (user) => user.links, { onDelete: "CASCADE" })
  user: User;
}
