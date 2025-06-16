import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskInput from '../src/components/TaskInput';

describe('TaskInput', () => {
  it('appelle onAddTask avec le titre correct lors du clic sur Ajouter', () => {
    const mockOnAddTask = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TaskInput onAddTask={mockOnAddTask} />
    );

    fireEvent.changeText(getByPlaceholderText('Nouvelle tâche'), 'Faire les courses');
    fireEvent.press(getByText('Ajouter'));

    expect(mockOnAddTask).toHaveBeenCalledWith('Faire les courses');
    expect(getByPlaceholderText('Nouvelle tâche')).toHaveProp('value', '');
  });

  it('n’appelle pas onAddTask si le titre est vide', () => {
    const mockOnAddTask = jest.fn();
    const { getByText } = render(<TaskInput onAddTask={mockOnAddTask} />);

    fireEvent.press(getByText('Ajouter'));

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });
});
