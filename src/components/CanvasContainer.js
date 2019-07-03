import React from "react";
import Canvas from "./Canvas";
import Anchor from "./Anchor";
import { getRelativeCoordinates } from "../utils";

const initialDim = {
  width: 600,
  height: 400
};

function canvasReducer(state, action) {
  switch (action.type) {
    case "RESIZE_START_X": {
      return {
        ...state,
        resizing: "east"
      };
    }
    case "RESIZE_START_Y": {
      return {
        ...state,
        resizing: "south"
      };
    }
    case "RESIZE_START_XY": {
      return {
        ...state,
        resizing: "southeast"
      };
    }
    case "RESIZE_CHANGE_SIZE": {
      const newState = { ...state, desiredDim: { ...state.desiredDim } };

      if (state.resizing === "idle") {
        return newState;
      }
      if (state.resizing.includes("east")) {
        newState.desiredDim.width = action.x;
      }
      if (state.resizing.includes("south")) {
        newState.desiredDim.height = action.y;
      }
      return newState;
    }
    case "RESIZE_END": {
      if (state.resizing !== "idle") {
        return {
          ...state,
          resizing: "idle",
          currentDim: { ...state.desiredDim }
        };
      } else {
        return state;
      }
    }

    default:
      throw new Error("invalid action with type: " + action.type);
  }
}

const minX = 10;
const minY = 10;

const CanvasContainer = () => {
  const [state, dispatch] = React.useReducer(canvasReducer, {
    resizing: "idle",
    desiredDim: {
      width: initialDim.width,
      height: initialDim.height
    },
    currentDim: {
      width: initialDim.width,
      height: initialDim.height
    }
  });

  const canvasContainerRef = React.useRef();
  const canvasRef = React.useRef();
  const { currentDim, desiredDim } = state;

  const handleResize = React.useCallback(
    evt => {
      const { x, y } = getRelativeCoordinates(evt, canvasContainerRef);
      dispatch({
        type: "RESIZE_CHANGE_SIZE",
        x: Math.max(x, minX),
        y: Math.max(y, minY)
      });
    },
    [canvasContainerRef]
  );

  const handleEndResize = React.useCallback(() => {
    dispatch({ type: "RESIZE_END" });
  }, []);

  return (
    <div ref={canvasContainerRef} style={{ ...styles.canvasFrame }}>
      <Canvas
        width={currentDim.width}
        height={currentDim.height}
        ref={canvasRef}
      />
      <Anchor
        position="east"
        onPointerDown={evt => {
          // capture the pointer
          evt.target.setPointerCapture(evt.pointerId);
          dispatch({ type: "RESIZE_START_X" });
        }}
        onPointerCancel={handleEndResize}
        onPointerUp={handleEndResize}
        onPointerMove={handleResize}
        of={canvasRef}
      />
      <Anchor
        position="south"
        onPointerDown={evt => {
          // capture the pointer
          evt.target.setPointerCapture(evt.pointerId);

          dispatch({ type: "RESIZE_START_Y" });
        }}
        onPointerCancel={handleEndResize}
        onPointerUp={handleEndResize}
        onPointerMove={handleResize}
        of={canvasRef}
      />
      <Anchor
        position="southeast"
        onPointerDown={evt => {
          evt.target.setPointerCapture(evt.pointerId);
          dispatch({ type: "RESIZE_START_XY" });
        }}
        onPointerCancel={handleEndResize}
        onPointerUp={handleEndResize}
        onPointerMove={handleResize}
        of={canvasRef}
      />
      <ResizingOutline
        resizing={state.resizing !== "idle"}
        style={{
          left: 4,
          top: 4,
          width: desiredDim.width,
          height: desiredDim.height
        }}
      />
    </div>
  );
};

// for a lack of a better name
const ResizingOutline = ({ style, resizing, ...props }) => {
  return (
    <div
      style={{
        ...styles.outline,
        borderStyle: resizing ? "dotted" : "hidden",
        ...style
      }}
    />
  );
};

const styles = {
  canvasFrame: {
    position: "relative",
    width: "100%",
    height: "100%",
    background: "#6d6d6d",
    overflow: "auto",
    padding: 4,
    boxSizing: "border-box"
  },
  outline: {
    // the pointer events fall through
    pointerEvents: "none",
    position: "absolute",
    boxSizing: "border-box",
    left: 0,
    top: 0,
    borderWidth: "1px",
    borderColor: "black"
  }
};

export default CanvasContainer;
