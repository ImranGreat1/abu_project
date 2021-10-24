import React from "react";

const hamburgerContext = React.createContext({
  isOpen: false,
  hamburgerChangeHandler: () => {},
});

export default hamburgerContext;
