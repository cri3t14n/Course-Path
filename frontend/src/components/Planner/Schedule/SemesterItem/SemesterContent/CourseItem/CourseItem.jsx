import React, { useState, useContext } from "react"
import styles from './CourseItem.module.css'

import { PlansContext } from "../../../../Planner"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faTrashCan } from '@fortawesome/free-solid-svg-icons' 

export default function CourseItem({ course, itemColor }) {
    const { setSelectedCourseInfoNr, setCourseInfoList, courseInfoList, setCourseInfoDropdownOpen } = useContext(PlansContext)

    const handleCourseClick = () => {
        if (!courseInfoList.includes(course.courseNr)) {
            setTimeout(() => {
                setCourseInfoList(prevItems => [...prevItems, course.courseNr])
            }, 0.01)
        }
        
        setTimeout(() => {
            setSelectedCourseInfoNr(course.courseNr)
            setCourseInfoDropdownOpen(true)
        }, 0.01)
    }

    return (
        <div 
            className={styles.courseItem}
            onClick={handleCourseClick}    
        >

            <div className={styles.dragComponent} style={{ backgroundColor: itemColor }}>
                <FontAwesomeIcon icon={faEllipsisVertical} className={styles.dragIcon} />
                <FontAwesomeIcon icon={faEllipsisVertical} className={styles.dragIcon} />
            </div>

            <div className={styles.courseInfo}>
                <div className={styles.topCourseInfo}>
                    <span>{course.courseNr}</span>
                    <FontAwesomeIcon icon={faTrashCan} className={styles.trashIcon} />
                </div>
                <div className={styles.courseTitle}>{course.name}</div>
                <div className={styles.courseDetails}>
                    <span>{course.ects} ECTS</span>
                    <span className={styles.separator}>|</span>
                    <span>E1A</span> {/* ADD THE PLACEMENT IN JSON*/}
                </div>
            </div>

        </div>
    )
}