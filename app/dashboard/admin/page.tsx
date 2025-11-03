import { UpcomingClasses } from '@/components/UpcomingClasses'
import { WeeklyTimetable } from '@/components/WeeklyTimetable'
import React from 'react'

function page() {
  return (
    <div>
      <UpcomingClasses/>
      <WeeklyTimetable/>
    </div>
  )
}

export default page
