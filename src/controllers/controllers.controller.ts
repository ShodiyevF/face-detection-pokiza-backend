import { ControllerDto, CreateControllerDto, UpdateControllerDto } from '@/dtos/controllers.dto';
import { ControllersService } from '@services/controllers.service';
import { NextFunction, Request, Response } from 'express';
import { serializer } from '@shared/serializer';
import { stringValuesToPrimitives } from '@/shared/utils';

class ControllersController {
    controllersService = new ControllersService();

    getControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controllers = await this.controllersService.getControllers();

            res.status(200).json(serializer(ControllerDto, controllers));
        } catch (error) {
            next(error);
        }
    };

    createControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body as CreateControllerDto;
            const controllers = await this.controllersService.createControllers(body);

            res.status(200).json({
                status: 200,
                message: 'The controller successfully created!',
                data: serializer(ControllerDto, controllers),
            });
        } catch (error) {
            next(error);
        }
    };

    updateControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body as UpdateControllerDto;
            const params = stringValuesToPrimitives(req.params) as { id: string };
            const controllers = await this.controllersService.updateControllers(body, params);

            res.status(200).json({
                status: 200,
                message: 'The controller successfully updated!',
                data: serializer(ControllerDto, controllers),
            });
        } catch (error) {
            next(error);
        }
    };

    deleteControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = stringValuesToPrimitives(req.params) as { id: string };
            await this.controllersService.deleteControllers(params);

            res.status(200).json({
                status: 200,
                message: 'The controller successfully deleted!',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default ControllersController;
