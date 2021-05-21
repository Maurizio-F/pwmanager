import React from "react";
import styles from "./Hero.module.css";

type HeroProps = {
  title: string;
  subtitle: string;
};

function Hero({ title, subtitle }: HeroProps): JSX.Element {
  return (
    <header className={styles.hero}>
      <h1 className={styles.hero__h1}>{title}</h1>
      <h2 className={styles.hero__h2}>{subtitle}</h2>
    </header>
  );
}

export default Hero;
