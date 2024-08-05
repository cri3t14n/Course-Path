// src/components/Basket/Basket.js

import React from 'react';
import styles from './Basket.module.css';

function Basket() {
  return (
    <div className={styles.basket}>
      <h3>Basket</h3>
      <p>Basket is empty</p>
      <button className={styles.button}>Create</button>
      <button className={styles.button}>Find course</button>
      <button className={styles.button}>Export to PDF</button>
    </div>
  );
}

export default Basket;
