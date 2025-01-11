import express from 'express';
import { passwordController } from '../controllers/passwordController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected by auth middleware
router.use(auth);

router.get('/', passwordController.getPasswords);
router.post('/', passwordController.createPassword);
router.put('/:id', passwordController.updatePassword);
router.delete('/:id', passwordController.deletePassword);
router.get('/decrypt/:id', passwordController.decryptPassword);

export default router;
