import React from 'react'
import InputField from '../components/InputField'

const WorkExperience = ({ handleChange }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Work Exprience</h4>

            <div>

                <label className='sidebar-label-container'>
                    <input type="radio" name='experienceLevel' value='' onChange={handleChange} />
                    <span className='checkmark'></span>All

                </label>

                <InputField
                    handleChange={handleChange} value='Any experience'
                    title='Any experience'
                    name='experienceLevel'
                />


                <InputField
                    handleChange={handleChange} value='Intership'
                    title='Internship'
                    name='experienceLevel'
                />


                <InputField
                    handleChange={handleChange} value='Work remotely'
                    title='Work remotely'
                    name='experienceLevel'
                />


            </div>
        </div>
    )
}

export default WorkExperience