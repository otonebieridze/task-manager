import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "../styles/ThemeToggle.module.css";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button className={styles["theme-toggle"]} onClick={toggleTheme}>
      <div className={`${styles["toggle-container"]} ${theme === "dark" ? styles.dark : ""}`}>
        <FaSun className={styles["icon-sun"]} />
        <FaMoon className={styles["icon-moon"]} />
      </div>
    </button>
  );
};

export default ThemeToggle;
