import React from 'react'
import InputField from '../components/InputField'

const Location = ({ handleChange, jobLocations }) => {

    // console.log(jobLocations)

    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Location</h4>

            <div>

                <label className='sidebar-label-container'>
                    <input type="radio" name='jobLocation' value='' onChange={handleChange} />
                    <span className='checkmark'></span>All

                </label>

                {[...jobLocations].map(jobLocation => {
                    return <InputField
                    handleChange={handleChange} value={jobLocation} key={jobLocation}
                    title={jobLocation}
                    name='jobLocation'
                />
                })}

               
            </div>
        </div>
    )
}

export default Location