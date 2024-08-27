import React from 'react'
import Dashboardheader from '../dashboard-header/DashboardHeader'
import DashboardSidebar from '../dashboard-sidebar/DashboardSidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div>
      

      <div className="main-wrapper">

          <Dashboardheader/>
          
          <DashboardSidebar/>

          <Outlet/>

      </div>


    </div>
  )
}

export default DashboardLayout
