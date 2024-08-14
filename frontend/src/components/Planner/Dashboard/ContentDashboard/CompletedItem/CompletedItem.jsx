import React, {useContext} from 'react'
import styles from './CompletedItem.module.css'

import { PlansContext } from '../../../Planner'

export default function CompletedItem({ course, courseNr, schedulePlacement, itemColor }) {

    const { setSelectedCourseInfoNr, setCourseInfoList, courseInfoList, setCourseInfoDropdownOpen } = useContext(PlansContext)

    const handleCourseClick = () => {
        if (!courseInfoList.includes(courseNr)) {
            setTimeout(() => {
                setCourseInfoList(prevItems => [...prevItems, courseNr])
            }, 0.01)
        }
        
        setTimeout(() => {
            setSelectedCourseInfoNr(courseNr)
            setCourseInfoDropdownOpen(true)
        }, 0.01)
    }

    return (
        <div 
            className={styles.mainComponent} 
            style={{ borderColor: itemColor }}
            onClick={handleCourseClick}
        >
            <div className={styles.courseTitle}>{course}</div>
            <div className={styles.schedulePlacement}>in {schedulePlacement}</div>
        </div>
    )
}
