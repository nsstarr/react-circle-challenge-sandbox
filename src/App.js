import "./styles.css";
import { useState } from "react";

export default function App() {
  const [points, setPoints] = useState([]);
  const [popped, setPopped] = useState([]);

  const handleClickPlace = (e) => {
    console.log(e);
    const { clientX, clientY } = e;
    //spread will do a shallow copy
    setPoints([...points, { x: clientX, y: clientY }]);
  };

  const handleUndo = () => {
    //Remove the last point added to the array
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    setPopped([...popped, poppedPoint]);
    setPoints(newPoints);
  };

  const handleRedo = () => {
    const newPopped = [...popped];
    const newPoints = [...points];
    const poppedPoint = newPopped.pop();
    newPoints.push(poppedPoint);
    setPoints(newPoints);
    setPopped(newPopped);
  };
  return (
    <>
      <button onClick={handleUndo}>Undo</button>
      <button disabled={popped.length === 0} onClick={handleRedo}>
        Redo
      </button>
      <div className="App" onClick={handleClickPlace}>
        {points.map((point, idx) => (
          <div
            key={idx}
            className="point"
            style={{
              left: point.x + "px",
              top: point.y + "px"
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
