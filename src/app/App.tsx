import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Credential from "./components/Credential";
import Hero from "./components/Hero";
import type { Credential as CredentialType } from "./../types";

function App(): JSX.Element {
  const [credentials, setCredentials] = useState<CredentialType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/credentials")
      .then((response) => response.json())
      .then((credentials) => setCredentials(credentials));
  }, []);

  const credentialElements = credentials.map((credential) => (
    <Credential key={credential.service} credential={credential} />
  ));

  return (
    <div className={styles.App}>
      <main>
        <Hero title="pwmanager" subtitle="Ich grüße den Kurs" />
        <ul>{credentialElements}</ul>
      </main>
    </div>
  );
}

export default App;
