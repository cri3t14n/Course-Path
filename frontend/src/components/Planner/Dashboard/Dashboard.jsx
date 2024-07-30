import React from "react"
import styles from './Dashboard.module.css'

import TopDashboard from "./TopDashboard/TopDashboard"
import ContentDashboard from "./ContentDashboard/ContentDashboard"

export default function Dashboard() {
    return (
        <div className={styles.mainView}>
            <TopDashboard />
            <ContentDashboard />
        </div>
    )
}