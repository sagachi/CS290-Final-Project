import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateExercisePage = () => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExercise = {
      name,
      reps: parseInt(reps, 10),
      weight: parseInt(weight, 10),
      unit,
      date,
    };

    if (!name || !reps || !weight || !unit || !date) {
      alert('Please fill out all fields correctly.');
      return;
    }

    console.log('Sending exercise data:', newExercise); // Log the data being sent

    try {
      const response = await fetch('http://localhost:3000/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExercise),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert('Failed to create exercise: ' + (errorData.error || 'Unknown error.'));
        return;
      }

      alert('Exercise created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating exercise:', error);
      alert('An error occurred while creating the exercise.');
    }
  };

  return (
    <div>
      <h1>Create a New Exercise</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />

        <label htmlFor="weight">Weight:</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <label htmlFor="unit">Unit:</label>
        <select
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a unit
          </option>
          <option value="lbs">lbs</option>
          <option value="kgs">kgs</option>
        </select>

        <label htmlFor="date">Date (MM-DD-YY):</label>
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="MM-DD-YY"
            pattern="^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{2}$"
            required
          />

        <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
};

export default CreateExercisePage;
