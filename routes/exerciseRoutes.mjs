import express from 'express';
import { createExerciseHandler, getAllExercisesHandler, getExerciseByIdHandler, updateExerciseByIdHandler, deleteExerciseByIdHandler } from '../controllers/exerciseController.mjs';

const router = express.Router();

router.post('/exercises', createExerciseHandler);
router.get('/exercises', getAllExercisesHandler);
router.get('/exercises/:_id', getExerciseByIdHandler);
router.put('/exercises/:_id', updateExerciseByIdHandler);
router.delete('/exercises/:_id', deleteExerciseByIdHandler);

export default router;
