import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAtom, atom } from 'jotai';
import './App.css';
import styled from 'styled-components';

const colors = ['red', 'yellow', 'blue', 'green'];

const btnDisabled = atom(false);
const startDisabled = atom(false);
const count = atom(2);
const selected = atom('');
const simonSelections = atom<string[]>([]);
const userSelections = atom<string[]>([]);

function App() {
  const [startIsDisabled, setStartIsDisabled] = useAtom(startDisabled);
  const [buttonsDisabled, setButtonsDisabled] = useAtom(btnDisabled);
  const [selectedButton, setSelectedButton] = useAtom(selected);
  const [counter, setCounter] = useAtom(count);
  const [simonSelected, setSimonSelected] = useAtom(simonSelections);
  const [usersSelection, setUserSelection] = useAtom(userSelections);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const handleRandomSelect = async () => {
    setButtonsDisabled(true);
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
    setCounter(counter + 1);
    setTimeout(() => {
      setSelectedButton('');
    }, 500);
    setButtonsDisabled(false);
  };

  const gameOver = () => {};

  // TODO: clean up and pull reset logic out to standalone function
  const handleClick = (
    color: string
  ): React.MouseEventHandler<HTMLElement> | undefined => {
    if (usersSelection.length + 1 === counter - 1) {
      if (
        JSON.stringify([...usersSelection, color]) ===
        JSON.stringify(simonSelected)
      ) {
        setUserSelection([]);
        handleRandomSelect();
        return;
      }
      setShowGameOverModal(true);
      setUserSelection([]);
      setSimonSelected([]);
      setCounter(2);
      setStartIsDisabled(false);
    }
    setUserSelection([...usersSelection, color]);
  };

  const handleStartClick = () => {
    setStartIsDisabled(true);
    handleRandomSelect();
  };
  return (
    <div className="App">
      <ButtonContainer>
        {colors.map((color, i) => {
          const isSelectedColor = color === selectedButton;
          return (
            <Button
              disabled={buttonsDisabled}
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
        disabled={startIsDisabled}
        onClick={handleStartClick}
        type="primary"
        shape="round"
        size="large"
      >
        Start
      </Button>

      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={showGameOverModal}
        onOk={() => setShowGameOverModal(false)}
      >
        <ModalContent>
          <h2>Game Over!</h2>
        </ModalContent>
      </Modal>
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

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
