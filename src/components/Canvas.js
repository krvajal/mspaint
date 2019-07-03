import React from "react";
import { getRelativeCoordinates } from "../utils";
import { useColors } from "../providers/colors";

function canvasReducer(state, action) {
  switch (action.type) {
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

const Canvas = ({ width, height }, forwardedRef) => {
  const [state, dispatch] = React.useReducer(canvasReducer, {
    drawing: false
  });

  const canvasRef = React.useRef();
  const colors = useColors();
  const imageData = React.useRef();
  const { drawing } = state;

  React.useLayoutEffect(() => {
    if (imageData.current) {
      const ctx = getCtx();
      ctx.putImageData(imageData.current, 0, 0);
    }
  }, [width, height]);

  return (
    <canvas
      ref={ref => {
        canvasRef.current = ref;
        forwardedRef.current = ref;
      }}
      width={width}
      height={height}
      style={styles.canvas}
      onPointerDown={handleStartDrawing}
      onPointerCancel={handleEndDrawing}
      onPointerUp={handleEndDrawing}
      onPointerMove={handleDraw}
    />
  );

  // evnt handlers

  // drawing events
  function handleStartDrawing(evt) {
    // capture the pointer
    evt.target.setPointerCapture(evt.pointerId);
    const { x, y } = getRelativeCoordinates(evt, canvasRef);
    // start drawing
    let ctx = getCtx();

    ctx.beginPath();
    ctx.strokeStyle = colors.primary;
    ctx.moveTo(x, y);

    dispatch({ type: "DRAW_START" });
  }

  function handleEndDrawing() {
    const ctx = getCtx();
    // save the currrent image data
    imageData.current = ctx.getImageData(0, 0, width, height);
    dispatch({ type: "DRAW_END" });
  }

  function handleDraw(evt) {
    if (drawing) {
      let ctx = getCtx();
      const { x, y } = getRelativeCoordinates(evt, canvasRef);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  function getCtx() {
    return canvasRef.current.getContext("2d");
  }
};

const styles = {
  canvas: {
    position: "absolute",
    background: "white",
    overflow: "auto",
    boxShadow: "2px 2px 6px #5f5f5f"
  }
};

export default React.memo(React.forwardRef(Canvas));
