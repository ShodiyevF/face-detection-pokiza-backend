import { CreateBranchDto, UpdateBranchDto } from '@dtos/branches.dto';
import { ControllersEntity } from '@/entities/controllers.entity';
import { HttpException, Errors } from '@shared/HttpException';
import { BranchEntity } from '@entities/branches.entity';
import { UserEntity } from '@entities/users.entity';

export class BranchService {
    async getBranches(): Promise<BranchEntity[]> {
        const branches = await BranchEntity.find();

        return branches;
    }

    async createBranch(body: CreateBranchDto): Promise<BranchEntity> {
        const [branch] = await BranchEntity.findBy({ branchName: body.branchName });

        if (branch) {
            throw new HttpException(400, Errors.BRANCH_ALREADY_EXISTS, 'Bunday filial mavjud!');
        }

        const newBranch = await BranchEntity.create({ branchName: body.branchName }).save();

        return newBranch;
    }

    async updateBranch(params: { id: string }, body: Partial<UpdateBranchDto>): Promise<BranchEntity> {
        const [branch] = await BranchEntity.findBy({ id: params.id });

        if (!branch) {
            throw new HttpException(404, Errors.BRANCH_NOT_FOUND, 'Bunday filial topilmadi!');
        }

        const [checkBranchName] = await BranchEntity.findBy({ branchName: body.branchName });

        if (checkBranchName) {
            throw new HttpException(403, Errors.BRANCH_ALREADY_EXISTS, 'Bunday filial mavjud!');
        }

        const editedBranch = await BranchEntity.save({ id: params.id, ...body });

        return editedBranch;
    }

    async deleteBranch(params: { id: string }): Promise<boolean> {
        const [branch] = await BranchEntity.find({ where: { id: params.id } });

        if (!branch) {
            throw new HttpException(404, Errors.BRANCH_NOT_FOUND, 'Bunday filial topilmadi!');
        }

        const controllers = await ControllersEntity.find({ relations: { branch: true } });

        for (const controller of controllers) {
            if (controller.branch.id == params.id) {
                throw new HttpException(403, Errors.REFERENCES_WITH_USER, 'Filialni ochirish mumkin emas!');
            }
        }

        const users = await UserEntity.find({ relations: { branch: true } });

        for (const user of users) {
            if (user.branch.id == params.id) {
                throw new HttpException(403, Errors.REFERENCES_WITH_USER, 'Filialni ochirish mumkin emas!');
            }
        }

        for (const user of users) {
            const allowedBranchIds = user.allowedBranches;

            if (allowedBranchIds.includes(params.id)) {
                await UserEntity.update({ id: user.id }, { allowedBranches: allowedBranchIds.filter(id => id !== params.id) });
            }
        }

        await BranchEntity.delete({ id: params.id });

        return true;
    }
}
