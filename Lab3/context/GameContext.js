import React, { createContext, useState } from "react";
import initialTasks from "../utils/tasks";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState(initialTasks);
  const [darkMode, setDarkMode] = useState(false);

  const addPoints = (value) => {
    setScore((prev) => prev + value);
  };

  return (
    <GameContext.Provider
      value={{
        score,
        addPoints,
        tasks,
        setTasks,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};