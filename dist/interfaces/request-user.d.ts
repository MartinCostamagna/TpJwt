import { Request } from 'express';
import { User } from 'src/entities/user.entity';
export interface RequestWithUser extends Request {
    user?: User;
}
