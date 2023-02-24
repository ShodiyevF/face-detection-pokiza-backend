import { PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, ManyToOne, Entity, Column } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity({ name: 'actions' })
export class ActionEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: 'checkIn' | 'checkOut';

    @ManyToOne(() => UserEntity, user => user.actions, { nullable: false })
    user: UserEntity;

    @Column({ type: 'datetime' })
    actionDateTime: Date;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;
}
