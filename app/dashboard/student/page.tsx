'use client'
import { UpcomingClasses } from '@/components/UpcomingClasses';
import { WeeklyTimetable } from '@/components/WeeklyTimetable';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

function page() {
  const {data:session} = useSession();

  return (
    <div>
      student
      <button onClick={()=> signOut()} className="bg-slate-950 text-white rounded text-lg w-auto px-6 py-3 uppercase">
          Logout
        </button> 
        <UpcomingClasses/>
      <WeeklyTimetable/>
    </div>
  )
}

export default page
