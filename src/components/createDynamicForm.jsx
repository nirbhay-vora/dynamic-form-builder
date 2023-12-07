import { useState } from 'react';
import { addForm } from '../readux-toolkit/feature/dynamicForm';
import { generateSlug } from '../common/commonFunction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const DynamicInputFields = () => {
    const [questions, setQuestions] = useState([{ question: '', optionType: '', optionsValue: '' }]);
    const [formName, setFormName] = useState("");
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const Navigate = useNavigate()

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedCustomers = [...questions];
        updatedCustomers[index] = { ...updatedCustomers[index], [name]: value };
        setQuestions(updatedCustomers);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', optionType: '', optionsValue: '' }]);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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
        const slug = generateSlug(formName)
        const formData = {
            formName,
            slug,
            questions,
            created_at: new Date().toISOString(),
        };
        dispatch(addForm(formData))

        Navigate(`/`)
    };

    return (
        <>
            <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-100'>
                <div className='  flex flex-col w-1/3 shadow-2xl p-[2rem] rounded-md text-center bg-white'>
                    <h1 className='text-[2rem] font-bold mb-4'>Form Name</h1>

                    <input
                        type='text'
                        className='me-3 p-3  mb-5 rounded border-2  outline-none'
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
                        Add Question
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
                                className="bg-blue-500 text-white px-3 py-1 rounded "
                            >
                                Add question </button>
                            <button className='px-2  rounded-2xl text-white bg-red-600 ' onClick={closeModal}>X</button></div>

                        <form onSubmit={handleModalSubmit} className='container mx-auto'>
                            {questions.map((ques, index) => (
                                <div key={index} className="mt-4 p-4 border border-gray-300 flex">
                                    <input
                                        type='text'
                                        className='border p-2 rounded-md border-purple-600  outline-none'
                                        placeholder='Question'
                                        name='question'
                                        value={questions.question}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required

                                    />
                                    <select
                                        name='optionType'
                                        value={questions.optionType}
                                        className=" appearance-none mx-3 bg-white  border-purple-600  border border-b cursor-pointer rounded-md p-2 focus:outline-none"
                                        onChange={(e) => handleInputChange(index, e)}
                                        defaultValue=""
                                        required

                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="text">Text</option>
                                        <option value="multichoice">Multichoice Checkbox</option>
                                        <option value="singleselect">Single Select Radio</option>
                                    </select>
                                    {(ques.optionType === "multichoice" || ques.optionType === "singleselect") && (
                                        <textarea
                                            className='border p-2 mr-3 rounded-md border-purple-600  outline-none'
                                            placeholder='Options'
                                            name="optionsValue"
                                            value={ques.optionsValue}
                                            onChange={(e) => handleInputChange(index, e)}
                                            required
                                        ></textarea>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(index)}
                                        className="bg-red-500 text-white px-2 rounded "
                                    >
                                        Remove Field
                                    </button>
                                </div>
                            ))}

                            <div className='w-full text-center'>
                                {
                                    questions.length !== 0 && <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded mt-4 text-center "
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

export default DynamicInputFields;
