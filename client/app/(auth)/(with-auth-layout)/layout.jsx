import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='flex w-screen'>
            <div className="w-[50vw] h-screen hidden lg:flex ">
                <Image
                    src={"https://images.unsplash.com/photo-1605860001417-def07ad10374?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="Image"
                    className="w-full h-full object-cover  filter brightness-75"
                    width={1300}
                    height={1300}
                />
            </div>
            <div className="flex-1 h-screen flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout