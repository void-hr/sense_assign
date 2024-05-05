"use client"
import { useCredits } from '@/contexts/CreditsContext';
import { load } from '@cashfreepayments/cashfree-js';

export const doPayment = async (sessionId, credits , setIsSuccess) => {
  let cashfree;

  const initializeSDK = async () => {
    cashfree = await load({
      mode: 'sandbox',
    });
  };

  if (!cashfree) {
    await initializeSDK();
  }

  let checkoutOptions = {
    paymentSessionId: sessionId,
    redirectTarget: '_modal',
  };

  cashfree.checkout(checkoutOptions).then((result) => {
    if (result.error) {
      console.log('User has closed the popup, Check for Payment Status');
      console.log(result.error);
    }
    if (result.redirect) {
      console.log('Payment will be redirected');
    }
    if (result.paymentDetails) {

     const addCreds = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/credits/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({ creds: credits }),
                });
                const data = await res.json();
        } catch (error) {
            console.log("Something went wrong", error.message);
        }
     }
      console.log('Payment has been completed, Check for Payment Status');
      console.log(result.paymentDetails.paymentMessage);
      addCreds();
      setIsSuccess(true);
    }
  });
};
