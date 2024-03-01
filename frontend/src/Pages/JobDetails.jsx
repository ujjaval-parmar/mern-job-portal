import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const JobDetails = () => {

    const { jobId } = useParams();


    const userData = useSelector(state => state.user);

    const [curJob, setCurJob ] = useState({});

    useEffect(() => {
        if (userData.token) {


            fetch('http://localhost:5000/getJobById/' + jobId, {
                headers: {
                    authorization: userData.token,
                    'Content-Type': "application/json",
                }
            })
                .then(res => res.json())
                .then(data => setCurJob(data.data))
                .catch(err => console.log(err));
        }

    }, [jobId, userData])

    // console.log(curJob);

    const handleApply = async() =>{
        
    }


  return (
    <div className='max-w-screen-xl container mx-auto xl:px-24 px-4'>
        <h2 className='text-2xl text-center my-6'>Job Deatils</h2>

        <div className="my-16 flex gap-6 items-center justify-center">
            <span>{curJob.jobTitle}</span>
            <button className='py-1 px-5 bordr rounded bg-blue text-white' onClick={handleApply}>Apply</button>
        </div>




    </div>
  )
}

export default JobDetails