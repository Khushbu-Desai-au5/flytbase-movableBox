import React, { useState, useEffect } from 'react';
import './App.css';
import useKeyPress from './hooks/useKeyPress';

function App() {
  const [boxCount, setBoxCount] = useState(0)
  const [selected, setSelected] = useState(-1)
  const [upPress] = useKeyPress('ArrowUp');
  const [leftPress] = useKeyPress('ArrowLeft');
  const [rightPress] = useKeyPress('ArrowRight');
  const [downPress] = useKeyPress('ArrowDown');
  const [deletePress] = useKeyPress('Delete');
  const [control, setControl] = useState(true)

  const [boxPosition, setBoxPosition] = useState([])
  const handleAddBox = () => {
    setBoxCount(boxCount + 1)
    let newBoxPosition = [...boxPosition]
    newBoxPosition.push({
      boxCount: boxCount + 1,
      x: 0,
      y: 0
    })
    setBoxPosition(newBoxPosition)
  }
  const handleBoxClick = (index) => {
    setSelected(index)
  }
  const handleKeyBoardControl = () => {
    setControl(!control)
  }
  useEffect(() => {

    if (control) {
      let newBoxPostion = [...boxPosition]

      let currentYPos, currentXPos
      if (boxPosition[selected]) {
        currentYPos = boxPosition[selected].y
        currentXPos = boxPosition[selected].x
      }
      if (upPress) {
        let nextPos = currentYPos -= 10
        newBoxPostion[selected].y = nextPos
        setBoxPosition(newBoxPostion)
      } else if (leftPress) {

        let nextPos = currentXPos -= 10
        newBoxPostion[selected].x = nextPos
        setBoxPosition(newBoxPostion)
      }
      else if (rightPress) {
        let nextPos = currentXPos += 10
        newBoxPostion[selected].x = nextPos
        setBoxPosition(newBoxPostion)
      }
      else if (downPress) {
        let nextPos = currentYPos += 10
        newBoxPostion[selected].y = nextPos
        setBoxPosition(newBoxPostion)
      } else if (deletePress) {
        if (selected !== -1) {
          newBoxPostion.splice(selected, 1)
          setBoxPosition(newBoxPostion)
          setSelected(-1)
        }

      }
    }
  }, [upPress, leftPress, rightPress, downPress, deletePress])

  const addBoxes = () => {
    const elements = boxPosition.map((e, index) => {
      let boxSelected = ''
      let movePosition = ''
      if (index === selected) {
        boxSelected = ' box-selected'
      }
      movePosition = `translate(${e.x}px,${e.y}px)`

      return (
        <div className={"box" + boxSelected} key={index} style={{ "zIndex": index + 1, "transform": movePosition }} onClick={() => handleBoxClick(index)} >
          <p>  {e.boxCount}</p>
        </div>
      )
    })

    return elements
  }

  return (
    <div>
      <button type='button' onClick={handleAddBox}>Add Box</button>

      <button type='button' className={control ? 'on' : 'off'} onClick={handleKeyBoardControl}>keyboard {control ? 'On' : 'Off'}</button>
      <div className='container'>
        {addBoxes()}

      </div>
    </div>
  );
}

export default App;
