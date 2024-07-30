import React, { useState, useContext } from "react"

import SemesterItem from "./SemesterItem/SemesterItem"
import { PlansContext } from "../Planner"
import { findPlanByID } from './../utils'

import { Droppable, Draggable } from 'react-beautiful-dnd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons' 

import styles from './Schedule.module.css'

export default function Schedule() {
    const { plans, selectedPlanID, setSelectedPlanID } = useContext(PlansContext)

    const plan = findPlanByID(selectedPlanID)

    const handleAddSemesterClick = () => {
        
    }

    return (
        <div className={styles.scheduleView}>
            <button
                className={styles.addSemester}
                onClick={() => handleAddSemesterClick()}
            >
                <FontAwesomeIcon icon={faPlus} className={styles.plusIcon}/>
                <span>New Semester</span>
            </button>

            <div className={styles.semesterWrapper}>
                {plan.schedule.map((semester, index) => (
                    <SemesterItem semester={semester} /> 
                ))}

            </div>

        </div>
    )
}
