"use client"
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Coins, CoinsIcon, HandCoins, LogOutIcon, MoonIcon, PencilIcon, ShoppingCart, SunIcon, UserCircleIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import logo from '@/public/logo.ico';
import { useAuth } from '@/contexts/AuthContext';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { useCart } from '@/contexts/CartContext';
import { useCredits } from '@/contexts/CreditsContext';

const Navbar = () => {
    const router = useRouter();
    const { totalItems } = useCart();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const { userCredits} = useCredits() ;
    useEffect(() => {
        setMounted(true)
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [userCredits])


    const handleToggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <nav>

            {mounted ? <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                        <Link href="/">
                            <Image src={logo} alt="logo" />
                        </Link>
                        <h1 className="text-foreground"> InstaFarm </h1>
                    </div>

                    {isLoggedIn ? <div className='relative' ref={menuRef}>
                        <div className='flex gap-4'>
                            <button className='relative' onClick={() => router.push("/cart")}>
                                <ShoppingCart className='' />
                                <p className="bg-destructive absolute -right-2 -top-1 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">{!isNaN(totalItems) ? parseInt(totalItems) : ''}</p>
                            </button>
                            <button className='flex items-center gap-2 text-foreground ' onClick={handleToggleMenu}>
                                <UserCircleIcon className='h-7 w-7 text-primary' />
                            </button>

                        </div>
                        {isMenuOpen && (
                            <div className='absolute right-0 mt-2 w-48 text-foreground bg-background border border-gray-200 rounded shadow-lg z-10'>
                                <div className='flex flex-col justify-between p-2'>
                                <button onClick={() => router.push('/credits')} className='flex justify-between items-center gap-2 py-1 px-2 hover:bg-outline'>
                                        <span className='text-sm'>{userCredits}</span>
                                        <HandCoins className='h-5 w-5 text-foreground' />
                                    </button>
                                    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className='flex justify-between items-center gap-2 py-1 px-2 hover:bg-outline'>
                                        <span className='text-sm'>Toggle Theme</span>
                                        {theme === 'light' ? <MoonIcon className='h-5 w-5 text-foreground' /> : <SunIcon className='h-5 w-5 text-foreground' />}
                                    </button>
                                    <button className='flex items-center gap-2 justify-between  py-1 px-2 hover:bg-outline'>
                                        <span className='text-sm'>Edit Profile</span>
                                        <PencilIcon className='h-5 w-5' />
                                    </button>

                                    <button className='flex items-center gap-2 justify-between  py-1 px-2 hover:bg-outline' onClick={handleLogout}>
                                        <span className='text-sm'>Logout</span>
                                        <LogOutIcon className='h-5 w-5' />
                                    </button>

                                </div>
                            </div>
                        )}
                    </div> :
                        <div>
                            <Button variant="Ghost" onClick={() => router.push("/register")}>Signup</Button>
                            <Button variant="outline" className="text-primary" onClick={() => router.push("/login")}>Login</Button>
                        </div>
                    }

                </div>
            </div> :
            <div className="container mx-auto px-4">
             <div className="flex items-center justify-between py-4">
             <div className="flex items-center gap-2">
                 <Link href="/">
                     <Image src={logo} alt="logo" />
                 </Link>
                 <h1 className="text-foreground"> InstaFarm </h1>
             </div>
             </div>
             </div>}
        </nav>
    );
};

export default Navbar;
