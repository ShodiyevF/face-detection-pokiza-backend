import { PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, ManyToOne, Entity, Column } from 'typeorm';
import { BranchEntity } from './branches.entity';

@Entity({ name: 'controllers' })
export class ControllersEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar' })
    api: string;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @ManyToOne(() => BranchEntity, branch => branch.users, { nullable: false })
    branch: BranchEntity;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;
}
