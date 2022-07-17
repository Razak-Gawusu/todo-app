import React, { useState } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }
  return (
    <div className={`App ${darkMode ? 'darkBody' : ''}`}>
     <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
     <Todo darkMode={darkMode}/>
    </div>
  );
}

export default App;
