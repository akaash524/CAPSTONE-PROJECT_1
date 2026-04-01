import './App.css'
import Home from './COMPONENTS/Home.jsx'
import Register from './COMPONENTS/Register.jsx'
import Login from './COMPONENTS/Login.jsx'
import WriteArticle from './COMPONENTS/WriteArticle.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import RootLayout from './COMPONENTS/RootLayout.jsx'
import UserProfile from './COMPONENTS/UserProfile.jsx'
import AuthorProfile from './COMPONENTS/AuthorProfile.jsx'
import ArticleById from './COMPONENTS/ArticleById.jsx'
import {Toaster} from 'react-hot-toast'
import AuthorArticles from './COMPONENTS/AuthorArticles.jsx'
import EditArticle from './COMPONENTS/EditArticle.jsx'
import ProtectedRoute from './COMPONENTS/ProtectedRoute.jsx'
import Unauthorized from './COMPONENTS/Unauthorized.jsx'

import ErrorBoundary from './COMPONENTS/ErrorBoundary.jsx'
function App() {

const routingObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      errorElement:<ErrorBoundary />,
      children:[
        {
          path:"",
          element:<Home />
        },{
          path:"register",
          element:<Register />
        },{
          path:"login",
          element:<Login />
        },{
          path:"user-profile",

          element:
          <ProtectedRoute allowedRoles={['USER']} >
            <UserProfile />
          </ProtectedRoute>
          
        },{
          path:"author-profile",
          element:
          <ProtectedRoute allowedRoles={['AUTHOR']}>
            <AuthorProfile />
          </ProtectedRoute>,
          children:[
            {
              index:true,
              element:<AuthorArticles />
            },
            {
              path:"articles",
              element:<AuthorArticles />
            },
            {
              path:'write-article',
              element:<WriteArticle />
            }
          ]
        },
        {
          path: "article/:id",
          element: <ArticleById />,
        },{
          path:'edit-article',
          element:<EditArticle />
        },
        {
          path:'unauthorized',
          element:<Unauthorized />
        }
      ]
    }
  ])
  return (
    <>
    <Toaster position='top-center' reverseOrder={false} />
    <RouterProvider  router={routingObj}/>
    </>
  )
}

export default App
