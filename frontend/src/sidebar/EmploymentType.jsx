import React from 'react'
import InputField from '../components/InputField'

const EmploymentType = ({ handleChange }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Employment Type</h4>

            <div>

                <label className='sidebar-label-container'>
                    <input type="radio" name='employmentType' value='' onChange={handleChange} />
                    <span className='checkmark'></span>All

                </label>

                <InputField
                    handleChange={handleChange} value='Temporary'
                    title='Temporary'
                    name='employmentType'
                />

                <InputField
                    handleChange={handleChange} value='Full-time'
                    title='Full-time'
                    name='employmentType'
                />

                <InputField
                    handleChange={handleChange} value='Part-time'
                    title='Part-time'
                    name='employmentType'
                />


                


            </div>
        </div>
    )
}

export default EmploymentType