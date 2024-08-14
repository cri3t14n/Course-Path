import React, { useState, useContext } from "react"

import styles from './SemesterContent.module.css'

import CourseItem from "./CourseItem/CourseItem"
import { PlansContext } from "../../../Planner"
import { findCourseByNumber, findCategoryColorByCourseNumber, countTotalCreditsInTerm } from "./../../../utils"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsis, faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons' 


export default function SemesterContent({ semester }) {
    const { selectedPlanID } = useContext(PlansContext)

    return (
        <div className={styles.semesterContent}>
            {semester.coursesNr.map(courseNr => (
                <CourseItem 
                    course={findCourseByNumber(selectedPlanID, courseNr)}
                    itemColor={findCategoryColorByCourseNumber(selectedPlanID, courseNr)}
                />
            ))}
        </div>
    )
}