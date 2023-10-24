import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './assets/Components/Root/Root';
import Home from './assets/Components/Home/Home';
import AddProducts from './assets/Components/AddProducts/AddProducts';
import Products from './assets/Components/Products/Products';
import Details from './assets/Components/Details/Details';
import Update from './assets/Components/Update/Update';
import Login from './assets/Components/Login/Login';
import Registration from './assets/Components/Registration/Registration';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './assets/Components/Route/PrivateRoute';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:
    [
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/add-product",
        element:<PrivateRoute><AddProducts></AddProducts></PrivateRoute>
      },
      {
        path:'/products/:brand',
        element:<Products></Products>,
        loader: ()=> fetch('http://localhost:5000/products')

      },
      {
        path:'/detail/:_id',
        element:<PrivateRoute><Details></Details></PrivateRoute>,
        loader: ()=> fetch('http://localhost:5000/products')

      },
      {
        path:"/update/:id",
        element:<PrivateRoute><Update></Update></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/products/${params.id}`)
      },
      {
        path:'/login',
        element:<Login></Login>,
        loader: ()=> fetch("http://localhost:5000/user"),
      },
      {
        path:'/registration',
        element:<Registration></Registration>
      }
      
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
