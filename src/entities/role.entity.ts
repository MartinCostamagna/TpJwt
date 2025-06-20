import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Permission, (permission) => permission.roles, { eager: true })
    @JoinTable({ name: 'role_permissions' })
    permissions: Permission[];

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}