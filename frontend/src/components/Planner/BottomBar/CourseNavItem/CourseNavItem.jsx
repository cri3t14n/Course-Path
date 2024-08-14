import { useContext } from 'react'

import { PlansContext } from '../../Planner'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './CourseNavItem.module.css'

import { findCategoryColorByCourseNumber } from "./../../utils"


export default function CourseNavItem({ courseNr, courseColor }) {

    const { selectedPlanID, setCourseInfoList, courseInfoList, selectedCourseInfoNr, setSelectedCourseInfoNr, setCourseInfoDropdownOpen } = useContext(PlansContext)

    const handleCourseClick = () => {
        // setTimeout(() => {
            setSelectedCourseInfoNr(courseNr)
            setCourseInfoDropdownOpen(true)
        // }, 0.01)
    }

    const handleRemoveClick = () => {
        if (courseNr === selectedCourseInfoNr) {
            const indexToRemove = courseInfoList.indexOf(courseNr)
            const newIndex = indexToRemove === 0 ? 1 : indexToRemove - 1
            setTimeout(() => {
                setSelectedCourseInfoNr(courseInfoList[newIndex])
            }, 0.01)
        } else {
            setTimeout(() => {
                setSelectedCourseInfoNr(selectedCourseInfoNr)
            }, 0.01)
        }
        setCourseInfoList(prevItems => prevItems.filter(item => item !== courseNr))
    }
    

    return (
        <div 
            className={styles.courseItem} 
            style={{ 
                backgroundColor: courseColor,
                borderBottom: selectedCourseInfoNr !== courseNr && courseColor === findCategoryColorByCourseNumber(selectedPlanID, selectedCourseInfoNr) ? '1px solid #fff' : 'none'
            }}
            onClick={handleCourseClick}
        >
            <div className={styles.title}>{courseNr}</div>
            <FontAwesomeIcon 
                icon={faXmark} 
                className={styles.xIcon}
                onClick={handleRemoveClick}
            />
        </div>
    )
}