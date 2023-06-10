import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { Exclude } from "class-transformer";
import { Link } from "./index";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 127 })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Link, (link) => link.user, { cascade: true })
  links: Link[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
