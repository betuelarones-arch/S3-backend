import express from 'express';
import * as imageController from '../controllers/imageController.js';

const router = express.Router();

router.post('/upload-url', imageController.getUploadUrl);
router.get('/images', imageController.listImages);
router.get('/view-url/:key', imageController.getViewUrl);
router.delete('/images/:key(*)', imageController.deleteImage);

export default router;