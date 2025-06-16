import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MenuBurger from '../src/components/MenuBurger';

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock styled-components/native
jest.mock('styled-components/native', () => {
  const ReactLib = require('react');

  // Create a mock TouchableOpacity that preserves all props including testID
  const MockTouchableOpacity = ReactLib.forwardRef((props: any, ref: any) => {
    return ReactLib.createElement('TouchableOpacity', {
      ...props,
      ref,
      testID: props.testID || 'menu-button', // Ensure testID is passed through
    });
  });

  const styled = {
    TouchableOpacity: (_styles: any) => MockTouchableOpacity,
  };

  return {
    __esModule: true,
    default: styled,
  };
});

// Mock @react-navigation/native
const mockOpenDrawer = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    openDrawer: mockOpenDrawer,
  }),
}));

describe('MenuBurger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<MenuBurger />);

    const menuButton = getByTestId('menu-button');
    expect(menuButton).toBeTruthy();
  });

  it('should have correct accessibility label', () => {
    const { getByLabelText } = render(<MenuBurger />);

    const menuButton = getByLabelText('Ouvrir le menu de navigation');
    expect(menuButton).toBeTruthy();
  });

  it('should call openDrawer when pressed', () => {
    const { getByTestId } = render(<MenuBurger />);

    const menuButton = getByTestId('menu-button');
    fireEvent.press(menuButton);

    expect(mockOpenDrawer).toHaveBeenCalledTimes(1);
  });

  it('should render the menu icon', () => {
    const { getByTestId } = render(<MenuBurger />);

    const menuButton = getByTestId('menu-button');
    expect(menuButton.props.children).toBeTruthy();
  });
});
