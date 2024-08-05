import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styles from './DraggableItem.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons' 


export default function DraggableItem({ course, index, courseNr, creditsNr, itemColor }) {
  return (
    // <Draggable key={course.courseNr} draggableId={course.courseNr} index={index}>
    <div className={styles.mainComponent}>
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
