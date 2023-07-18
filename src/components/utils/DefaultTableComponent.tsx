import styled from 'styled-components/macro';
import React from 'react';

const DefaultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  text-align: left;
  padding: 2px;
  height: 50px; /* Set a fixed height for the table header */
  overflow: hidden;
`;

const TableCell = styled.td`
  text-align: left;
  padding: 5px 0px;
  height: 50px; /* Set a fixed height for the table cells */
  overflow: hidden;
  vertical-align: top;
`;

const DefaultTableComponent = ({ headers = [], data, columnWidths = [] }) => (
  <DefaultTable>
    {headers && (
      <thead>
        <TableRow>
          {headers.map((header, index) => (
            <TableHeader key={index} style={{ width: columnWidths[index] }}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </thead>
    )}
    <tbody>
      {data.map((row, index) => (
        <TableRow key={index}>
          {row.map((cell, index) => (
            <TableCell key={index} style={{ width: columnWidths[index] }}>
              {cell}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </tbody>
  </DefaultTable>
);

export default DefaultTableComponent;
