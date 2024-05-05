
"use client"

import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';

const CartPage = () => {
    const [cartItems, setCartItems] = useState();
    const [isBalance, setIsBalance] = useState(true);
    const { totalItems, setTotalItems } = useCart();
    useEffect(() => {
        fetchCartData();

    }, [isBalance])
    const fetchCartData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            const { cart } = await response.json();
            setCartItems(cart);
        } catch (error) {
            console.error('Error fetching cart data:', error.message);
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ productId: itemId, quantity: newQuantity }),
            });
            const { cartData } = await res.json();
            setCartItems(cartData)
        } catch (error) {
            console.log("this ", error.message);
        }
        setTotalItems(newQuantity)
    };

    const handleRemoveItem = async (itemId) => {

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/product/${itemId}`,
                {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );
            const { updatedCart } = await response.json();
            setCartItems(updatedCart)
            const newQuantity = cartItems?.items.filter((item) => item.product === itemId);
            setTotalItems(prev => prev - newQuantity.quantity)

        } catch (error) {
            console.error('Error deleting item from cart:', error);
            throw error;
        }
    };

    const handleOrder = async (bill) => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/credits`, {
                headers: {
                    Authorization: token
                }
            });
            const { credits } = await res.json();
            if (credits >= bill) {
                setIsBalance(true)
            }
            else {
                setIsBalance(false)
            }
        } catch (error) {
            console.error("Something went wrong")
        }
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
            {cartItems?.items.length > 0 ? (
                <div>
                    {cartItems?.items.map((item) => (
                        <div key={item._id} className="flex items-center border-b border-gray-300 py-4">
                            <Image height="0" width="0" src={item.image} alt={item.brand} className="w-24 h-24 object-cover mr-4" />
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold">{item.brand}</h2>
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-gray-600">Credits: {item.credits}</p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                                        className="bg-input text-gray-600 px-2 py-1 rounded-md"
                                        disabled={item.quantity <= 1 && true}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                                        className="bg-primary text-primary-foreground px-2 py-1 rounded-md"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <p className="font-semibold">{item.credits * item.quantity}</p>
                            <button
                                onClick={() => handleRemoveItem(item.product)}
                                className="ml-4 text-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="mt-4 flex justify-between items-center">
                        <p className="font-semibold">Total Cred: {cartItems.bill}</p>
                        <Button className="px-4 py-2 rounded-md" onClick={() => handleOrder(cartItems.bill)}>
                            Place Order
                        </Button>

                    </div>
                    { !isBalance ? <div className='flex justify-center text-xl items-center gap-2 '>
                        <div className="text-destructive "> Insufficient creds, </div>
                        <Link href={"/credits"} className={buttonVariants({ variant: "outline" })}> Add More Credits</Link>
                    </div> : ""}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
