import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorComponent from './components/ErrorComponent';
import App from './App';
import Root from './Root';



const Router = createBrowserRouter([
    {
        path:"/",
        element:<Root />,
        children:[
            {
                path:"",

                errorElement: <ErrorComponent />
            }
        ]
    }
])

export default Router;