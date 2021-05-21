import React from "react";
import styles from "./Credential.module.css";

type CredentialProps = {
  service: string;
};

function Credential({ service }: CredentialProps): JSX.Element {
  return (
    <ul className={styles.credential}>
      {service}
      <li>
        <button>
          <img src="src/assets/delete.png" alt="" />
        </button>

        <button>
          <img src="src/assets/password.png" alt="" />
        </button>
      </li>
    </ul>
  );
}

export default Credential;
