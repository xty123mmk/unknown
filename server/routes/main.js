import express from 'express';
import multipart from 'connect-multiparty';
import { userSignup, userLogin, userProfile, getAllUser, getSingleUser } from '../controllers/user';
import { createTestimonial, getAllTestimonial, getSingleTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonials';
import verifyToken from '../middleware/verifyToken';
import { createComment, getAllComment, deleteComment } from '../controllers/comments';
import { createLog, getAllLog, updateLog, deleteLog } from '../controllers/log';

const router = express.Router();
const multipartmiddleware = multipart();

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to Sworte',
  });
});

router.post('/users/signup', userSignup);
router.post('/users/login', userLogin);
router.put('/users/:userId/profile', verifyToken, multipartmiddleware, userProfile);
router.post('/users/:userId/log', verifyToken, createLog);
router.get('/users/:userId/log', getAllLog);
router.patch('/users/:userId/log/:logId', verifyToken, updateLog);
router.delete('/users/:userId/log/:logId', verifyToken, deleteLog);
router.get('/users', getAllUser);
router.get('/users/:userId', getSingleUser);
router.post('/users/:userId/testimonials', verifyToken, createTestimonial);
router.get('/users/:userId/testimonials', getAllTestimonial);
router.get('/users/:userId/testimonials/:testimonialId', getSingleTestimonial);
router.patch('/users/:userId/testimonials/:testimonialId', verifyToken, updateTestimonial);
router.delete('/users/:userId/testimonials/:testimonialId', verifyToken, deleteTestimonial);
router.post('/users/:userId/testimonials/:testimonialId/comments/', verifyToken, createComment);
router.get('/users/:userId/testimonials/:testimonialId/comments', getAllComment);
router.delete('/users/:userId/testimonials/:testimonialId/comments/:commentId', verifyToken, deleteComment);

export default router;

