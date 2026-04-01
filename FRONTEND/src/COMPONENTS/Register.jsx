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
        console.log(newUser)
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
            let resObj=await axios.post("http://localhost:4000/user-api/users",formData)
            if(resObj.status==201){
                toast.success("Registered Sucessfully")
                navigate('/login')
            }  
        }
        if(newUser.role==='author'){
             //make req to author api
            let resObj=await axios.post("http://localhost:4000/author-api/users",formData)
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
    <div className='box-border'>
        <h1 className='text-4xl text-center p-4'>Register</h1>
        <div className='mt-5 flex justify-center text-2xl'>
          <div className=' text-center flex flex-col w-112.5 border p-5 rounded-md shadow-2xl'>
          <form onSubmit={handleSubmit(onUserRegister)}>
            {error&&<p className={errorClass}>{error}</p>}
              <div className='flex text-center justify-between items-center'>
                  <span className='text-[36px]'>Select Role</span>
                  <div><input type="radio" {...register('role',{required:true})} id="" value="user" className='border p-2 size-5'/> User</div>
                  <div><input type="radio" {...register('role',{required:true})} id="" value="author" className='border p-2 size-5'/> Author</div>
              </div>
              {errors.role?.type==='required'&&<p className='text-red-400'>please select the role</p>}
              <div className='flex justify-between mt-8'>
                  <input type="text" {...register('firstName',{required:true})} id="" placeholder='First Name' className='border p-2 rounded-md w-[45%] text-center' />
                  <input type="text" {...register('lastName')} id="" placeholder='Last Name' className='border p-2 rounded-md w-[45%] text-center' />
                  {/* last name is optional  */}
              </div>
              {errors.firstName?.type==='required'&&<p className='text-red-400'>First name is required</p>}
              <div className='flex justify-around mt-8 '>
                  <input type="email" {...register('email',{required:true})} id="" placeholder='Email' className='border p-2 rounded-md w-full text-center'/>
              </div>
              {errors.email?.type==='required'&&<p className='text-red-400'>Email is required</p>}
              <div className='flex justify-around mt-8'>
                  <input type="password" {...register('password',{required:true})} id="" placeholder='Password' className='border p-2 rounded-md w-full text-center' />
              </div>
               {errors.password?.type==='required'&&<p className='text-red-400'>Password is required</p>}
              <div className='flex justify-around mt-8'>
                  <input type="file" 
                  accept="image/png, image/jpeg"
                  {...register('profileImageUrl')} id=""
                   onChange={(e) => {
                        //get image file
                        const file = e.target.files[0];
                        // validation for image format
                        if (file) {
                            if (!["image/jpeg", "image/png"].includes(file.type)) {
                            setError("Only JPG or PNG allowed");
                            return;
                            }
                            //validation for file size
                            if (file.size > 2 * 1024 * 1024) {
                            setError("File size must be less than 2MB");
                            return;
                            }
                            //Converts file → temporary browser URL(create preview URL)
                            const previewUrl = URL.createObjectURL(file);
                            setPreview(previewUrl);
                            setError(null);
                            }
                        }
                    }
                   placeholder='Upload Profile Image' 
                   className='border p-2 rounded-md w-full text-center'/>
                   {preview && (
                        <div className="mt-3 flex justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-full border"
                        />
                        </div>
                    )}
              </div >
              <button type='submit' className='px-8 py-2 bg-blue-400 mt-8 rounded-md'>Register</button>
          </form>
        </div>
        </div>

    </div>
  )
}

export default Register