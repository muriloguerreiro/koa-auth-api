import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export type UserRole = "admin" | "user";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ type: "varchar", length: 50 })
    role: UserRole;

    @Column({ name: "is_onboarded", type: "boolean", default: false })
    isOnboarded: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt?: Date | null;

    constructor(name: string, email: string, password:string, role: UserRole = "user") {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isOnboarded = false;
    }
}
