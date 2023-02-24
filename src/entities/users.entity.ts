import { ActionEntity } from './actions.entity';
import { BranchEntity } from './branches.entity';
import bcrypt from 'bcrypt';
import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BeforeUpdate,
    BeforeInsert,
    BaseEntity,
    OneToMany,
    AfterLoad,
    ManyToOne,
    Entity,
    Column,
    AfterUpdate,
    AfterInsert,
} from 'typeorm';
import { Logform } from 'winston';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar' })
    userImg: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'boolean' })
    isAdmin: boolean;

    @Column({ type: 'varchar' })
    allowedBranches: string[];

    @ManyToOne(() => BranchEntity, branch => branch.users, { nullable: false })
    branch: BranchEntity;

    @OneToMany(() => ActionEntity, action => action.user)
    actions: ActionEntity[];

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;

    private saltRounds = 15;

    @AfterLoad()
    async afterLoad() {
        // parse allowed branches before returning result
        this.allowedBranches = (this.allowedBranches as unknown as string).split(',');
    }

    @BeforeUpdate()
    async beforeUpdate() {
        console.log('before');
        console.log(this.password);

        if (this.password) {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hash = await bcrypt.hash(this.password, salt);

            this.password = hash;
        }
    }

    @BeforeInsert()
    async beforeInsert() {
        if (this.password) {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hash = await bcrypt.hash(this.password, salt);

            this.password = hash;
        }
    }

    static async checkPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}
