import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='w-full h-[75px] flex justify-between items-center bg-gradient-to-r from-green-300 via-green-500 to-green-700 rounded-lg text-white border border-black  font-bold text-2xl px-5'>
            <div className='sm: hidden md:block'>My Todo App</div>
            <div className='flex gap-5 '>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <Link to='/'>
                    <button>Signup</button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
