import express from 'express';
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetPasswordController,
  uploadAvatar,
  userDetails,
  verifyEmailController,
  updateUserDetails,
  toggleDriverOnlineStatus,
  getUserProfile
} from '../controllers/usercontroller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/register', registerUserController);
router.get('/verify-email', verifyEmailController);  // Changed to GET
router.post('/login', loginController);
router.get('/logout', auth, logoutController);
router.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar);
router.put('/update-user', auth, updateUserDetails);
router.put('/forgot-password', forgotPasswordController);
router.put('/reset-password', resetPasswordController);
router.post('/refresh-token', refreshToken);
router.get('/details', auth, userDetails);  // Completed this route
router.post('/driver/toggle-status', auth, toggleDriverOnlineStatus);
router.get('/profile', auth, getUserProfile);

export default router;
