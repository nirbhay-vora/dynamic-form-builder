import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteForm, editForm } from '../readux-toolkit/feature/dynamicForm';

function Home() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector(state => state.dynamicForm.forms)


    const handleDeleteForm = (index) =>{
       dispatch(deleteForm(index))
    }
    const handleEditForm = (slug) => {
        dispatch(editForm(slug));
        Navigate(`/editForm/${slug}`)
    };
   
    
    return (
        <>
            <div className='h-screen'>

                <div className='mb-5 h-[20%] flex justify-center items-center'>
                    <button onClick={() => Navigate("/addDynamicForm")} className='border p-3 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-all'>Create New Form</button>
                </div>
                <hr className='mb-5' />
                {
                    formData.length !== 0 ?
                    <div className='container mx-auto px-10'>
                    <h1 className='text-[2rem] font-bold text-center border-b border-gray-500 '>All Forms</h1>
                    <div className='p-5 flex justify-center items-center '>
                        <table className="border-collapse border w-full border-slate-500 bg-slate-700 text-white">
                            <thead>
                                <tr>
                                    <th className='border border-slate-600 px-4 py-2'>Sr. No.</th>
                                    <th className='border border-slate-600 px-4 py-2'>Form title</th>
                                    <th className='border border-slate-600 px-4 py-2'>Created at</th>
                                    <th className='border border-slate-600 px-4 py-2'>Form url</th>
                                    <th className='border border-slate-600 px-4 py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    formData.map((item, index) => (
                                        <tr key={index}>
                                            <td className='border border-slate-600 px-4 py-2'>{index + 1}</td>
                                            <td className='border border-slate-600 px-4 py-2'>{item?.formName}</td>
                                            <td className='border border-slate-600 px-4 py-2'>{item?.created_at}</td>
                                            <td className='border border-slate-600 px-4 py-2'>
                                                <li key={index+1} className=' underline  transition-all hover:text-purple-600 list-none'>
                                                    <Link to={`/${item?.slug}`}>localhost:3000/{item?.slug}</Link>
                                                </li>
                                            </td>
                                            <td className='border flex border-slate-600 px-4 py-2 justify-center'>
                                                <img src='delete.png' className='w-5 mr-5 cursor-pointer' alt='delete icon'
                                                    onClick={() => handleDeleteForm(index)}
                                                />
                                                <img src='edit.png' className='w-5 cursor-pointer' alt='edit icon'
                                                    onClick={() => handleEditForm(item?.slug)}

                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div> : <p className='text-center font-bold text-[1.5rem]'>Click above button to create a form...</p>
                }
            </div>
        </>
    )
}

export default Home