"use client"
import { createContext, useContext, useEffect, useState } from "react";
import {  useAuth } from "./AuthContext";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [totalItems, setTotalItems] = useState(0);
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        const fetchAllCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/all`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: token,
                    },
                  });
                const {cart} = await response.json();
                const sumOfQuantities = cart?.items.reduce((total, product) => total + product.quantity, 0) ?? 0;
                setTotalItems(sumOfQuantities);
            } catch (error) {
                setTotalItems(0);
            }
        }
        fetchAllCart();
    }, [totalItems, isLoggedIn])

    return (

        <CartContext.Provider value={{ totalItems, setTotalItems }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);