import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaRegIdBadge, FaSitemap } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdOutlineCategory, MdOutlineDashboard, MdOutlineEdgesensorHigh, MdOutlineSettings, MdReportGmailerrorred } from 'react-icons/md';
import { TbNewSection, TbTruckDelivery } from 'react-icons/tb';
import { AiFillShop, AiOutlineTags } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineUsers } from 'react-icons/hi2';
import { LiaFileInvoiceDollarSolid, LiaUserCheckSolid } from 'react-icons/lia';
import { BiAccessibility } from 'react-icons/bi';


const DashboardSidebar = () => {

    const location = useLocation();

    return (
        <>
        
            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className="menu-title"> 
                                <span>Admin</span>
                            </li>
                            <li className={`${location.pathname == "/" ? "active" : ""}`}> 
                                <Link to={"/"}><MdOutlineDashboard style={{fontSize: "23px"}} /> <span>Dashboard</span></Link>
                            </li>
                            <li className={`${location.pathname == "/dashboard/category" ? "active" : ""}`}> 
                                <Link to={"/dashboard/category"}><FaSitemap style={{fontSize: "23px"}} /> <span>Category</span></Link>
                            </li>
                            <li className={`${location.pathname == "/dashboard/project" ? "active" : ""}`}> 
                                <Link to={"/dashboard/project"}><FaSitemap style={{fontSize: "23px"}} /> <span>Project</span></Link>
                            </li>
                            <li className={`${location.pathname == "/dashboard/team" ? "active" : ""}`}> 
                                <Link to={"/dashboard/team"}><MdOutlineCategory style={{fontSize: "23px"}} /> <span>Team</span></Link>
                            </li>
                            <li> 
                                <Link to={"/dashboard/tags"}><AiOutlineTags style={{fontSize: "23px"}} /> <span>Services</span></Link>
                            </li>
                            <li> 
                                <Link to={"/dashboard/clients"}><FaRegIdBadge style={{fontSize: "23px"}} /> <span>Clients</span></Link>
                            </li>
                            <li> 
                                <Link to={"/dashboard/orders"}><MdOutlineEdgesensorHigh style={{fontSize: "23px"}} /> <span>Orders</span></Link>
                            </li>
                            <li> 
                                <Link to={"/dashboard/roles"}><LiaUserCheckSolid style={{fontSize: "23px"}} /> <span>Roles</span></Link>
                            </li>
                            <li> 
                                <Link to={"/dashboard/permissions"}><BiAccessibility style={{fontSize: "23px"}} /> <span>Permissions</span></Link>
                            </li>
                            <li> 
                                <Link to={"/dashboard/invoices"}><LiaFileInvoiceDollarSolid style={{fontSize: "23px"}} /> <span>Invoices</span></Link>
                            </li>
                            <li className={`${location.pathname == "/dashboard/profile" ? "active" : ""}`}> 
                                <Link to={"/dashboard/profile"}><CgProfile style={{fontSize: "23px"}} /> <span>Profile</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default DashboardSidebar;
