import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users.role'})
export class UsersRoleEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'varchar'})
    roleName: string;

    @Column({name: 'datetime'})
    createdAt: Date;
}
