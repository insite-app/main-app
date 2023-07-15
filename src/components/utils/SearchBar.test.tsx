import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router';
import SearchBar from './SearchBar';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('SearchBar', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates on change', () => {
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'query' },
      });
    });

    expect(screen.getByRole('textbox')).toHaveValue('query');
  });

  it('performs search on button click', () => {
    act(() => {
      userEvent.type(screen.getByRole('textbox'), 'query');
      userEvent.click(screen.getByRole('button', { name: /search/i }));
    });

    expect(navigate).toHaveBeenCalledWith('/search?q=query');
  });

  it('performs search on Enter key press', () => {
    act(() => {
      userEvent.type(screen.getByRole('textbox'), 'query');
      fireEvent.keyDown(screen.getByRole('textbox'), {
        key: 'Enter',
        code: 'Enter',
      });
    });

    expect(navigate).toHaveBeenCalledWith('/search?q=query');
  });
});
