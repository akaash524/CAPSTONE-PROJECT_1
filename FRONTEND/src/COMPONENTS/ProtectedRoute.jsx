import React, { useState } from 'react'
import { useAuth } from '../STORES/authStore'
import { Navigate } from 'react-router'

function ProtectedRoute({children,allowedRoles}) {
    const loading=useAuth(state=>state.loading)
    const currentUser=useAuth(state=>state.currentUser)
    const isAuthenticated=useAuth(state=>state.isAuthenticated)
    const logout=useAuth(state=>state.logout)
    console.log(useAuth(state=>state))
    if(loading){
        return <p>Loading....</p>
    }
    if(!isAuthenticated){
        console.log('not authenticated')
       return <Navigate to='/login' replace />
    }
    if(allowedRoles&&!allowedRoles.includes(currentUser?.role)){
        //logout
        logout()
        return <Navigate to='/unauthorized' replace state={{redirectTo:'/'}} />
    }
    return children
}

export default ProtectedRoute