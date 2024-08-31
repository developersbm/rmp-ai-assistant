'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

// Hardcoded tweets data
const hardcodedTweets = [
  {
    id: '1',
    content: 'This is a tweet!',
    image: null,
    username: 'user1',
  },
  {
    id: '2',
    content: 'Another tweet!',
    image: null,
    username: 'user2',
  },
  {
    id: '3',
    content: 'Another tweet!',
    image: null,
    username: 'user3',
  },
];

export default function Home() {
  const [user, setUser] = useState<{ username: string; picture: string } | null>(null);
  const [allTweets] = useState(hardcodedTweets);
  const [loading, setLoading] = useState(true);
  const [signOutSuccess, setSignOutSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { username } = await getCurrentUser();
        if (username) {
          setUser({
            username,
            picture: 'https://via.placeholder.com/150',
          });
        } else {
          // Redirect if no user data
          router.push('/');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setSignOutSuccess(true);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setSignOutSuccess(false);
    }
  };

  if (loading) {
    // Show a loading spinner or message while fetching user data
    return <p>Loading...</p>;
  }

  return (
    <main className="min-h-screen border-x border-[#2f3336] text-[#e7e9ea] flex flex-col min-w-[270px] w-full max-w-[600px]">
      <section className="grid grid-rows-2 sticky top-0 bg-black/40 backdrop-blur-md z-[4]">
        <h3 className="font-bold text-xl pt-3 pb-3 px-4">Home</h3>
        <div className="grid grid-cols-2 text-center border-b-[1px] border-[#2f3336] items-center cursor-pointer">
          <button className="flex justify-center">
            <h3 className="font-bold">For you</h3>
            <div className="bg-[#1d9bf0] h-1 absolute bottom-0 w-[63px] rounded-full"></div>
          </button>
          <button className="text-[#71767b] cursor-not-allowed">
            <h3>Following</h3>
          </button>
        </div>
      </section>

      {/* User Info Section */}
      <section className="flex px-4 pt-4 pb-2 gap-3 border-b-[1px] border-[#2f3336]">
        <figure>
          {user?.picture && (
            <img
              src={user.picture}
              className="h-10 rounded-full mt-1 hover:brightness-90 duration-200 w-full max-w-[40px] object-cover min-w-[40px]"
              alt="profile photo"
            />
          )}
        </figure>
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold">Welcome back:</h1>
          <h1 className="text-2xl font-bold">{user?.username}</h1>
          <textarea
            maxLength={140}
            className="bg-transparent pb-2 mt-2 outline-none text-xl w-full resize-none placeholder:text-[#71767b]"
            placeholder="What's happening?!"
            rows={1}
          ></textarea>
          <button
            className={`px-4 py-1.5 rounded-3xl bg-[#1d9bf0] h-auto text-sm font-bold`}
            disabled
          >
            <h4 className="text-white">Tweet</h4>
          </button>
        </div>
      </section>

      {/* Hardcoded tweets list */}
      <section className="px-4 py-2">
        {allTweets.map((tweet) => (
          <div key={tweet.id} className="border-b border-[#2f3336] pb-2 mb-2">
            <div className="flex items-center mb-2">
              <figure className="mr-2">
                <img
                  src="https://via.placeholder.com/40"
                  className="h-10 rounded-full w-10 object-cover"
                  alt="profile"
                />
              </figure>
              <span className="font-bold">{tweet.username}</span>
            </div>
            <p>{tweet.content}</p>
            {tweet.image && (
              <img
                src={tweet.image}
                className="mt-2 max-w-full"
                alt="tweet image"
              />
            )}
          </div>
        ))}
      </section>
      <button onClick={handleSignOut} className="p-2 mt-4 bg-red-500 text-white rounded">Sign Out</button>
      {signOutSuccess && <p className="text-green-500 mt-4">Successfully signed out!</p>}
    </main>
  );
}