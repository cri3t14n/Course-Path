import React, { createContext, useState } from 'react'
import styles from './Planner.module.css'
import Dashboard from './Dashboard/Dashboard'
import Schedule from './Schedule/Schedule'
import BottomBar from './BottomBar/BottomBar'
import plans from './degreeCourses.json' // Import the JSON data

// Define the context
export const PlansContext = createContext()

export default function Planner() {
  const [selectedPlanID, setSelectedPlanID] = useState("1") // Default to the first plan

  const value = {
    plans,
    selectedPlanID,
    setSelectedPlanID,
  }

  return (
    <PlansContext.Provider value={value}>
      <div className={styles.planner}>
        <Dashboard />
        <Schedule />
        {/* <BottomBar /> */}
      </div>
    </PlansContext.Provider>
  )
}