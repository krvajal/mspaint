import React from "react";
import Canvas from "./components/Canvas";
import Toolbox from "./components/Toolbox";
import ColorSelector from "./components/ColorSelector";

import "./styles.css";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Toolbox />
      <Canvas />
      <ColorSelector />
    </div>
  );
}

export default App;
