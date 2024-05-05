"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { HandCoins } from 'lucide-react';
import {doPayment} from '../cashfree/Cashfree';
import { useCredits } from '@/contexts/CreditsContext';
import { redirect } from 'next/navigation';
const AddCredits = () => {
    const [credits, setCredits] = useState(0);
    const [amount, setAmount] = useState(0);
    const [ sessionId, setSessionId] = useState('')
    const [ isSuccess, setIsSuccess ] = useState(false)
    const { setUserCredits } = useCredits();
  const handleCreditChange = (e) => {
    const creditValue = parseInt(e.target.value);
    setCredits(creditValue);
    setAmount(creditValue * 1.75);
  };

  
  const handleBuyCredits = async(bill) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cashfree/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({bill}),
        });
        const { sessionID } = await res.json();
        setSessionId(sessionID);

    } catch (error) {
        console.error("Something went wrong")
    }
  };

  const handlePayment = async() => {
        const data = await doPayment(sessionId, credits, setIsSuccess);
        setUserCredits(prev => prev + credits)
        setSessionId('')
        
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="flex  gap-2 justify-center text-lg font-semibold mb-4 text-center">Add Credits
      <HandCoins /></h2>
      <form>
        <div className="mb-4">
          <label htmlFor="credits" className="block text-sm font-medium text-gray-700">Credits
          </label>
          <input
            type="number"
            id="credits"
            name="credits"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={credits}
            onChange={handleCreditChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (INR)</label>
          <input
            type="text"
            id="amount"
            name="amount"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={`₹ ${amount ? amount : ''}`}
            readOnly
          />
        </div>
        <div className="text-center">
          <Button
            type="button"
            className="text-white px-4 py-2 rounded-md shadow-lg"
            onClick={() =>handleBuyCredits(amount)}
            disabled={ credits && amount ? false : true }
          >
            Buy Now
          </Button>
        </div>
      </form>

      {sessionId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-center">Payment Modal</h2>
            <p className="text-center mb-4">Complete your payment</p>
            <Button
              className="text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600"
              onClick={() => handlePayment()}
            >
              Pay Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCredits