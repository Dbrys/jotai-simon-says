import React from 'react';
import { Button } from 'antd';
import { useAtom, atom } from 'jotai';
import './App.css';
import styled from 'styled-components';

const colors = ['red', 'yellow', 'blue', 'green'];

const disabled = atom(false);
const count = atom(2);
const selected = atom('');
const simonSelections = atom<string[]>([]);
const userSelections = atom<string[]>([]);

function App() {
  const [isDisabled, setIsDisabled] = useAtom(disabled);
  const [selectedButton, setSelectedButton] = useAtom(selected);
  const [counter, setCounter] = useAtom(count);
  const [simonSelected, setSimonSelected] = useAtom(simonSelections);
  const [usersSelection, setUserSelection] = useAtom(userSelections);

  const handleRandomSelect = async () => {
    const selections = [];
    for (let x = 0; x < counter; x++) {
      const currentSelection = Math.floor(Math.random() * colors.length);
      selections.push(colors[currentSelection]);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(setSelectedButton(colors[currentSelection]));
        }, 1000);
      });
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(setSelectedButton(''));
        }, 750);
      });
      setSimonSelected(selections);
    }
    setTimeout(() => {
      setSelectedButton('');
    }, 500);
    setCounter(counter + 1);
    setIsDisabled(false);
  };

  const handleClick = (
    color: string
  ): React.MouseEventHandler<HTMLElement> | undefined => {
    if (usersSelection.length) {
      setUserSelection([...usersSelection, color]);
      return;
    }
    setUserSelection([color]);
  };

  const handleStartClick = () => {
    setIsDisabled(true);
    handleRandomSelect();
  };
  return (
    <div className="App">
      <ButtonContainer>
        {colors.map((color, i) => {
          const isSelectedColor = color === selectedButton;
          return (
            <Button
              disabled={isDisabled}
              key={i}
              type="primary"
              onClick={() => handleClick(color)}
              style={{
                backgroundColor: color,
                opacity: isSelectedColor ? 1 : 0.7,
                outline: isSelectedColor ? '1px solid black' : '',
              }}
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
      opacity: 1 !important;
      outline: 1px solid black;
    }
  }
`;

export default App;
