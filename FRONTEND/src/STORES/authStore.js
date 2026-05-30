import axios from "axios";
import {create} from 'zustand'
import { BASE_URL } from "../config/api.js";

export const useAuth=create((set)=>({
    currentUser:null,
    loading:false,
    error:null,
    isAuthenticated:false,
    articles:[],
    login: async(userCredWithRole)=>{
        const {role,...userCredObj}=userCredWithRole
        try{
            set({loading:true,error:null})
            let res=await axios.post(`${BASE_URL}/common-api/login`,userCredObj,{withCredentials:true})
            set({
                loading:false,
                isAuthenticated:true,
                currentUser:res.data.payload
            })
        }catch(err){
            console.log("err is ",err)
            set({
                loading:false,
                error:err.response?.data?.error||"login Failed",
                isAuthenticated:false
            })
        }
    },
    logout: async()=>{
        try{
            //set loading state
            set({loading:true,error:null})
            //make logout api req
            let res=await axios.get(`${BASE_URL}/common-api/logout`,{withCredentials:true})
            //update state
            set({
                loading:false,
                currentUser:null,
                isAuthenticated:false
            })
        }catch(err){
             console.log("err is ",err)
            set({
                loading:false,
                currentUser:null,
                error:err.response?.data?.error||"login Failed",
                isAuthenticated:false
            })
        }
    },
    checkAuth:async()=>{
        console.log('check auth working')
        try{
            set({loading:true,error:null})
            let res=await axios.get(`${BASE_URL}/common-api/check-auth`,{withCredentials:true})
           //console.log(res.data.payload)
           
            set({
                loading:false,
                isAuthenticated:true,
                currentUser:res.data.payload
            })
        }catch(err){
             // If user is not logged in → do nothing
                if (err.response?.status === 401) {
                    set({
                    currentUser: null,
                    isAuthenticated: false,
                    loading: false,
                    });
                    return;
                }

                // other errors
                console.error("Auth check failed:", err);
                set({ loading: false });
        }
    }
}))