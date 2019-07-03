import React from "react";
import Canvas from "./Canvas";
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
        resizing: "x"
      };
    }
    case "RESIZE_START_Y": {
      return {
        ...state,
        resizing: "y"
      };
    }
    case "RESIZE_START_XY": {
      return {
        ...state,
        resizing: "xy"
      };
    }
    case "RESIZE_CHANGE_SIZE": {
      const newState = { ...state, desiredDim: { ...state.desiredDim } };

      if (state.resizing === "idle") {
        return newState;
      }
      if (state.resizing.includes("x")) {
        newState.desiredDim.width = action.x;
      }
      if (state.resizing.includes("y")) {
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

const axisToCursorMap = {
  x: "ew-resize",
  y: "ns-resize",
  xy: "nwse-resize",
  idle: "default"
};

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

  const { resizing, currentDim, desiredDim } = state;

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
    <div
      ref={canvasContainerRef}
      style={{ ...styles.canvasFrame, cursor: axisToCursorMap[resizing] }}
    >
      <Canvas width={currentDim.width} height={currentDim.height} />
      <Anchor
        axis="x"
        style={{ left: currentDim.width, top: currentDim.height / 2 }}
        onPointerDown={evt => {
          // capture the pointer
          evt.target.setPointerCapture(evt.pointerId);
          dispatch({ type: "RESIZE_START_X" });
        }}
        onPointerCancel={handleEndResize}
        onPointerUp={handleEndResize}
        onPointerMove={handleResize}
      />
      <Anchor
        axis="y"
        style={{ left: currentDim.width / 2, top: currentDim.height }}
        onPointerDown={evt => {
          // capture the pointer
          evt.target.setPointerCapture(evt.pointerId);

          dispatch({ type: "RESIZE_START_Y" });
        }}
        onPointerCancel={handleEndResize}
        onPointerUp={handleEndResize}
        onPointerMove={handleResize}
      />
      <Anchor
        axis="xy"
        style={{ left: currentDim.width, top: currentDim.height }}
        onPointerDown={evt => {
          evt.target.setPointerCapture(evt.pointerId);
          dispatch({ type: "RESIZE_START_XY" });
        }}
        onPointerCancel={handleEndResize}
        onPointerUp={handleEndResize}
        onPointerMove={handleResize}
      />
      <ResizingOutline
        resizing={state.resizing !== "idle"}
        style={{ width: desiredDim.width, height: desiredDim.height }}
      />
    </div>
  );
};

const Anchor = ({ axis, style, ...props }) => {
  return (
    <div
      style={{
        position: "absolute",
        border: "1px solid black",
        width: 4,
        height: 4,
        background: "white",
        cursor: axisToCursorMap[axis],
        ...style
      }}
      {...props}
    />
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
    boxSizing: 'border-box'
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
