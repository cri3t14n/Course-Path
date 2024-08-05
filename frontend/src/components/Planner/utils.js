import plans from './degreeCourses.json'

export const extractPlanNames = () => {
  return plans.map(plan => plan.planName)
}

export const findPlanByID = (planID) => {
  return plans.find(plan => plan.planID === planID)
}

export const findCategoryByID = (planID, categoryID) => {
    const plan = findPlanByID(planID)
    return plan.find(category => category.categoryID === categoryID)
}

export const countTotalGroups = (planID) => {
  const plan = findPlanByID(planID)
  return plan.degreeCourses.length
}

export const countTotalCourses = (planID) => {
  const plan = findPlanByID(planID)
  return plan.degreeCourses.reduce((count, category) => count + category.courses.length, 0)
}

export const countTotalScheduleCourses = (planID) => {
  const plan = findPlanByID(planID)
  return plan.schedule.reduce((total, term) => total + term.coursesNr.length, 0)
}

export const getTotalECTS = (planID) => {
  return findPlanByID(planID).totalECTS
}

export const getDegreeName = (planID) => {
  return findPlanByID(planID).degree
}

export const countTotalScheduleECTS = (planID) => {
    const plan = findPlanByID(planID)
    const allCoursesNr = plan.schedule.flatMap(term => term.coursesNr)
    const allCourses = [
      ...plan.degreeCourses.flatMap(category => category.courses),
      ...plan.electiveCourses.courses
    ]  
    return allCourses
      .filter(course => allCoursesNr.includes(course.courseNr))
      .reduce((total, course) => total + course.ects, 0)
}
  

export const countCoursesInSchedule = (planID, courses) => {
    const plan = findPlanByID(planID)
    const courseNrs = courses.map(course => course.courseNr)
    const scheduleCourseNrs = plan.schedule.flatMap(term => term.coursesNr)
    return courseNrs.reduce((total, courseNr) => {
      return total + (scheduleCourseNrs.includes(courseNr) ? 1 : 0)
    }, 0)
}

export const getCoursesInSchedule = (planID, courses) => {
    const plan = findPlanByID(planID)
    const scheduleCourseNrs = plan.schedule.flatMap(term => term.coursesNr)
    const coursesNotInSchedule = courses.filter(course => scheduleCourseNrs.includes(course.courseNr))
    return coursesNotInSchedule
}

export const getCoursesNotInSchedule = (planID, courses) => {
    const plan = findPlanByID(planID)
    const scheduleCourseNrs = plan.schedule.flatMap(term => term.coursesNr)
    const coursesNotInSchedule = courses.filter(course => !scheduleCourseNrs.includes(course.courseNr))
    return coursesNotInSchedule
}
  
export const getCourseTermDetails = (planID, courseNr) => {
    const plan = findPlanByID(planID)
    for (const term of plan.schedule) {
      if (term.coursesNr.includes(courseNr)) {
        return term.season + " " + term.year
      }
    }
}

export const getElectivesNotInSchedule = (planID) => {
    const plan = findPlanByID(planID)
    const scheduleCourseNrs = plan.schedule.flatMap(term => term.coursesNr)
    return plan.electiveCourses.courses.filter(course => !scheduleCourseNrs.includes(course.courseNr))
}

export const getElectivesInSchedule = (planID) => {
    const plan = findPlanByID(planID)
    const scheduleCourseNrs = plan.schedule.flatMap(term => term.coursesNr)
    return plan.electiveCourses.courses.filter(course => scheduleCourseNrs.includes(course.courseNr))
}
  
export const getAllCourses = (planID) => {
    const plan = findPlanByID(planID)
    return [
        ...plan.degreeCourses.flatMap(category => category.courses),
        ...plan.electiveCourses.courses
    ]
}

export const findCourseByNumber = (planID, courseNr) => {
    const allCourses = getAllCourses(planID)
    return allCourses.find(course => course.courseNr === courseNr)
}
  
export const findCategoryColorByCourseNumber = (planID, courseNr) => {
    const plan = findPlanByID(planID)
    for (const category of plan.degreeCourses) {
      if (category.courses.some(course => course.courseNr === courseNr)) {
        return category.color
      }
    }
    if (plan.electiveCourses.courses.some(course => course.courseNr === courseNr)) {
      return plan.electiveCourses.color
    }
}

export const countTotalCreditsInTerm = (planID, semester) => {
    return semester.coursesNr.reduce((total, courseNr) => {
      const course = findCourseByNumber(planID, courseNr)
      return total + (course ? course.ects : 0)
    }, 0)
}