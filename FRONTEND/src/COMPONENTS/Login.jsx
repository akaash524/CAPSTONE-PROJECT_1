import { useEffect } from 'react'
import { useAuth } from '../STORES/authStore'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { errorClass, formCard, inputClass, submitBtn } from '../styles/common'
import {toast} from 'react-hot-toast'
function Login() {
  let {register, reset,handleSubmit,formState:{errors}}=useForm()
  let login=useAuth(state=>state.login)
  const isAuthenticated=useAuth(state=>state.isAuthenticated)
  const currentUser=useAuth(state=>state.currentUser)
  const error=useAuth(state=>state.error)
  let navigate=useNavigate()
    const handleForm=async (userCred)=>{
      console.log(userCred)
      //handle the form details....
      await login(userCred)
    }
  useEffect(()=>{
    console.log(isAuthenticated,currentUser)
    if(isAuthenticated && currentUser){
      if(currentUser.role==='USER'){
        toast.success("Loged In Sucessfully")
        navigate('/user-profile')
      }
      if(currentUser.role==='AUTHOR'){
        toast.success("Loged In Sucessfully")
        navigate('/author-profile')
      }
    }
  },[isAuthenticated,currentUser])
  return (
    <div className='box-border'>
        <div className='mt-5 flex justify-center text-2xl'>
          <div className={formCard}>
          <h1 className='text-4xl text-center p-4'>Login</h1>
          <form onSubmit={handleSubmit(handleForm)}>
              {/* <div className='flex text-center justify-between items-center'>
                  <span className='text-[36px]'>Select Role</span>
                  <div><input type="radio" {...register('role',{required:true})} id="" value="user" className='border p-2 size-5'/> User</div>
                  <div><input type="radio" {...register('role',{required:true})} id="" value="admin" className='border p-2 size-5'/> Admin</div>
              </div>
              {errors.role?.type==='required'&&<p className='text-red-400'>please select the role</p>} */}
              {error&&<p className={errorClass}>{error}</p>}
              <div className='flex justify-around mt-8 '>
                  <input type="email" {...register('email',{required:true})} id="" placeholder='Email' className={inputClass}/>
              </div>
              {errors.email?.type==='required'&&<p className='text-red-400'>Email is required</p>}
              <div className='flex justify-around mt-8'>
                  <input type="password" {...register('password',{required:true})} id="" placeholder='Password' className={inputClass} />
              </div>
               {errors.password?.type==='required'&&<p className='text-red-400'>Password is required</p>}
              <button type='submit' className={submitBtn}>Login</button>
          </form>
        </div>
        </div>
    </div>
  )
}

export default Login