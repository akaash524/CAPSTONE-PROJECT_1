import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../STORES/authStore';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
function WriteArticle() {

   let {register, reset,handleSubmit,formState:{errors}}=useForm()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser=useAuth((state)=>state.currentUser)
  const submitArticle=async (articleObj)=>{
        setLoading(true);

    //add authorId to articleObj
    console.log(currentUser)
    articleObj.author=currentUser._id;
    try {
          await axios.post(
            "http://localhost:4000/author-api/articles",
            articleObj,
            { withCredentials: true }
          );

          toast.success("Article published successfully!");

          reset();

          navigate("/author-profile/articles");

        } catch (err) {
          toast.error(err.response?.data?.error || "Failed to publish article");
        } finally {
          setLoading(false);
        }
    }
  return (
    <div className='box-border'>
        <h1 className='text-4xl text-center bg-gray-500 p-4'>Add Article</h1>
        <div className='mt-10 flex justify-center text-2xl'>
          <div className=' text-center flex flex-col w-112.5 border p-5 rounded-md shadow-2xl'>
          <form onSubmit={handleSubmit(submitArticle)}>
              <div className='flex justify-around mt-8 '>
                  <input type="text" {...register('title',{required:true})} id="" placeholder='Title' className='border p-2 rounded-md w-full text-center'/>
              </div>
              {errors.title?.type==='required'&&<p className='text-red-400'>Title is required</p>}
              <div className='flex justify-around mt-8'>
                  <select {...register('category',{required:true})} id="" className='border p-2 rounded-md w-full text-center'>
                    <option value="" disabled selected>-- Select a Category --</option>
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Technology">Technology</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                  </select>
              </div>
               {errors.category?.type==='required'&&<p className='text-red-400'>Category is required</p>}
              <div className='flex justify-around mt-8'>
                  <textarea {...register('content',{required:true})} id="" placeholder='Content' className='border p-2 rounded-md w-full text-center'></textarea>
              </div >
               {errors.content?.type==='required'&&<p className='text-red-400'>Content is required</p>}
              <button type='submit' className='px-8 py-2 bg-blue-400 mt-8 rounded-md'>Publish Article</button>
          </form>
        </div>
        </div>

    </div>
  )
}

export default WriteArticle