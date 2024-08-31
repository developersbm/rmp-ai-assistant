'use client';

import React, { createContext, useEffect, useState } from 'react';
import { fetchAuthSession } from '@aws-amplify/auth';
import { useRouter } from 'next/navigation';
import RightSidebar from '../components/RightSidebar';
import LeftSidebar from '../components/LeftSidebar';
import LoadingPage from '../components/LoadingPage';

// Hardcoded data
const hardcodedUsers = [
  {
    userId: '1',
    userNickname: 'user1',
    userName: 'User One',
    userProfileImg: 'https://via.placeholder.com/150',
    followers: [],
    following: [],
    joinedDate: 'January 2024',
    website: '',
    bio: '',
    location: '',
  },
  // Add more hardcoded user data as needed
];

const hardcodedTweets = [
  {
    id: '1',
    text: 'This is a tweet!',
    authorId: '1',
    date: '2024-08-31 12:00:00',
    authorName: 'User One',
    authorNickname: 'user1',
    likedBy: [],
    replies: 0,
    isAReply: false,
    parentTweet: null,
    parentTweetNickname: null,
    authorProfileImg: 'https://via.placeholder.com/150',
    image: null,
  },
  // Add more hardcoded tweet data as needed
];

export const HelloContext = createContext({});

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<any>(null);
  const [userNickname, setUserNickname] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens) {
          const user = await getAuthenticatedUser();
          setCurrentLoggedInUser(user);

          const userData = hardcodedUsers.find((u) => u.userId === user.attributes.sub);
          if (userData) {
            setUserNickname(userData.userNickname);
          } else {
            // Handle case for new users, if needed
          }
        } else {
          setShowLoading(true);
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching session or user not authenticated:', error);
        setShowLoading(true);
        router.push('/');
      }
    };

    checkUser();
  }, [router]);

  const [allTweets, setAllTweets] = useState(hardcodedTweets);

  const onSubmitTweet = () => {
    // Logic for adding tweet without Firebase
  };

  const [imageURL, setImageURL] = useState('');
  const [imageID, setImageID] = useState('');
  const [tweetContent, setTweetContent] = useState('');
  const [imageUpload, setImageUpload] = useState<any>();
  const [imagePreview, setImagePreview] = useState('');

  const renderPreview = () => (
    <figure className="relative">
      <button
        onClick={() => {
          setImageUpload(undefined);
          setImagePreview('');
        }}
        className="absolute p-2 bg-[#0f1419bf] ml-1 mt-1 rounded-full backdrop-blur-[4px] hover:bg-[#1e262ebf] duration-150"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          height={18}
          width={18}
          className="fill-white"
        >
          <g>
            <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
          </g>
        </svg>
      </button>
      <img
        src={imagePreview}
        alt={`preview of image`}
        className="rounded-xl max-w-[100%] max-h-[300px]"
      />
    </figure>
  );

  const [isCreateTweetModalOpen, setIsCreateTweetModalOpen] = useState<boolean>(false);

  const clearInputs = () => {
    setTweetContent('');
    setImageUpload(undefined);
    setImagePreview('');
  };

  const [whoToFollowTab, setWhoToFollowTab] = useState<Array<any>>([]);

  const refreshWhoToFollowTab = () => {
    // Use hardcoded data or logic to populate suggestions
    setWhoToFollowTab(hardcodedUsers);
  };

  const [profileData, setProfileData] = useState<any>({});

  const getProfileData = (nickname: string) => {
    const data = hardcodedUsers.find((user) => user.userNickname === nickname);
    setProfileData(data || {});
  };

  return (
    <div className="App bg-black h-full w-full">
      <div className="app-container">
        {showLoading && <LoadingPage />}
        <HelloContext.Provider
          value={{
            tweetContent,
            setTweetContent,
            imagePreview,
            handleImageChange: (e) => {
              // Simulate image handling
              setImageUpload(e.target.files[0]);
              if (e.target.files.length) {
                if (e.target.files[0].size < 10000000) {
                  const img = URL.createObjectURL(e.target.files[0]);
                  setImagePreview(img);
                } else alert('Image size is too big!');
              }
            },
            setImagePreview,
            imageUpload,
            imageURL,
            uploadFile: () => {
              // Simulate image upload
              setImageURL(''); // Mock URL
              setImageID('');
              setImageUpload(undefined);
              onSubmitTweet();
            },
            allTweets,
            onSubmitTweet,
            setImageID,
            setImageURL,
            renderPreview,
            isCreateTweetModalOpen,
            setIsCreateTweetModalOpen,
            clearInputs,
            refreshWhoToFollowTab,
            whoToFollowTab,
            getProfileData,
            profileData,
          }}
        >
          <LeftSidebar
            userNickname={"userNickname"}
            currentLoggedInUser={currentLoggedInUser}
          />
          {children}
          <RightSidebar currentLoggedInUser={currentLoggedInUser} />
        </HelloContext.Provider>
      </div>
    </div>
  );
}

// Mock function to simulate authenticated user data
const getAuthenticatedUser = async () => {
  return {
    attributes: {
      sub: '1',
      email: 'user@example.com'
    }
  };
};