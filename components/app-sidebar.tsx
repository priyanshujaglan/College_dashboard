'use client'
import { Calendar, Home, Inbox, LayoutDashboard, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import profilepic from "../public/profile.png"
import { useSession } from "next-auth/react"


export function AppSidebar() {


  const {data:session} = useSession();

  return (
    <Sidebar className="">
      <SidebarContent className="flex items-center p-12">
        <div>
        <img src={session?.user.image} alt="img"  className='rounded-full border w-xsm'/>
        </div>
        <SidebarGroup className="gap-6">
           <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupLabel><LayoutDashboard/>{session?.user.name}</SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu className=" gap-6">
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}