import React from "react";
import { useTheme } from "../containers/ThemeProvider";

function App() {
  const { toggleTheme } = useTheme();

  return (
    <div className="App">
      <button onClick={toggleTheme}>changeTheme</button>
    </div>
  );
}

export default App;
