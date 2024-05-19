import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='w-full h-[75px] flex justify-between items-center  bg-green-600 border border-black rounded-lg font-bold text-2xl px-5'>
            <div className='sm: hidden md:block'>My Todo App</div>
            <div className='flex gap-5 '>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <button>Signup</button>
            </div>
        </div>
    )
}

export default Navbar
