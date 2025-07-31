import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, enum: ['kgs', 'lbs'] },
    date: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export const createExercise = async (exerciseData) => {
    const exercise = new Exercise(exerciseData);
    await exercise.save();
    return exercise;
};

export const getAllExercises = async () => {
    return await Exercise.find();
};

export const getExerciseById = async (id) => {
    return await Exercise.findById(id);
};

export const updateExerciseById = async (id, exerciseData) => {
    return await Exercise.findByIdAndUpdate(id, exerciseData, { new: true });
};

export const deleteExerciseById = async (id) => {
    return await Exercise.findByIdAndDelete(id);
};

