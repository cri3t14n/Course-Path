// src/components/Header/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header({ onLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>DTU</div>
      <nav className={styles.nav}>
        <Link to="/courses" className={styles.navLink}>Course Search</Link>
        <Link to="/planner" className={styles.navLink}>Studyplanner</Link>
      </nav>
      <div className={styles.userInfo}>
        <span>Cristian Placinta</span>
        <button className={styles.logoutButton} onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
