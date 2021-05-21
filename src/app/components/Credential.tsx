import React from "react";
import styles from "./Credential.module.css";
import type { Credential as CredentialType } from "../../types";

type CredentialProps = {
  credential: CredentialType;
};

function Credential({ credential }: CredentialProps): JSX.Element {
  return (
    <ul className={styles.credential}>
      {credential.service}:
      <li>
        <button>
          <img src="src/assets/password.png" alt="" />
        </button>
        <button>
          <img src="src/assets/delete.png" alt="" />
        </button>
      </li>
    </ul>
  );
}

export default Credential;
