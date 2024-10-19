import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorComponent from './components/ErrorComponent';
import Root from './Root';
import MainForm from './components/MainForm';
import App from './App';



const Router = createBrowserRouter([
    {
        path:"/",
        element:<Root />,
        children:[
            {
                path:"",
                element : <App />,
                errorElement: <ErrorComponent />
            },
            {
                path:"/translate",
                element : <MainForm endpoint='' />,
                errorElement: <ErrorComponent />
            }
        ]
    }
])


export default Router;