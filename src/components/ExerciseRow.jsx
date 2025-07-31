// src/components/ExerciseRow.jsx
import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ExerciseRow = ({ exercise, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${exercise._id}`, { state: { exercise } });
  };

  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <FaEdit
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={handleEdit}
          title="Edit Exercise"
        />
        <FaTrash
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(exercise._id)}
          title="Delete Exercise"
        />
      </td>
    </tr>
  );
};

export default ExerciseRow;
