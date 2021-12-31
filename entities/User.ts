import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text",
        unique: true,
    })
    userName: string;

    @Column({
        type: "text",
        unique: true,
    })
    email: string;

    @Column({
        type: "text",
    })
    password: string;
}
