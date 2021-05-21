import React, { useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <div className={styles.App}>
      <h1>pwmanager</h1>
      <h2>Ich grüße den Kurs!!!!</h2>
    </div>
  );
}

export default App;
