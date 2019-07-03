import React from "react";

const ColorContext = React.createContext();
const ColorSelectorContext = React.createContext();
function colorsReducer(state, action) {
  switch (action.type) {
    case "SET_PRIMARY_COLOR": {
      return { ...state, primary: action.color };
    }

    case "SET_SECONDARY_COLOR": {
      return { ...state, secondary: action.color };
    }
    default:
      throw new Error("invalid action " + action.type);
  }
}

export const ColorProvider = ({ children }) => {
  const [colors, dispatch] = React.useReducer(colorsReducer, {
    primary: "black",
    secondary: "white"
  });

  return (
    <ColorSelectorContext.Provider value={dispatch}>
      <ColorContext.Provider value={colors}>{children}</ColorContext.Provider>
    </ColorSelectorContext.Provider>
  );
};

export function useColors() {
  return React.useContext(ColorContext);
}

export function useColorSelector() {
  const dispatch = React.useContext(ColorSelectorContext);

  const setPrimaryColor = React.useCallback(color => {
    dispatch({ type: "SET_PRIMARY_COLOR", color });
  }, []);

  const setSecondaryColor = React.useCallback(color => {
    dispatch({ type: "SET_SECONDARY_COLOR", color });
  }, []);

  return { setPrimaryColor, setSecondaryColor };
}
