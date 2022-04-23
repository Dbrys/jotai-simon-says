import React from 'react';
import { Button } from 'antd';
import './App.css';
import styled from 'styled-components';

const colors = ['red', 'yellow', 'blue', 'green'];

function App() {
  return (
    <div className="App">
      <ButtonContainer>
        {colors.map((color, i) => {
          return (
            <Button key={i} type="primary" style={{ backgroundColor: color }} />
          );
        })}
      </ButtonContainer>
      <Button type="primary">Start</Button>
    </div>
  );
}

const ButtonContainer = styled.div`
  max-width: 250px;
  text-align: center;
  .ant-btn-primary {
    cursor: pointer;
    padding: 50px 40px;
    margin: 10px;
    border-radius: 20%;
    :hover {
      opacity: 0.7;
      outline: 1px solid black;
    }
  }
`;

export default App;
