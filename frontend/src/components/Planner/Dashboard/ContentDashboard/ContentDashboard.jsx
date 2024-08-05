import React, { useState, useContext } from "react"

import styles from './ContentDashboard.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons' 

import DraggableItem from "./DraggableItem/DraggableItem"
import CompletedItem from "./CompletedItem/CompletedItem"
import { PlansContext } from "../../Planner"

import { countTotalGroups, findPlanByID, getTotalECTS, getDegreeName, countTotalScheduleECTS } from './../../utils'
import { countCoursesInSchedule, getCoursesNotInSchedule, getCoursesInSchedule, getCourseTermDetails } from './../../utils'
import { getElectivesNotInSchedule, getElectivesInSchedule } from './../../utils'

export default function ContentDashboard(props) {
    const { degreeCourses, selectedPlanID, setSelectedPlanID } = useContext(PlansContext)

    const [dropdownsOpen, setDropdownsOpen] = useState(Array(2 + countTotalGroups(selectedPlanID)).fill(false))

    const handleDropdownClick = (index) => {
        setDropdownsOpen(dropdownsOpen.map((open, i) => (i === index ? !open : open)));
    }
    
    const completedECTS = countTotalScheduleECTS(selectedPlanID)
    const totalECTS = getTotalECTS(selectedPlanID)

    const plan = findPlanByID(selectedPlanID)

    let progressPercentage    
    if(completedECTS == 0) {
        progressPercentage = 3
    } else {
        progressPercentage = (completedECTS / totalECTS) * 100
    }

    return (
        <div className={styles.mainView}>
            <h1>Degree Requirements</h1>
            <div className={styles.degreeName}>
                <span>{getDegreeName(selectedPlanID)}</span>
            </div>
            <div className={styles.progress}>
                <div className={styles.progressBar}>
                    <div 
                        className={styles.myProgress}
                        style={{ 
                            width: `${progressPercentage}%`, 
                            borderTopRightRadius: progressPercentage >= 99 ? '12px' : '0px',
                            borderBottomRightRadius: progressPercentage >= 99 ? '12px' : '0px'
                        }}
                    ></div>
                </div>
                <span>{completedECTS}/{totalECTS} Total Courses Inputted in Schedule</span>
            </div>

            <div className={styles.requirements}>
                <div 
                    className={styles.showRequirements}
                    onClick={() => handleDropdownClick(0)}
                >
                    {dropdownsOpen[0] ? (
                        <FontAwesomeIcon icon={faCaretUp} className={styles.caretIcon}/>
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} className={styles.caretIcon}/>
                    )}

                    {dropdownsOpen[0] ? (
                        <span>Hide All Degree Requirements</span>
                    ) : (
                        <span>View All Degree Requirements</span>
                    )}
                </div>

                {dropdownsOpen[0] && (
                    <div className={styles.allRequirements}>
                        {plan.degreeCourses.map((category, index) => (
                            <div
                                key={category.name}
                                className={styles.requirementItem}
                            >
                                <div className={styles.smallLine}></div>
                                <div 
                                    className={styles.showRequirement}
                                    onClick={() => handleDropdownClick(index+2)}
                                >
                                    {dropdownsOpen[index+2] ? (
                                        <FontAwesomeIcon icon={faCaretUp} className={styles.innerCaretIcon}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faCaretDown} className={styles.innerCaretIcon}/>
                                    )}
                                    <div>
                                        <span>{category.name}</span>
                                        <span>{countCoursesInSchedule(selectedPlanID, category.courses)}/{category.courses.length}</span>
                                    </div>
                                </div>

                                {dropdownsOpen[index + 2] && (
                                    getCoursesNotInSchedule(selectedPlanID, category.courses).map((course) => (
                                        <DraggableItem key={course.courseNr} course={course.name} courseNr={course.courseNr} creditsNr={course.ects} itemColor={category.color}/>
                                    ))
                                )}
                                
                                {dropdownsOpen[index + 2] && (
                                    getCoursesInSchedule(selectedPlanID, category.courses).map((course) => (
                                        <CompletedItem key={course.courseNr} course={course.name} schedulePlacement={getCourseTermDetails(selectedPlanID, course.courseNr)} itemColor={category.color} />
                                    ))
                                )}


                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.line}></div>
            </div>

            <div className={styles.courseWishes}>
                <div 
                    className={styles.showRequirements}
                    onClick={() => handleDropdownClick(1)}
                >
                    {dropdownsOpen[1] ? (
                        <FontAwesomeIcon icon={faCaretUp} className={styles.caretIcon}/>
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} className={styles.caretIcon}/>
                    )}

                    {dropdownsOpen[1] ? (
                        <span>Hide All Elective Courses</span>
                    ) : (
                        <span>View All Elective Courses</span>
                    )}
                </div>

                {dropdownsOpen[1] && (
                    <div className={styles.allRequirements}>
                        <div
                            key={plan.electiveCourses.name}
                            className={styles.requirementItem}
                        >
                            {
                                getElectivesNotInSchedule(selectedPlanID, plan.electiveCourses.courses).map((course) => (
                                    <DraggableItem key={course.courseNr} course={course.name} courseNr={course.courseNr} creditsNr={course.ects} itemColor={plan.electiveCourses.color}/>
                                ))
                            }

                            {
                                getElectivesInSchedule(selectedPlanID, plan.electiveCourses.courses).map((course) => (
                                    <CompletedItem key={course.courseNr} course={course.name} schedulePlacement={getCourseTermDetails(selectedPlanID, course.courseNr)} itemColor={plan.electiveCourses.color} />
                                ))
                            }
                        
                        </div>
                    </div>
                )}

                
                <div className={styles.line}></div>
            </div>
            

        </div>
    )
}