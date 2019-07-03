import React from "react";
import { useRect } from "../useRect";

const axisToCursorMap = {
  north: "ns-resize",
  northeast: "nesw-resize",
  east: "ew-resize",
  southeast: "nwse-resize",
  south: "ns-resize",
  southwest: "nesw-resize",
  west: "ew-resize",
  northwest: "nwse-resize"
};

const Anchor = ({ position, style, of, ...props }) => {
  const targetRect = useRect(of);
  const positionStyles = getPositionStyles();

  return (
    <div
      style={{
        position: "fixed",
        border: "1px solid black",
        width: 4,
        height: 4,
        background: "white",
        cursor: axisToCursorMap[position],
        ...positionStyles,
        ...style
      }}
      {...props}
    />
  );

  function getPositionStyles() {
    const { top, left, width, height } = targetRect;

    switch (position) {
      case "north": {
        return {
          left: left + width / 2,
          top: top - 6
        };
      }
      case "northeast": {
        return { left: left + width, top: 0 };
      }
      case "east": {
        return {
          left: left + width,
          top: top + height / 2
        };
      }
      case "southeast": {
        return {
          left: left + width,
          top: top + height
        };
      }
      case "south": {
        return {
          left: left + width / 2,
          top: top + height
        };
      }
      case "southwest": {
        return {
          left: left - 6,
          top: top + height
        };
      }
      case "west": {
        return {
          left: left - 6,
          top: top + height / 2
        };
      }
      case "northwest": {
        return { top: top - 6, left: left - 6 };
      }
      default:
        throw new Error("invalid position " + position);
    }
  }
};

export default Anchor;
