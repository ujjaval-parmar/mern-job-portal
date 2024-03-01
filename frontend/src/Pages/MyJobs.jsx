import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const MyJobs = () => {

    const userData = useSelector(state => state.user);

    // console.log(userData);
    const [jobs, setJobs] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [isLaoding, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData.user) {
            setIsLoading(true);
            fetch('http://localhost:5000/getAllJobsByEmail', {
                headers: {
                    authorization: userData.token,
                    'Content-Type': "application/json",
                }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data.data);
                    setJobs(data.data);

                })
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }
    }, [userData])

    const filteredJobs = searchQuery ? jobs.filter(job => job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) : [...jobs];

    // console.log(filteredJobs);

    const handleDelete = id =>{
        fetch('http://localhost:5000/delete-job/'+id, { method: 'DELETE'})
            .then(()=> setJobs(()=> jobs.filter(job=> job._id !== id)))
            .catch(err=> console.log(err));
            
    }

    return (
        <div>
            <h2 className='text-center text-2xl'>My Jobs</h2>
            <div className='w-6/12 mx-auto'>
                <input type="text" placeholder='Search' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className='py-2 px-3 w-full mx-auto inline-block bg-gray-400 rounded-xl text-white placeholder:text-white' />
            </div>


            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Total Jobs: {filteredJobs.length}</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to='/post-job' className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Add Job</Link>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                           NO.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Job Title
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Company Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Job Location
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Posting Date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold  text-center" colSpan={2}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredJobs.map((job, index) => {
                                        return <tr key={job._id} className='border-2  hover:bg-gray-300 '>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {index + 1}
                                            </th>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {job.jobTitle}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {job.companyName}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {job.jobLocation}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                                {new Date(job.postingDate).toISOString().slice(0, 10)}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">

                                                <Link to={'/update-job/'+job._id} className='bg-blue text-white p-1.5 font-md uppercase font-bold cursor-pointer'>Edit</Link>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">

                                                <button className='bg-red-600 text-white p-1.5 font-md uppercase font-bold cursor-pointer' onClick={()=> handleDelete(job._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    })}


                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

            </section>


        </div>
    )
}

export default MyJobs