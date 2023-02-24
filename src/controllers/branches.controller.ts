import { BranchDto, CreateBranchDto, UpdateBranchDto } from '@/dtos/branches.dto';
import { BranchService } from '@services/branches.service';
import { NextFunction, Request, Response } from 'express';
import { stringValuesToPrimitives } from '@shared/utils';
import { serializer } from '@shared/serializer';

class BranchController {
    branchService = new BranchService();

    getBranches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const branches = await this.branchService.getBranches();

            res.status(200).json(serializer(BranchDto, branches));
        } catch (error) {
            next(error);
        }
    };

    createBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body: CreateBranchDto = req.body;
            const branch = await this.branchService.createBranch(body);

            res.status(201).json({
                status: 201,
                message: 'Branch successfully created!',
                data: serializer(BranchDto, branch),
            });
        } catch (error) {
            next(error);
        }
    };

    updateBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = stringValuesToPrimitives(req.params) as { id: string };
            const body: UpdateBranchDto = req.body;

            const branch = await this.branchService.updateBranch(params, body);

            res.status(200).json({
                status: 201,
                message: 'Branch successfully updated!',
                data: serializer(BranchDto, branch),
            });
        } catch (error) {
            next(error);
        }
    };

    deleteBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = stringValuesToPrimitives(req.params) as { id: string };

            await this.branchService.deleteBranch(params);

            res.status(200).json({
                status: 201,
                message: 'Branch successfully deleted!',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default BranchController;
