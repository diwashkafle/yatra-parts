import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SideMenu from '@/components/admin/SideMenu';


const AdminLayout = ({
    children, 
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <SidebarProvider>
      <SideMenu/>
      <main>
        <SidebarTrigger/>
      {children}
      </main>
    </SidebarProvider>
    
  )
}

export default AdminLayout