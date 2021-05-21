import React from "react";
import styles from "./App.module.css";
import Credential from "./components/Credential";
import Hero from "./components/Hero";

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <main>
        <Hero title="pwmanager" subtitle="Ich grüße den Kurs" />
        <ul>
          <Credential service="GitHub" />
          <Credential service="Google" />
          <Credential service="Netflix" />
          <Credential service="BlaBlub" />
        </ul>
      </main>
    </div>
  );
}

export default App;
