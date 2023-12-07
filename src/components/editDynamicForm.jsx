import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editForm } from '../readux-toolkit/feature/dynamicForm';

const EditForm = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [formName, setFormName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const Navigate = useNavigate()

    const formData = useSelector((state) =>
        state.dynamicForm.forms.find((form) => form?.slug === params?.slug)
    );


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const addQuestion = () => {
        setQuestions([...questions, { question: '', optionType: '', optionsValue: '' }]);
    };

    const removeQuestion = (index) => {
        if (questions.length > 1) {
            const updatedCustomers = [...questions];
            updatedCustomers.splice(index, 1);
            setQuestions(updatedCustomers);
        }

    };



    const handleModalSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            formName,
            questions,
        };

        dispatch(editForm(updatedFormData));

        Navigate(`/`);
    };




    useEffect(() => {
        if (params?.slug && formData) {
            setFormName(formData?.formName);
            setQuestions(formData?.questions);
        }
    }, [params?.slug, formData]);


    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
        const updatedFormData = { ...formData, questions: updatedQuestions };
        dispatch(editForm(updatedFormData)); // Dispatch the updated form data
    };

    return (
        <>
            <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-100'>
                <div className='  flex flex-col w-1/3 shadow-2xl p-[2rem] rounded-md text-center bg-white'>
                    <h1 className='text-[2rem] font-bold mb-4'>Edit form name?</h1>
                    <input
                        type='text'
                        className='me-3 mb-5 p-3  rounded border-2  outline-none'
                        placeholder='Enter Form Name'
                        name='formName'
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                    />
                    <button
                        onClick={openModal}
                        disabled={formName.length === 0}
                        className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Add/Edit Question
                    </button>
                </div>
            </div>
            {
                showModal &&
                <div className="fixed inset-0 w-full h-full bg-gray-300 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8">
                        <div className='w-full  flex justify-between'>
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="bg-blue-400 text-white px-3 py-1 rounded "
                            >
                                Add question </button>
                            <button className='px-3  rounded-full text-white bg-red-500 ' onClick={closeModal}>X</button></div>

                        <form onSubmit={handleModalSubmit} className='container mx-auto'>
                            {questions.map((question, index) => (
                                <div key={index} className="mt-4 p-4 border rounded-lg border-gray-300 flex">
                                    <input
                                        type='text'
                                        className='border p-2 rounded-md  outline-none'
                                        placeholder='Question'
                                        name='question'
                                        value={question.question || questions.question}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required

                                    />
                                    <select
                                        name='optionType'
                                        value={question.optionType}
                                        className=" appearance-none mx-3 bg-white   border border-b cursor-pointer rounded-md p-2 focus:outline-none"
                                        onChange={(e) => handleInputChange(index, e)}
                                        defaultValue=""
                                        required

                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="text">Text</option>
                                        <option value="multichoice">Multichoice Checkbox</option>
                                        <option value="singleselect">Single Select Radio</option>
                                    </select>
                                    {(question.optionType === "multichoice" || question.optionType === "singleselect") && (
                                        <textarea
                                            className='border p-2 mr-3 rounded-md  outline-none'
                                            placeholder='Options'
                                            name="optionsValue"
                                            value={question.optionsValue}
                                            onChange={(e) => handleInputChange(index, e)}
                                            required
                                        ></textarea>
                                    )}
                                    <img src='/delete.png' className='w-5 h-4 mt-3 mr-5 cursor-pointer' alt='delete icon'
                                        onClick={() => removeQuestion(index)}
                                    />
                                </div>
                            ))}

                            <div className='w-full text-center'>
                                {
                                    questions.length !== 0 && <button
                                        type="submit"
                                        className="bg-purple-500 text-white px-4 py-2 rounded mt-4 text-center "
                                    >
                                        Submit
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default EditForm;
