import {useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { BASE_URL } from '../config/api.js'
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
            let resObj=await axios.post(`${BASE_URL}/user-api/users`,formData)
            if(resObj.status==201){
                toast.success("Registered Sucessfully")
                navigate('/login')
            }  
        }
        if(newUser.role==='author'){
             //make req to author api
            let resObj=await axios.post(`${BASE_URL}/author-api/users`,formData)
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
  <div className="min-h-screen bg-cornsilk-500 py-12 px-6">
    <div className="max-w-3xl mx-auto">

      {/* Card */}
      <div className="border border-olive_leaf-300 bg-cornsilk-600 shadow-sm overflow-hidden">

        {/* Accent Bar */}
        <div className="h-[6px] bg-copperwood-500"></div>

        {/* Header */}
        <div className="px-10 pt-10 pb-8 text-center border-b border-olive_leaf-300">

          <p className="uppercase tracking-[0.25em] text-xs font-bold text-copperwood-500 mb-3">
            BlogSphere
          </p>

          <h1 className="text-5xl md:text-6xl font-black text-black_forest-500">
            Create Account
          </h1>

          <p className="mt-4 text-olive_leaf-500 max-w-xl mx-auto leading-relaxed">
            Join our community of readers and writers.
            Publish ideas, share stories, and connect with people around the world.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onUserRegister)}
          className="p-10"
        >

          {/* Error */}
          {error && (
            <div className="mb-8 border border-copperwood-300 bg-copperwood-900 px-5 py-4">
              <p className="text-copperwood-500 text-center font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Role */}
          <div className="mb-10">

            <label className="block mb-4 uppercase tracking-[0.12em] text-xs font-bold text-black_forest-500">
              Select Role
            </label>

            <div className="grid grid-cols-2 gap-4">

              <label className="border border-olive_leaf-300 bg-cornsilk-500 hover:border-copperwood-500 py-4 px-5 flex items-center justify-center gap-3 cursor-pointer transition">
                <input
                  type="radio"
                  {...register("role", {
                    required: true,
                  })}
                  value="user"
                  className="accent-copperwood-500 size-5"
                />

                <span className="font-semibold text-black_forest-500">
                  User
                </span>
              </label>

              <label className="border border-olive_leaf-300 bg-cornsilk-500 hover:border-copperwood-500 py-4 px-5 flex items-center justify-center gap-3 cursor-pointer transition">
                <input
                  type="radio"
                  {...register("role", {
                    required: true,
                  })}
                  value="author"
                  className="accent-copperwood-500 size-5"
                />

                <span className="font-semibold text-black_forest-500">
                  Author
                </span>
              </label>

            </div>

            {errors.role && (
              <p className="text-copperwood-500 text-sm mt-3 font-semibold">
                Please select a role
              </p>
            )}

          </div>

          {/* Names */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">

            <div>
              <input
                type="text"
                {...register("firstName", {
                  required: true,
                })}
                placeholder="First Name"
                className="
                  w-full
                  border border-olive_leaf-300
                  bg-cornsilk-500
                  px-5 py-4
                  text-black_forest-500
                  placeholder:text-olive_leaf-400
                  outline-none
                  focus:border-copperwood-500
                  transition
                "
              />

              {errors.firstName && (
                <p className="text-copperwood-500 text-sm mt-2 font-semibold">
                  First name is required
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name"
                className="
                  w-full
                  border border-olive_leaf-300
                  bg-cornsilk-500
                  px-5 py-4
                  text-black_forest-500
                  placeholder:text-olive_leaf-400
                  outline-none
                  focus:border-copperwood-500
                  transition
                "
              />
            </div>

          </div>

          {/* Email */}
          <div className="mb-6">

            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              placeholder="Enter your email"
              className="
                w-full
                border border-olive_leaf-300
                bg-cornsilk-500
                px-5 py-4
                text-black_forest-500
                placeholder:text-olive_leaf-400
                outline-none
                focus:border-copperwood-500
                transition
              "
            />

            {errors.email && (
              <p className="text-copperwood-500 text-sm mt-2 font-semibold">
                Email is required
              </p>
            )}

          </div>

          {/* Password */}
          <div className="mb-6">

            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              placeholder="Create a password"
              className="
                w-full
                border border-olive_leaf-300
                bg-cornsilk-500
                px-5 py-4
                text-black_forest-500
                placeholder:text-olive_leaf-400
                outline-none
                focus:border-copperwood-500
                transition
              "
            />

            {errors.password && (
              <p className="text-copperwood-500 text-sm mt-2 font-semibold">
                Password is required
              </p>
            )}

          </div>

          {/* Profile Image */}
          <div className="mb-10">

            <label className="block mb-4 uppercase tracking-[0.12em] text-xs font-bold text-black_forest-500">
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
                    ![
                      "image/jpeg",
                      "image/png",
                    ].includes(file.type)
                  ) {
                    setError(
                      "Only JPG or PNG allowed"
                    );
                    return;
                  }

                  if (
                    file.size >
                    2 * 1024 * 1024
                  ) {
                    setError(
                      "File size must be less than 2MB"
                    );
                    return;
                  }

                  const previewUrl =
                    URL.createObjectURL(file);

                  setPreview(previewUrl);
                  setError(null);
                }
              }}
              className="
                w-full
                border border-olive_leaf-300
                bg-cornsilk-500
                px-5 py-4
                text-olive_leaf-500
                file:mr-4
                file:px-4
                file:py-2
                file:border-0
                file:bg-black_forest-500
                file:text-cornsilk-500
                hover:file:bg-copperwood-500
                file:font-semibold
                transition
              "
            />

            {preview && (
              <div className="mt-8 flex justify-center">

                <img
                  src={preview}
                  alt="Preview"
                  className="
                    w-28 h-28
                    object-cover
                    border-4
                    border-olive_leaf-300
                    shadow-sm
                  "
                />

              </div>
            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              bg-black_forest-500
              hover:bg-copperwood-500
              text-cornsilk-500
              py-4
              uppercase
              tracking-[0.15em]
              text-sm
              font-black
              transition-all
              duration-300
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>
      </div>
    </div>
  </div>
);

}

export default Register