import DashboardLayout from "../components/dashboard-layout/DashboardLayout";
import Category from "../pages/category/Category";
import Dashboard from "../pages/dashboard/Dashboard";
import Project from "../pages/project/Project";
import Team from "../pages/team/Team";
import PrivateGard from "./PrivateGard";



const PrivateRouter = [

    {
        element: <DashboardLayout />,
        children: [
            {
                element: <PrivateGard />,
                children: [

                    {
                        path: "/",
                        element: <Dashboard />
                    },

                    {
                        path: "/dashboard/project",
                        element: <Project />
                    },

                    {
                        path: "/dashboard/team",
                        element: <Team />
                    },

                    {
                        path: "/dashboard/category",
                        element: <Category />
                    },

                ]
            }
        ]
    }

]


export default PrivateRouter;
