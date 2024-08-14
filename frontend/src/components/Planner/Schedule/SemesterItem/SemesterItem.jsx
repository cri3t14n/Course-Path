import React, { useState, useContext } from "react"

import styles from './SemesterItem.module.css'

import CourseItem from "./SemesterContent/CourseItem/CourseItem"
import { PlansContext } from "../../Planner"
import { findCourseByNumber, findCategoryColorByCourseNumber, countTotalCreditsInTerm } from "./../../utils"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsis, faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons' 
import SemesterContent from "./SemesterContent/SemesterContent"


export default function SemesterItem({semester}) {
    const { selectedPlanID } = useContext(PlansContext)
    const [semesterMinimized, setSemesterMinimized] = useState(false)

    const handleMinimizeClick = () => {
        setSemesterMinimized(!semesterMinimized)
    }

    return (
        <div className={styles.semesterItem}>
            <div className={styles.semesterTop}>
                <div className={styles.semesterTopLeft}>
                    <div className={styles.semesterTitle}>
                        <span>{semester.name}</span>
                        <span className={styles.separator}>|</span>
                        <span>{semester.season} {semester.year}</span>
                    </div>
                    <span className={styles.semesterCredits}>{countTotalCreditsInTerm(selectedPlanID, semester)} ECTS</span>
                </div>
                <div className={styles.semesterTopRight}>
                    {semester.coursesNr.length !== 0 && (
                        <div 
                            className={styles.semesterSize}
                            onClick={() => handleMinimizeClick()}
                        >
                            {semesterMinimized ? (
                                <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className={styles.sizeIcon}/>
                            ) : (
                                <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} className={styles.sizeIcon}/>
                            )}
                        </div>
                    )}
                    <div className={styles.semesterDots}>
                        <FontAwesomeIcon icon={faEllipsis} className={styles.dotsIcon}/>
                    </div>
                </div>
            </div>

            {!semesterMinimized && (
                <SemesterContent semester={semester} />
            )}
        </div>
    )
}

