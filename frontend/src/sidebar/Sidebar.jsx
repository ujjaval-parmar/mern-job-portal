import React from 'react'
import Location from '../sidebar/Location'
import Salary from './Salary'
import JobPostingData from './JobPostingData'
import WorkExperience from './WorkExperience'
import EmploymentType from './EmploymentType'

const Sidebar = ({handleChange, handleClick, jobLocations}) => {
  return (
    <aside className=''>
        <h3 className='text-lg font-bold mb-2'>Filters</h3>

        <Location handleChange={handleChange} jobLocations={jobLocations}/>

        <Salary handleChange={handleChange} handleClick={handleClick}/>

        <JobPostingData handleChange={handleChange} />

        <WorkExperience handleChange={handleChange}/>

        <EmploymentType handleChange={handleChange}/>


    </aside>
  )
}

export default Sidebar