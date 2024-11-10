import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

export const Message = styled.div`
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

export const SortButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  td.total-row {
    text-align: right;
    font-weight: bold;
    background-color: #f9f9f9;
  }
`;