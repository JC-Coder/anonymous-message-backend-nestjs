import { Message } from "src/message/entities/message.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Roles {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.user, {onDelete: "CASCADE"})
  messages: Message[];

  @Column({type: 'enum', enum: Roles, default: Roles.USER})
  role: Roles;

  @Column()
  joinedDate: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @BeforeInsert()
  updateJoinedDate(){
    let monthArray = ['January', 'Febuary' ,'March','April','May','June','July', 'August', 'Sepetember', 'October','November','December'];
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();

    this.joinedDate = `${monthArray[month]}, ${year}`;
  }
}