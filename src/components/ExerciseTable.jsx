// src/components/ExerciseTable.jsx
import React from 'react';
import ExerciseRow from './ExerciseRow';

const ExerciseTable = ({ exercises, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Reps</th>
        <th>Weight</th>
        <th>Unit</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <ExerciseRow key={exercise._id} exercise={exercise} onDelete={onDelete} />
        ))
      ) : (
        <tr>
          <td colSpan="6">No exercises found.</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default ExerciseTable;
