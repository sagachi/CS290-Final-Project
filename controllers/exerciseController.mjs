import { createExercise, getAllExercises, getExerciseById, updateExerciseById, deleteExerciseById } from '../models/exerciseModel.mjs';
import { isDateValid } from '../utils/validateDate.mjs';

const validateExercise = (body) => {
    const requiredFields = ['name', 'reps', 'weight', 'unit', 'date'];

    for (let field of requiredFields) {
        if (!(field in body)) {
            console.error(`Validation failed: Missing ${field}`);
            return { valid: false, error: `Missing ${field}` };
        }
    }

    if (typeof body.name !== 'string' || body.name.trim().length === 0) {
        console.error("Validation failed: Invalid name");
        return { valid: false, error: 'Invalid name' };
    }

    if (!Number.isInteger(body.reps) || body.reps <= 0) {
        console.error("Validation failed: Invalid reps");
        return { valid: false, error: 'Invalid reps' };
    }

    if (!Number.isInteger(body.weight) || body.weight <= 0) {
        console.error("Validation failed: Invalid weight");
        return { valid: false, error: 'Invalid weight' };
    }

    if (!['kgs', 'lbs'].includes(body.unit)) {
        console.error("Validation failed: Invalid unit");
        return { valid: false, error: 'Invalid unit' };
    }

    console.log("Validating date:", body.date);

    if (typeof body.date !== 'string') {
        console.error("Validation failed: Date should be a string");
        return { valid: false, error: 'Date should be a string' };
    }

    if (!isDateValid(body.date)) {
        console.error("Validation failed: Invalid date format");
        return { valid: false, error: 'Invalid date format' };
    }

    return { valid: true, error: null };
};


export const createExerciseHandler = async (req, res) => {
    const { valid, error } = validateExercise(req.body);
    console.log(valid, error);
    if (!valid) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    try {
        const exercise = await createExercise(req.body);

        res.status(201).json(exercise);
    } catch (err) {
        res.status(500).json({ Error: "Failed to create exercise" });
    }
};

export const getAllExercisesHandler = async (req, res) => {
    try {
        const exercises = await getAllExercises();
        res.status(200).json(exercises);
    } catch (err) {
        res.status(500).json({ Error: "Failed to retrieve exercises" });
    }
};

export const getExerciseByIdHandler = async (req, res) => {
    try {
        const exercise = await getExerciseById(req.params._id);
        if (!exercise) {
            return res.status(404).json({ Error: "Not found" });
        }
        res.status(200).json(exercise);
    } catch (err) {
        res.status(500).json({ Error: "Failed to retrieve exercise" });
    }
};

export const updateExerciseByIdHandler = async (req, res) => {
    const { valid, error } = validateExercise(req.body);
    if (!valid) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    try {
        const updatedExercise = await updateExerciseById(req.params._id, req.body);
        if (!updatedExercise) {
            return res.status(404).json({ Error: "Not found" });
        }
        res.status(200).json(updatedExercise);
    } catch (err) {
        res.status(500).json({ Error: "Failed to update exercise" });
    }
};

export const deleteExerciseByIdHandler = async (req, res) => {
    try {
        const deletedExercise = await deleteExerciseById(req.params._id);
        if (!deletedExercise) {
            return res.status(404).json({ Error: "Not found" });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ Error: "Failed to delete exercise" });
    }
};
