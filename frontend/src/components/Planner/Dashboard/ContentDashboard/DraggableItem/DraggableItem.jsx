import React, {useContext} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { PlansContext } from '../../../Planner'
import styles from './DraggableItem.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons' 


export default function DraggableItem({ course, index, courseNr, creditsNr, itemColor }) {

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
    // <Draggable key={course.courseNr} draggableId={course.courseNr} index={index}>
    <div 
      className={styles.mainComponent}
      onClick={handleCourseClick}
    >
        <div className={styles.dragComponent} style={{ backgroundColor: itemColor }}>
            <FontAwesomeIcon icon={faEllipsisVertical} className={styles.dragIcon} />
            <FontAwesomeIcon icon={faEllipsisVertical} className={styles.dragIcon} />
        </div>
        <div className={styles.courseTitle}>{course}</div>
        <div className={styles.creditsNr}>{creditsNr} ECTS</div>
    </div>
    // </Draggable>
  )
}
