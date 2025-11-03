import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import StudentView from "@/components/studentView"
import AppHeader from "@/components/AppHeader"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
       <AppHeader/>
        {children}
      </main>
    </SidebarProvider>
  )
}