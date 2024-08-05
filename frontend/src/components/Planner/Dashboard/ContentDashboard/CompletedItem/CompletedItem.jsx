import React from 'react'
import styles from './CompletedItem.module.css'

export default function CompletedItem({ course, schedulePlacement, itemColor }) {
    console.log(schedulePlacement)

    return (
        <div className={styles.mainComponent} style={{ borderColor: itemColor }}>
            <div className={styles.courseTitle}>{course}</div>
            <div className={styles.schedulePlacement}>in {schedulePlacement}</div>
        </div>
    )
}
