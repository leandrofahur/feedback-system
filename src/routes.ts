import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAdmin } from './middleware/ensureAdmin';
const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAdmin, createTagController.handle);
router.post('/compliments', ensureAdmin, createComplimentController.handle);
router.post('/login', authenticateUserController.handle);

export { router };
