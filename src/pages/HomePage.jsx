// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable';

const HomePage = () => {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const response = await fetch('/exercises');
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteExercise = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this exercise?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/exercises/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        setExercises(exercises.filter((exercise) => exercise._id !== id));
      } else {
        throw new Error('Failed to delete exercise');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div>
      <h2>All Exercises</h2>
      <ExerciseTable exercises={exercises} onDelete={deleteExercise} />
    </div>
  );
};

export default HomePage;
