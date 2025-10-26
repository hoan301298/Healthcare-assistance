import { Router } from 'express';
const router = Router();

import placesController from '../components/location/placesController.js';
import login from '../components/login-register/loginComponent.js';
import register from '../components/login-register/registerComponent.js';
import authenticateToken from '../components/login-register/authenticateToken.js';
import sendEmail from '../components/email/sendEmail.js';
import { getProfile, updateUserDetails } from '../components/account/profile.js';

router.get('/account', getProfile);
router.get('/authenticated', authenticateToken, (req, res) => {
    res.json({message: 'Authenticated successfully'})
})
router.put('/account/update-userdetails', updateUserDetails)
router.post('/places', placesController);
router.post('/login', login);
router.post('/register', register);
router.post('/send-email', sendEmail);

export default router;