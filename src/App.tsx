import React from 'react';
import { Button } from 'antd';
import { useAtom, atom } from 'jotai';
import './App.css';
import styled from 'styled-components';

const colors = ['red', 'yellow', 'blue', 'green'];

const disabled = atom(false);

function App() {
  const [isDisabled, setIsDisabled] = useAtom(disabled);
  const handleStartClick = () => {
    setIsDisabled(true);
  };
  return (
    <div className="App">
      <ButtonContainer>
        {colors.map((color, i) => {
          return (
            <Button
              key={i}
              type="primary"
              style={{ backgroundColor: color }}
            ></Button>
          );
        })}
      </ButtonContainer>
      <Button
        disabled={isDisabled}
        onClick={handleStartClick}
        type="primary"
        shape="round"
        size="large"
      >
        Start
      </Button>
    </div>
  );
}

const ButtonContainer = styled.div`
  max-width: 300px;
  text-align: center;
  margin-bottom: 50px;
  .ant-btn:empty {
    visibility: visible;
  }
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
