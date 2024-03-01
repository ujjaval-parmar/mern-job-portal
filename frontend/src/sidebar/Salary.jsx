import React from 'react'
import Button from './Button'
import InputField from '../components/InputField'

const Salary = ({ handleChange, handleClick }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Salary</h4>

           

            <div>

                <label className='sidebar-label-container'>
                    <input type="radio" name='maxPrice' value='' onChange={handleChange} />
                    <span className='checkmark'></span>All

                </label>

                <InputField
                    handleChange={handleChange} value={30}
                    title="< 30000k"
                    name='maxPrice'
                />

                <InputField
                    handleChange={handleChange} value={50}
                    title="< 50000k"
                    name='maxPrice'
                />

                <InputField
                    handleChange={handleChange} value={80}
                    title="< 80000k"
                    name='maxPrice'
                />

                <InputField
                    handleChange={handleChange} value={100}
                    title="< 100000k"
                    name='maxPrice'
                />



            </div>


        </div>
    )
}

export default Salary