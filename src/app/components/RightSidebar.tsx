/* eslint-disable consistent-return */
/* eslint-disable @next/next/no-img-element */
import { usePathname } from 'next/navigation';
import React from 'react';

export default function RightSidebar() {
  // Hardcoded data
  const users = [
    {
      userId: 'user1',
      docUserId: 'doc1',
      following: ['user2', 'user3'],
      followers: ['user4'],
    },
    {
      userId: 'user2',
      docUserId: 'doc2',
      following: ['user1'],
      followers: ['user1'],
    },
    // Add more static user data as needed
  ];

  // Since we removed authentication, we don't use currentLoggedInUser
  // Instead, use hardcoded values or defaults for demonstration

  const pathname = usePathname();
  const param = pathname.slice(6); // grabs the nickname from the url
  const followListparam = pathname.slice(-9); // grabs the follower/following status from the url

  const linksButtonsCSS: string =
    'w-full px-3 py-2.5 hover:bg-[#1d1f24] duration-100 flex group gap-2 items-center';

  const linksButtonsHeadingCSS: string =
    'text-lg group-hover:text-[#1d9bf0] duration-200 text-[#e7e9ea]';

  const articleCSS: string = 'bg-[#16181c] rounded-2xl text-[#e7e9ea]';

  return (
    <aside className="h-full py-4 text-[#e7e9ea] hidden lg:block">
      <div className="pl-3 xl:ml-4 flex flex-col gap-4 fixed w-full max-w-[28%] xl:max-w-[368px] xl:w-full removefixed">
        <div className="relative">
          <label htmlFor="searchBar"></label>
          <input
            id="searchBar"
            className="bg-[#202327] rounded-3xl py-3 px-4 outline-none w-full pl-[44px] focus:outline-[#1d9bf0] focus:bg-black outline-1 peer"
            placeholder="Search Twitter"
            type="text"
          />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            height={22}
            width={21}
            className="fill-[#71767b] absolute left-[12px] top-[13px] peer-focus:fill-[#1d9bf0]"
          >
            <g>
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
            </g>
          </svg>
        </div>

        <article className={`${articleCSS} p-3 flex flex-col gap-2`}>
          <h3 className="text-xl font-bold">Get Verified</h3>
          <h4 className="font-bold">Subscribe to unlock new features.</h4>
          <button className="bg-[#1d9bf0] px-4 py-1.5 rounded-3xl text-[15px] font-bold text-white w-fit">
            Get Verified
          </button>
        </article>

        <article className={articleCSS}>
          <h3 className="text-xl font-bold px-3 pt-3 pb-2">Links</h3>
          <button
            onClick={() => window.open('https://github.com/')}
            className={linksButtonsCSS}
          >
            <svg
              viewBox="0 0 48 48"
              id="Layer_2"
              data-name="Layer 2"
              xmlns="http://www.w3.org/2000/svg"
              height={27}
              width={27}
              className="fill-[#e7e9ea] group-hover:fill-[#1d9bf0] duration-200"
            >
              <path d="M24,2.5a21.5,21.5,0,0,0-6.8,41.9c1.08.2,1.47-.46,1.47-1s0-1.86,0-3.65c-6,1.3-7.24-2.88-7.24-2.88A5.7,5.7,0,0,0,9,33.68c-1.95-1.33.15-1.31.15-1.31a4.52,4.52,0,0,1,3.29,2.22c1.92,3.29,5,2.34,6.26,1.79a4.34,4.34,0,0,1,1.31-2.7c-5.26-.6-10.81-2.63-10.81-11.7a9.32,9.32,0,0,1,2.47-6.46,9.17,9.17,0,0,1,.26-6.8s2-.64,6.56,2.5a22.73,22.73,0,0,1,12,0c4.54-3.14,6.56-2.5,6.56-2.5a9.17,9.17,0,0,1,.26,6.8,9.32,9.32,0,0,1,2.47,6.46c0,9.06-5.55,11.11-10.81,11.7a4.34,4.34,0,0,1,1.31,2.7c1.27,.55,4.33,1.5,6.26-1.79a4.52,4.52,0,0,1,3.29-2.22c0,0,2.1-.02,.15,1.31a5.7,5.7,0,0,0-1.23,3.7c0,1.79.44,3.45,1.47,4.26A21.5,21.5,0,0,0,24,2.5Z"></path>
            </svg>
            <p className={linksButtonsHeadingCSS}>GitHub</p>
          </button>
          <button
            onClick={() => window.open('https://www.linkedin.com')}
            className={linksButtonsCSS}
          >
            <svg
              viewBox="0 0 48 48"
              id="Layer_2"
              data-name="Layer 2"
              xmlns="http://www.w3.org/2000/svg"
              height={27}
              width={27}
              className="fill-[#e7e9ea] group-hover:fill-[#1d9bf0] duration-200"
            >
              <path d="M4.8,2.4h38.4c1.3,0,2.4,1.1,2.4,2.4v38.4c0,1.3-1.1,2.4-2.4,2.4H4.8c-1.3,0-2.4-1.1-2.4-2.4V4.8c0-1.3,1.1-2.4,2.4-2.4ZM7.2,13.2c-1.1,0-2,0.9-2,2s0.9,2,2,2,2-0.9,2-2-0.9-2-2-2Zm0-2c-2.2,0-4,1.8-4,4s1.8,4,4,4,4-1.8,4-4-1.8-4-4-4Zm16.8,4c0-3.8-2.9-6.8-6.6-6.8-3.5,0-6.4,2.4-6.4,6.4v0.1c0,3.6,2.9,6.6,6.5,6.6,3.7,0,6.6-2.9,6.6-6.6v-0.1Zm-13.2,27.2h-6v-20h6v20Zm-3-22.2c-3.6,0-6.6-2.9-6.6-6.6v-0.1c0-3.6,2.9-6.5,6.6-6.5,3.6,0,6.6,2.9,6.6,6.6v0.1c0,3.6-2.9,6.6-6.6,6.6Zm19.2,22.2h-6v-10.9c0-2.6-0.9-4.4-3.1-4.4-1.7,0-2.8,1.1-3.3,2.1-0.2,0.4-0.3,0.9-0.3,1.5v11.7h-6v-13c0-0.7,0-1.5,0.1-2.2,0.1-1.2,0.3-2.2,0.8-3.2,0.6-1.1,1.7-2.2,3.1-2.2,1.8,0,3.1,0.6,4.2,1.8,1.2,1.2,1.8,3,1.8,5.4v10.4Z"></path>
            </svg>
            <p className={linksButtonsHeadingCSS}>LinkedIn</p>
          </button>
        </article>
      </div>
    </aside>
  );
}