import React from 'react';
import styles from './CourseList.module.css';

function CourseList() {
  const courses = [
    { id: '47202', name: 'Introduction to future energy', result: '12', ects: '5' },
    { id: '01003', name: 'Mathematics 1a (Polytechnical Foundation)', result: '12', ects: '10' },
    { id: '02003', name: 'Computer programming (Polytechnical Foundation)', result: '12', ects: '5' },
    { id: '27016', name: 'Design-Build 1: Devices for Measuring Cell Growth', result: 'BE', ects: '5' },
    { id: '26020', name: 'Fundamental chemistry', result: '12', ects: '5' }
  ];

  return (
    <div className={styles.courseList}>
      <h2>Bachelor in General Engineering</h2>
      <p>Year of study 1 September 2023 - 31 August 2024</p>
      <div className={styles.term}>
        <h3>1. Term</h3>
        <table className={styles.courseTable}>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Result</th>
              <th>ECTS</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.result}</td>
                <td>{course.ects}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseList;
