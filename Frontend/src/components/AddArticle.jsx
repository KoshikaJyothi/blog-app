import React from 'react'
import { useForm } from 'react-hook-form'
function AddArticle() {
  const {register,handleSubmit}=useForm()
  const data=handleSubmit((t)=>{
    console.log(t)
  })
  return (
    <div className='flex flex-col   bg-orange-200 p-10 w-[600px]  mt-[10%] items-center mx-auto'>
      <form onSubmit={data} className='flex flex-col gap-8  w-[50%] h-[50%] me-[50px]'>
<input type="text" placeholder='Enter Title' {...register('title')} className='bg-gray-400 p-2 w-70'/>
<select name="category"{...register('category')} className='w-70 bg-gray-400 p-3'>
  <option value="select">Category</option>
  <option value="Java">Java</option>
  <option value="C">C</option>
</select>
<textarea {...register('content')}rows={10} cols={30} placeholder='Enter the text'className='border-2 p-4'>

</textarea>
<button type='submit' className='bg-blue-300 p-3 w-40 ml-10 rounded-xl'>Publish Article</button>
      </form>

    </div>
  )
}

export default AddArticle