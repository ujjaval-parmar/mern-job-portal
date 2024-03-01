import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, signup } from '../store/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async(e) => {
        e.preventDefault();

        // console.log(formData)

        const body = JSON.stringify(formData);
        

        try{

            const response = await fetch('http://localhost:5000/login',{
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const result = await response.json();

            // console.log(data);

            dispatch(login({
                user: result.data,
                token: result.token
            }))

            navigate('/');


        }catch(error){
            console.log(error);
        }
        


    }


  return (
    <div>
            <h2 className='text-2xl uppercase my-4 text-center font-bold'>Log In</h2>

            <form onSubmit={handleSubmit}  className='w-full md:w-4/12   shadow-lg mx-auto flex flex-col gap-6 p-3'>


                <input
                    type="email"
                    className='p-2 border border-blue '
                    placeholder='Enter Email'
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />

                <input
                    type="password"
                    className='p-2 border border-blue '
                    placeholder='Enter Passwprd'
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <button type="submit"  className='bg-blue text-white mx-auto p-1.5 cursor-pointer uppercase font-bold'>Log In</button>



            </form>
        </div>
  )
}

export default Login