import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn } from "typeorm";

export type UserRole = "admin" | "user";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    name?: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

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

    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
        this.role = "user";
        this.isOnboarded = false;
    }
}
