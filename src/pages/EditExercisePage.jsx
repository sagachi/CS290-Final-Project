// src/pages/EditExercisePage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditExercisePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { exercise } = location.state || {};

  if (!exercise) {
    alert('No exercise data provided.');
    navigate('/');
    return null;
  }

  const [form, setForm] = useState({
    name: exercise.name,
    reps: exercise.reps,
    weight: exercise.weight,
    unit: exercise.unit,
    date: exercise.date,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Exercise updated successfully.');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Failed to update exercise: ${errorData.Error}`);
        navigate('/');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Edit Exercise</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          name="reps"
          value={form.reps}
          onChange={handleChange}
          min="1"
          required
        />

        <label htmlFor="weight">Weight:</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          min="1"
          required
        />

        <label htmlFor="unit">Unit:</label>
        <select
          id="unit"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          required
        >
          <option value="kgs">Kgs</option>
          <option value="lbs">Lbs</option>
        </select>

        <label htmlFor="date">Date (MM-DD-YY):</label>
        <input
          type="text"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          pattern="^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{2}$"
          required
          title="Date format should be MM-DD-YY"
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditExercisePage;
