import { useState } from 'react'
import { useAuth } from '../STORES/authStore'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import axios from 'axios'
import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleBody,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
} from "../styles/common.js";

function UserProfile() {
    const currentUser=useAuth(state=>state.currentUser)
    const logout=useAuth(state=>state.logout)
    const navigate=useNavigate()
    let [articles,setArticles]=useState([])
    let [loading,setLoading]=useState(false)
    let [error,setError]=useState(null)
    const onLogout=async()=>{
        await logout()
        toast.success("Logged out Sucessfully")
        navigate("/login")
    }
    const navigateToArticleById=(articleObj)=>{
         navigate(`/article/${articleObj._id}`, {
        state: articleObj,
    });
    }
    useEffect(()=>{
        const getAllArticles=async()=>{
            setLoading(true)
            try{
                let res=await axios.get("http://localhost:4000/user-api/articles",{withCredentials:true})
                setArticles(res.data.payload)
            }catch(err){
                console.log("Err is ",err)
                setError(err.response?.data?.error || "Something went wrong");
            }finally{
                setLoading(false)
            }
        }
        getAllArticles()
    },[])

      // convert UTC → IST
    const formatDateIST = (date) => {
        return new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
        });
    };
     if (loading) {
        return <p className={loadingClass}>Loading articles...</p>;
     }
  return (
    <div>
      {error && <p className={errorClass}>{error}</p>}

      <div className="flex justify-end mb-6 mt-3">
        <img src={currentUser.profileImageUrl} alt="profile image" width="50px" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className={articleGrid}>
        {articles.map((articleObj) => (
          <div className={articleCardClass} key={articleObj._id}>
            <div className="flex flex-col h-full">
              {/* Top Content */}
              <div>
                <p className={articleTitle}>{articleObj.title}</p>

                <p>{articleObj.content.slice(0, 20)}...</p>

                <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
              </div>

              {/* Button at bottom */}
              <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => navigateToArticleById(articleObj)}>
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <button onClick={()=>navigate('/author-profile')}>author profile</button> */}
    </div>
  )
}

export default UserProfile