import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  test('renders RegisterPage component', () => {
    render(<RegisterPage />);

    // Check if page heading is present
    expect(screen.getByRole('heading')).toHaveTextContent('Sign Up');

    expect(screen.getByLabelText('register-form')).toBeInTheDocument();
  });
});
