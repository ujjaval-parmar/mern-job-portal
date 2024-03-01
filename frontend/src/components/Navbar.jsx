import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/store';


const navItems = [
    { path: '/', title: "Start a search" },
    { path: '/my-jobs', title: "My Jobs", },
    // { path: '/salary', title: "Salary Estimate", },
    { path: '/post-job', title: "Post A Job", },
]


const Navbar = () => {


    const navigate = useNavigate();

    const userData = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // console.log(userData);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }



    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <nav className='flex justify-between items-center py-6'>
                <NavLink href='/' className='flex items-center gap-2 text-2xl text-black'>

                    <img src="/images/logo.png" alt="" />
                    <span>JobPortal</span>
                </NavLink>

                {/* Nav items for LG screens */}
                <ul className='hidden md:flex gap-12'>
                    {navItems.map(({ path, title }) => {

                        if(path==='/post-job'  && !userData.user) return <li key={path}></li>

                        if(path==='/my-jobs'  && !userData.user) return <li key={path}></li>

                        return (
                            <li key={path} className='text-base text-primary'>
                                <NavLink
                                    to={path}
                                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}

                                >{title}</NavLink>
                            </li>
                        )
                    })}
                </ul>

                {/* signup and login button */}
                {!userData.user && <>
                    <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                        <Link to='/login' className='py-2 px-5 bordr rounded '>
                            Log in
                        </Link>
                        <Link to='/sign-up' className='py-2 px-5 bordr rounded bg-blue text-white'>
                            Signup
                        </Link>
                    </div>
                </>}

                {userData.user && <>
                    <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                        <span className='text-xl'>{userData.user.username}</span>
                        <button
                            className='py-2 px-5 bordr rounded bg-blue text-white'
                            onClick={() => {
                                dispatch(logout());
                                navigate('/login');
                            }}
                        >
                            Log out
                        </button>

                    </div>
                </>}

                {/* Mobile Menu  */}
                <div className='md:hidden block'>
                    <button onClick={handleMenuToggle}>
                        {isMenuOpen ?

                            <FaXmark className='w-5 h-5 text-primary' />
                            :
                            <FaBarsStaggered className='w-5 h-5 text-primary' />
                        }
                    </button>
                </div>

            </nav>

            {/* Nav items for mobile  */}
            <div className={`md:hidden px-4 bg-black py-5 rounded-sm ${isMenuOpen ? 'block' : 'hidden'}`}>

                <ul className='flex flex-col gap-2'>
                    {navItems.map(({ path, title }) => {
                        return (
                            <li key={path} className='text-base text-white  py-1 cursor-pointer'>
                                <NavLink
                                    to={path}
                                    className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 'active' : ""}

                                >{title}</NavLink>
                            </li>
                        )
                    })}
                    {<>
                        <li>
                            <Link to='/login' className='py-1 px-5 bordr  rounded text-white'>
                                Log in
                            </Link>
                        </li>
                        <li>
                            <Link to='/sign-up' className='py-2 px-5 bordr rounded bg-blue text-white'>
                                Signup
                            </Link>
                        </li>
                    </>}
                </ul>

            </div>


        </header>
    )
}

export default Navbar