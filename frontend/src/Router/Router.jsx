import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import { useSelector } from "react-redux";
import MyJobs from "../Pages/MyJobs";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [

            { path: '/', element: <Home /> },

            { path: '/post-job', element: <CreateJob /> },

            { path: '/sign-up', element: <Signup />   },

            { path: '/login', element: <Login />  }  ,

            { path: '/my-jobs', element: <MyJobs />  }  ,

            { path: '/update-job/:jobId', element: <UpdateJob />  }  ,
            
            
            { path: '/job-details/:jobId', element: <JobDetails />  }  ,


        ]
    }
])

export default router;