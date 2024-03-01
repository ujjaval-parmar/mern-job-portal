import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

const options = [
    { value: 'c++', label: 'c++' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'html', label: 'HTML' },
    { value: 'react', label: 'REACT' },
    { value: 'css', label: 'CSS' },
    { value: 'node', label: 'NODE' },
    { value: 'mongodb', label: 'MONGODB' },
    { value: 'redux', label: 'Redux' },
];

const CreateJob = () => {

    const navigate = useNavigate();

    const { jobId } = useParams();


    const userData = useSelector(state => state.user);

    

    const [formData, setFormData] = useState({
        companyName: '',
        jobTitle: '',
        companyLogo: '',
        minPrice: '',
        maxPrice: '',
        salaryType: '',
        jobLocation: '',
        postingDate: '',
        experienceLevel: '',
        employmentType: '',
        description: '',
        postedBy: ''
    });

    useEffect(() => {
        if (userData.token) {


            fetch('http://localhost:5000/getJobById/' + jobId, {
                headers: {
                    authorization: userData.token,
                    'Content-Type': "application/json",
                }
            })
                .then(res => res.json())
                .then(data => setFormData({...data.data, postingDate: new Date(data.data.postingDate).toISOString().slice(0, 10)}))
                .catch(err => console.log(err));
        }

    }, [jobId, userData])

    // console.log(formData)


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/update-job/'+ jobId, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    authorization: userData.token,
                    'Content-Type': "application/json",
                }
            })

            const result = await response.json();
            console.log(result)

            navigate('/my-jobs');

        } catch (err) {
            console.log(err);
        }
    }
    return (


        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>

            <div className='bg-[#fafafa] pt-10 px-4'>
                <form onSubmit={handleSubmit} className='space-y-5'>

                    {/* First Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Title</label>
                            <input
                                type="text"
                                value={formData.jobTitle}
                                onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                                className='create-job-input'
                            />
                        </div>

                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Name</label>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                className='create-job-input'
                            />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Salary</label>
                            <input
                                type="text"
                                placeholder='$20k'
                                value={formData.minPrice}
                                onChange={e => setFormData({ ...formData, minPrice: e.target.value })}
                                className='create-job-input'
                            />
                        </div>

                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Salary</label>
                            <input
                                type="text"
                                placeholder='$80k'
                                value={formData.maxPrice}
                                onChange={e => setFormData({ ...formData, maxPrice: e.target.value })}
                                className='create-job-input'
                            />
                        </div>
                    </div>


                    {/* Third Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Salary Type</label>
                            <select

                                onChange={e => setFormData({ ...formData, salaryType: e.target.value })}
                                className='create-job-input'>
                                <option value="" >Choose your Salary Type</option>
                                <option value="hourly" >Hourly</option>
                                <option value="monthly" >Monthly</option>
                                <option value="yearly" >Yearly</option>

                            </select>
                        </div>

                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Location</label>
                            <input
                                type="text"
                                placeholder='Ahmedabad'
                                value={formData.jobLocation}
                                onChange={e => setFormData({ ...formData, jobLocation: e.target.value })}
                                className='create-job-input'
                            />
                        </div>
                    </div>

                    {/* Fourth Row */}
                    <div className='create-job-flex'>

                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Posting Date</label>
                            <input
                                type="date"
                                placeholder='Ex: 2024-02-12'
                                value={formData.postingDate}
                                onChange={e => setFormData({ ...formData, postingDate: e.target.value })}
                                className='create-job-input'
                            />
                        </div>

                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Experience Level</label>
                            <select
                                value={formData.experienceLevel}
                                onChange={e => setFormData({ ...formData, experienceLevel: e.target.value })}
                                className='create-job-input'>
                                <option value="" >Choose your Exprerince</option>
                                <option value="NoExperience" >Any experience</option>
                                <option value="WorkRemotely" >Work-remotely</option>
                                <option value="Intership" >Intership</option>

                            </select>
                        </div>


                    </div>

                    {/* Fifth Row */}
                    {/* <div>
                        <label className='block mb-2 text-lg'>Required Skills</label>
                        <CreatableSelect
                            className='create-job-input py-4'
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti

                        />
                    </div> */}

                    {/* Sixth Row */}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Logo</label>
                            <input
                                type="url"
                                placeholder='Pest your comapny logo URL'
                                value={formData.companyLogo}
                                onChange={e => setFormData({ ...formData, companyLogo: e.target.value })}
                                className='create-job-input'
                            />
                        </div>

                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Employment Type</label>
                            <select
                                value={formData.employmentType}
                                onChange={e => setFormData({ ...formData, employmentType: e.target.value })}
                                className='create-job-input'>
                                <option value="" >Choose your Exprerince</option>
                                <option value="Part Time" >Part-time</option>
                                <option value="Full Time" >Full-time</option>
                                <option value="Temporary" >Temporary</option>

                            </select>
                        </div>
                    </div>

                    {/*  Seventh Row */}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg text-gray-700'>Job Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className='w-full pl-3 py-1.5 focus:outline-none'
                            rows={6}
                            placeholder='Job Description'

                        />
                    </div>

                    {/* Lst Row */}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg text-gray-700'>Job Posted By</label>
                        <input type="email"
                            value={formData.postedBy}
                            onChange={e => setFormData({ ...formData, postedBy: e.target.value })}
                            className='create-job-input'
                            placeholder='Enter your Email'
                        />
                    </div>


                    <input type="submit" value='UPDATE' className='my-5 block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />

                </form>
            </div>

        </div>
    )
}

export default CreateJob