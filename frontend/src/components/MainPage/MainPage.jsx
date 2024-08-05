import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MainPage.module.css'
import logo from '../../assets/images/logo.jpg'

const MainPage = () => {
    const navigate = useNavigate()

    const handleNavClick = (page) => {
        navigate(`/${page.toLowerCase()}`)
    }

    return (
        <div className={styles.wrapper}>
            {/* <img src={logo} alt="DTU Logo" className={styles.logo} /> */}
            <div className={styles.dtuText}>DTU</div>
            <div className={styles.navLines}>
                {['Home', 'About', 'Services', 'Contact', 'Planner'].map((page) => (
                    <div
                        key={page}
                        className={styles.navLine}
                        onClick={() => handleNavClick(page)}
                        data-page={page}
                    >
                        <div className={styles.rhombus}></div>
                        <div className={styles.rhombus}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainPage
