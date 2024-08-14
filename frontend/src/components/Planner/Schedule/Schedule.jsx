import React, { useState, useContext, useEffect } from "react"

import SemesterItem from "./SemesterItem/SemesterItem"
import { PlansContext } from "../Planner"
import { findPlanByID } from './../utils'

import { Droppable, Draggable } from 'react-beautiful-dnd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons' 

import styles from './Schedule.module.css'

export default function Schedule() {
    const { selectedPlanID, courseInfoDropdownOpen, courseInfoList } = useContext(PlansContext)

    const plan = findPlanByID(selectedPlanID)

    const handleAddSemesterClick = () => {
        
    }

    const [scheduleHeight, setScheduleHeight] = useState('calc(100vh - 3rem)')

    useEffect(() => {
        if (courseInfoList.length === 0) {
            setScheduleHeight(`calc(100vh - 3rem + 10px)`)
        }
        else if (courseInfoDropdownOpen) {
            setScheduleHeight(`calc(100vh - 17rem - 40px - 3rem)`)
        } else {
            setScheduleHeight(`calc(100vh - 3rem - 40px)`)
        }
    }, [courseInfoDropdownOpen, courseInfoList])



    return (
        <div className={styles.scheduleView} style={{ height: scheduleHeight }}>
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
