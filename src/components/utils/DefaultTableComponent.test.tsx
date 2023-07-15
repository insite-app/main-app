import React from 'react';
import { render } from '@testing-library/react';
import DefaultTableComponent from './DefaultTableComponent';

describe('DefaultTableComponent', () => {
  const headers = ['Header 1', 'Header 2', 'Header 3'];
  const data = [
    ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
    ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
  ];

  it('renders the correct headers', () => {
    const { getByText } = render(<DefaultTableComponent headers={headers} data={data} />);
    headers.forEach((header) => {
      expect(getByText(header)).toBeInTheDocument();
    });
  });

  it('renders the correct data', () => {
    const { getByText } = render(<DefaultTableComponent headers={headers} data={data} />);
    data.forEach((row) => {
      row.forEach((cell) => {
        expect(getByText(cell)).toBeInTheDocument();
      });
    });
  });
});
