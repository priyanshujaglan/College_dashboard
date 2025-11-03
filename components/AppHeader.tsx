'use client'
import Image from 'next/image'
import React from 'react'
import uniLogo from "../public/uniLogo.png"; 
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
function AppHeader() {

  const {data:session} = useSession();

  return (
    <div className='shadow w-335 h-1/12 p-2 overflow-hidden'>
      <div className='flex items-center justify-between'>
        <Image src={uniLogo} alt='unilogo' width={100} height={100}/>
        <div>
            <div className='flex items-center gap-2'>
               <img src={session?.user.image} alt="img"  className='rounded-full border w-12'/>

            <Button variant={"outline"} onClick={()=> signOut()} className=" rounded text-lg px-6 py-3 uppercase w-auto">
          Logout
        </Button> 
        </div>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
