import React from "react";

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

    case "DRAW_START": {
      return {
        ...state,
        drawing: true
      };
    }

    case "DRAW_END": {
      return {
        ...state,
        drawing: false
      };
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

const Canvas = () => {
  const [state, dispatch] = React.useReducer(canvasReducer, {
    drawing: false,
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
  const ctxRef = React.useRef();

  const { drawing, resizing, currentDim, desiredDim } = state;

  const handleResize = React.useCallback(
    evt => {
      const { x, y } = getNormalizedCoordinates(evt, canvasContainerRef);
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

  // drawing events
  const handleStartDrawing = evt => {
    // capture the pointer
    evt.target.setPointerCapture(evt.pointerId);
    const { x, y } = getNormalizedCoordinates(evt, canvasContainerRef);
    // start drawing
    let ctx = (ctxRef.current = canvasRef.current.getContext("2d"));

    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(x, y);

    dispatch({ type: "DRAW_START" });
  };

  const handleEndDrawing = evt => {
    dispatch({ type: "DRAW_END" });
  };

  const handleDraw = evt => {
    if (drawing) {
      let ctx = ctxRef.current;
      const { x, y } = getNormalizedCoordinates(evt, canvasContainerRef);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  return (
    <div
      ref={canvasContainerRef}
      style={{ ...styles.canvasFrame, cursor: axisToCursorMap[resizing] }}
    >
      <canvas
        ref={canvasRef}
        width={currentDim.width}
        height={currentDim.height}
        style={styles.canvas}
        onPointerDown={handleStartDrawing}
        onPointerCancel={handleEndDrawing}
        onPointerUp={handleEndDrawing}
        onPointerMove={handleDraw}
      />
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
    background: "#6d6d6d"
  },
  canvas: {
    position: "absolute",
    background: "white",
    overflow: "auto",
    boxShadow: "2px 2px 6px #5f5f5f"
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

export default Canvas;

function getNormalizedCoordinates(evt, containerRef) {
  const right = evt.clientX;
  const top = evt.clientY;
  const x = right - containerRef.current.getBoundingClientRect().x;
  const y = top - containerRef.current.getBoundingClientRect().y;
  return { x, y };
}
