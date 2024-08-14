import React, { useState, useContext } from 'react'

import styles from './BottomBar.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faPlus } from '@fortawesome/free-solid-svg-icons'

import { findCategoryColorByCourseNumber, findCourseByNumber } from "./../utils"

import CourseNavItem from './CourseNavItem/CourseNavItem'
import { PlansContext } from '../Planner'

export default function BottomBar() {
    const { selectedPlanID, courseInfoList, selectedCourseInfoNr, courseInfoDropdownOpen, setCourseInfoDropdownOpen } = useContext(PlansContext)
    
    const handleHeaderClick = () => {
        setCourseInfoDropdownOpen(!courseInfoDropdownOpen)
    }

    return (
        <div className={styles.bottomBar}>
            <div className={styles.navBar}>
                {courseInfoList.map(courseNr => (
                    <CourseNavItem 
                        courseNr={courseNr} 
                        courseColor={findCategoryColorByCourseNumber(selectedPlanID, courseNr)} 
                        key={courseNr}
                    />                    
                ))}
            </div>

            <div 
                className={styles.header} 
                style={{ backgroundColor: findCategoryColorByCourseNumber(selectedPlanID, selectedCourseInfoNr) }}
                onClick={handleHeaderClick}
            >
                <div className={styles.headerTitle}>
                    {findCourseByNumber(selectedPlanID, selectedCourseInfoNr).name}
                </div>
                {courseInfoDropdownOpen ? (
                    <FontAwesomeIcon icon={faChevronDown} className={styles.caretIcon}/>
                ) : (
                    <FontAwesomeIcon icon={faChevronUp} className={styles.caretIcon}/>
                )}
            </div>

            {courseInfoDropdownOpen && (
                <div className={styles.content}>
                    <div className={styles.courseInfo}>

                    </div>

                    <div className={styles.courseDescription}>

                    </div>
                </div>
            )}
        </div>
    )
}