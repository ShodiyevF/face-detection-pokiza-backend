import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserEntity } from '@entities/users.entity';

@Entity({ name: 'branches' })
export class BranchEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true })
    branchName: string;

    @OneToMany(() => UserEntity, user => user.branch)
    users: UserEntity[];

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;
}
