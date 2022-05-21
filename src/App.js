import React, { useState } from "react";
import styles from "./App.module.css";
import MainMint from "./MainMint";
import NavBar from "./NavBar";

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className={styles["moving-background"]}></div>
    </div>
  );
}

export default App;
