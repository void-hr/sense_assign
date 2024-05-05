"use client"
import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const CreditsContext = createContext();

// Create a provider for the context
export const CreditsProvider = ({ children }) => {
  const [userCredits, setUserCredits] = useState(null);

  useEffect(() => {
    const fetchCreditsData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/credits`, {
            headers: {
              Authorization: token,
            },
          });
          const {credits} = await res.json();
          setUserCredits(credits);
        } else {
          console.error('Token not found in localStorage.');
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    fetchCreditsData();
  }, []);

  return (
    <CreditsContext.Provider value={{userCredits, setUserCredits}}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const credits = useContext(CreditsContext);
  return credits;
};
