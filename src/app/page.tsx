'use client';

import React, { useEffect, useState } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import outputs from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify
Amplify.configure(outputs);

function LoginPageContent() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const { authStatus } = useAuthenticator();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Fetch the current authenticated session
        const session = await fetchAuthSession();
        const user = await getCurrentUser();

        if (session.tokens && user) {
          // User is authenticated
          setAuthenticated(true);
          // Redirect to Home
          router.push('/home');
        } else {
          // User is not authenticated
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching session or user not authenticated:', error);
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      router.push('/home');
    }
  }, [authStatus, router]);

  if (loading) {
    // Show a loading spinner or message while checking auth
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {!authenticated && (
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-xl">
          <Authenticator />
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Authenticator.Provider>
      <LoginPageContent />
    </Authenticator.Provider>
  );
}
