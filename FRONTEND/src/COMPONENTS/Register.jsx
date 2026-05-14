import {useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { errorClass, loadingClass } from '../styles/common.js'
import toast from 'react-hot-toast'

function Register() {
    let {register,reset,handleSubmit,formState:{errors}}=useForm()
    let [loading,setLoading]=useState(false)
    let [error,setError]=useState(null)
    const navigate=useNavigate()
    let [preview,setPreview]=useState()

    const onUserRegister=async (newUser)=>{
        setLoading(true)
      //handle the form details....
       const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add all fields except profilePic to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profilePic to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);
      try{
        if(newUser.role==='user'){
            //make req to user api
            let resObj=await axios.post("https://capstone-project-1-zhbo.onrender.com/user-api/users",formData)
            if(resObj.status==201){
                toast.success("Registered Sucessfully")
                navigate('/login')
            }  
        }
        if(newUser.role==='author'){
             //make req to author api
            let resObj=await axios.post("https://capstone-project-1-zhbo.onrender.com/author-api/users",formData)
            if(resObj.status==201){
                toast.success("Registered Sucessfully")
                navigate('/login')
            } 
            
        }
    }catch(err){
        console.log("Err is ",err)
        setError(err.response?.data?.error||"Registration Failed")
    }finally{
      setLoading(false)
    }
    }

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
        }, [preview]);
    if(loading){
        return <p className={loadingClass}></p>
    }
    // if(error){
    //     return <p className={errorClass}>{error}</p>
    // }
  return (
  <div className="min-h-screen flex items-center justify-center bg-black px-6 py-16 relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute w-125 h-125 bg-blue-600/20 blur-[140px] rounded-full"></div>

    {/* Card */}
    <div className="relative z-10 w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-4xl p-8 md:p-10 shadow-2xl">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-white">
          Create Account
        </h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Join BlogSphere and start your blogging journey.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onUserRegister)}>
        
        {/* Error */}
        {error && (
          <p className="bg-red-500/10 border border-red-500/30 text-red-400 text-center rounded-2xl py-3 mb-6">
            {error}
          </p>
        )}

        {/* Role */}
        <div className="mb-8">
          <label className="text-white text-lg font-semibold block mb-4">
            Select Role
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-blue-500 rounded-2xl py-4 cursor-pointer transition">
              <input
                type="radio"
                {...register("role", { required: true })}
                value="user"
                className="accent-blue-500 size-5"
              />

              <span className="text-white font-medium">
                User
              </span>
            </label>

            <label className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-blue-500 rounded-2xl py-4 cursor-pointer transition">
              <input
                type="radio"
                {...register("role", { required: true })}
                value="author"
                className="accent-blue-500 size-5"
              />

              <span className="text-white font-medium">
                Author
              </span>
            </label>
          </div>

          {errors.role?.type === "required" && (
            <p className="text-red-400 text-sm mt-3">
              Please select a role
            </p>
          )}
        </div>

        {/* Names */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div>
            <input
              type="text"
              {...register("firstName", { required: true })}
              placeholder="First Name"
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 transition"
            />

            {errors.firstName?.type === "required" && (
              <p className="text-red-400 text-sm mt-2">
                First name is required
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 transition"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 transition"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-400 text-sm mt-2">
              Email is required
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Create a password"
            className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 transition"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-400 text-sm mt-2">
              Password is required
            </p>
          )}
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <label className="block text-white text-lg font-semibold mb-4">
            Profile Image
          </label>

          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("profileImageUrl")}
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                if (
                  !["image/jpeg", "image/png"].includes(file.type)
                ) {
                  setError("Only JPG or PNG allowed");
                  return;
                }

                if (file.size > 2 * 1024 * 1024) {
                  setError("File size must be less than 2MB");
                  return;
                }

                const previewUrl =
                  URL.createObjectURL(file);

                setPreview(previewUrl);
                setError(null);
              }
            }}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-zinc-400 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-xl file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
          />

          {/* Preview */}
          {preview && (
            <div className="mt-6 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-full border-4 border-white/10 shadow-xl"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition duration-300 shadow-xl shadow-blue-600/20"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  </div>
)
}

export default Register