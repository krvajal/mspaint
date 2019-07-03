import React from "react";
import CanvasContainer from "./components/CanvasContainer";
import Toolbox from "./components/Toolbox";
import ColorPalette from "./components/ColorSelector";

import "./styles.css";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", position: 'fixed', left: 0, right: 0, top: 0, bottom: 0 }}>
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Toolbox />
        <div style={{ flexGrow: 1 }}>
          <CanvasContainer />
        </div>
      </div>
      <div>
        <ColorPalette />
      </div>
    </div>
  );
}

export default App;
