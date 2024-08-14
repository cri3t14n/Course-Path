import React, { createContext, useState, useEffect } from 'react'
import styles from './Planner.module.css'
import Dashboard from './Dashboard/Dashboard'
import Schedule from './Schedule/Schedule'
import BottomBar from './BottomBar/BottomBar'
import plans from './degreeCourses.json' // Import the JSON data

// Define the context
export const PlansContext = createContext()

export default function Planner() {
  const [selectedPlanID, setSelectedPlanID] = useState("1") // Default to the first plan
  const [courseData, setCourseData] = useState(null)
  const coursePlanId = 1; // Example ID

  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/Course-Plan/${coursePlanId}/`)
  //     .then(response => {
  //         if (!response.ok) {
  //             throw new Error(`HTTP status ${response.status}`);
  //         }
  //         return response.json();
  //     })
  //     .then(data => {
  //         console.log('Data:', data);
  //         setCourseData(data); // Update state with fetched data
  //     })
  //     .catch(error => {
  //         console.error('Fetch Error:', error.message);
  //     });
  // }, []); 


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