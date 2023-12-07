import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addFormValue } from '../readux-toolkit/feature/formValue';

function DisplayForm() {
    const params = useParams()
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const slug = params.slug
    const [formValue, setFormvalue] = useState({
        textValue: "",
        checkBoxValue: [],
        radioButtonValue: "",
        slug: slug
    })
    const form = useSelector((state) =>
        state.dynamicForm?.forms?.find((form) => form?.slug === slug)
    );

    if (!form) {
        return <div className='w-screen h-screen flex justify-center items-center'>
            <div className='p-[3rem] shadow-xl rounded text-[2rem] font-bold'>
                Form not found!
            </div>
        </div>;
    }



    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        setFormvalue((prev) => {
            if (name === 'checkBoxValue') {
                if (checked) {
                    setFormvalue({ ...formValue, checkBoxValue: [...formValue.checkBoxValue, value] })
                }
                else {
                    setFormvalue({ ...formValue, checkBoxValue: formValue.checkBoxValue.filter((checkValue) => checkValue !== value) })
                }
            }
            return {
                ...prev,
                [name]: value
            }

        });
    };



    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(addFormValue(formValue))
        Navigate("/")
        setFormvalue({
            ...formValue,
            textValue: "",
            checkBoxValue: [],
            radioButtonValue: "",
        })

        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Uncheck all radio buttons
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radioButton) => {
            radioButton.checked = false;
        });
    }



    const renderForm = () => {
        return (
            <div className='bg-slate-400 h-screen flex flex-col items-center justify-center px-6'>
                <div className='w-full max-w-md p-8 rounded shadow-lg bg-white'>
                    <h2 className='text-center text-2xl font-bold pb-5'>{form.formName}</h2>
                    <form onSubmit={handleFormSubmit}>
                        {form.questions?.map((question, index) => (
                            <div key={index} className={`mb-2 ${question.optionType === 'text' ? 'block' : "flex"}`}>
                                <label className=' mb-2 '>{question.question} :-</label>
                                {question.optionType === 'text' && (
                                    <input
                                        type='text'
                                        name='textValue'
                                        value={formValue.textValue}
                                        onChange={handleChange}
                                        className='border  p-1 rounded w-full  outline-none'
                                        placeholder={`Enter your ${question.question}`}
                                    />
                                )}
                                <div key={index} className='mb-2'>
                                    {question.optionType === 'multichoice' && question.optionsValue.split('\n').map((value, idx) => (
                                        <div key={idx} className='flex items-center'>
                                            <input
                                                type='checkbox'
                                                name='checkBoxValue'
                                                value={value}
                                                onChange={handleChange}
                                                className='mr-2 ml-5'
                                                id={value}
                                            />
                                            <label htmlFor={value}>{value}</label>
                                        </div>
                                    ))}
                                </div>
                                <div key={index} className='mb-2'>
                                    {question.optionType === 'singleselect' && question.optionsValue.split('\n').map((value, idx) => (
                                        <div key={idx} className='flex items-center'>
                                            <input
                                            type='radio'
                                            name='radioButtonValue'
                                            value={value}
                                            onChange={handleChange}
                                            className='mr-2 ml-5'
                                            id={value}
                                        />
                                        <label htmlFor={value}>{value}</label>
                                        </div>
                                    ))}
                                </div>
                               
                            </div>
                        ))}
                        <div className='text-center'>
                            <button className='border mr-2 text-white bg-yellow-700 py-1 px-4 rounded hover:bg-yellow-600 transition-all' onClick={() => Navigate(`/${slug}`)}>View all forms</button>
                            <button className='border text-white bg-purple-900 py-1 px-4 rounded hover:bg-purple-600 transition-all' type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <>
            {
                renderForm()
            }
        </>
    )
}

export default DisplayForm