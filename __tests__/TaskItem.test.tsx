import React from 'react';
import { render } from '@testing-library/react-native';
import TaskItem from '../src/components/TaskItem';

describe('TaskItem', () => {
  it('affiche le titre de la tâche correctement', () => {
    const task = { id: '1', title: 'Faire les courses', description: '', completed: false };
    const { getByText } = render(<TaskItem task={task} />);
    expect(getByText('Faire les courses')).toBeTruthy();
  });

  it('affiche la tâche avec un style barré si complétée', () => {
    const task = { id: '1', title: 'Faire les courses', description: '', completed: true };
    const { getByText } = render(<TaskItem task={task} />);
    const taskText = getByText('Faire les courses');
    expect(taskText).toHaveStyle({ textDecorationLine: 'line-through' });
  });

  it('affiche la tâche sans style barré si non complétée', () => {
    const task = { id: '1', title: 'Faire les courses', description: '', completed: false };
    const { getByText } = render(<TaskItem task={task} />);
    const taskText = getByText('Faire les courses');
    expect(taskText).toHaveStyle({ textDecorationLine: 'none' });
  });
});
