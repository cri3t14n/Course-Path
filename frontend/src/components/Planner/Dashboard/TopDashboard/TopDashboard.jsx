import React, { useContext, useState } from "react"

import styles from './TopDashboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faCaretDown, faCaretUp, faPlus } from '@fortawesome/free-solid-svg-icons'

import { extractPlanNames } from './../../../Planner/utils'

export default function TopDashboard() {
    let plans = extractPlanNames()

    const [dropdownOpen, setDropdownOpen] = useState(false)

    if (plans.length == 1) {
        plans.push('No additional plans yet')
    }
    
    const handlePlanDropdownClick = () => {
        setDropdownOpen(!dropdownOpen)
    }
    
    const handlePlanClick = () => {
        
    }

    const handleAddPlanClick = () => {
        
    }
    
    return (
        <div className={styles.mainView}>
            <div className={styles.topView}>
                <button 
                    className={styles.planDropdown} 
                    onClick={() => handlePlanDropdownClick()}
                >
                    
                    <div className={styles.leftPlanDropdown}>
                        <FontAwesomeIcon icon={faPenToSquare} className={styles.editNote} />
                        <div className={styles.planTitle}>{plans[0]}</div>
                    </div>

                    {dropdownOpen ? (
                        <FontAwesomeIcon icon={faCaretUp} className={styles.caretIcon}/>
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} className={styles.caretIcon}/>
                    )}

                
                </button>

                <button
                    className={styles.addPlan}
                    onClick={() => handleAddPlanClick()}
                >
                    <FontAwesomeIcon icon={faPlus} className={styles.plusIcon}/>
                    <span>Add plan</span>
                </button>

            </div>

            {dropdownOpen && (
                <div className={styles.planDropdownContent}>
                    {plans.slice(1).map((plan) => (
                        <div
                            key={plan}
                            className={styles.planItem}
                            onClick={() => handlePlanClick(plan)}
                        >
                            {plan}
                        </div>
                    ))}
                </div>  
            )}
        </div>
    )
}