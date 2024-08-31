/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import favicon from '../../public/assets/favicon.png';

export default function LeftSidebar() {
  const sidebarLinkCSS = 'flex items-center gap-4 rounded-full hover:bg-[#171818] py-2.5 px-3 duration-200';
  const sidebarTabCSS = 'cursor-not-allowed flex gap-4 py-2.5 px-3';
  const sidebarTabHeaderCSS = 'text-xl hidden xl:block';

  return (
    <aside className="h-full bg-transparent text-[#e7e9ea] flex flex-col items-end xl:items-start min-w-[55px] sm:min-w-[10%] sm:pr-1.5 xl:mr-36 2xl:mr-[152px]">
      <div className="flex flex-col sm:justify-between h-full items-center fixed z-[5]">
        <section className="flex flex-col gap-0.5 sm:gap-[12px] text-lg items-center xl:items-start w-full xl:w-[220px]">
          <Link href="/home" className="px-3 pt-2 pb-2.5 mt-2.5 rounded-full hover:bg-[#171818] duration-200">
            <Image
              src={favicon}
              alt="Home"
              height={36}
              width={36}
              className="object-contain"
            />
          </Link>

          <Link href="/home" className={sidebarLinkCSS}>
            <svg viewBox="0 0 24 24" aria-hidden="true" height={28} width={28} className="fill-[#e7e9ea]">
              <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
            </svg>
            <h2 className={sidebarTabHeaderCSS}>Home</h2>
          </Link>

          <div className={sidebarTabCSS}>
            <svg viewBox="0 0 24 24" aria-hidden="true" height={28} width={28} className="fill-[#e7e9ea]">
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
            </svg>
            <h2 className={sidebarTabHeaderCSS}>Explore</h2>
          </div>

          <div className={sidebarTabCSS}>
            <svg viewBox="0 0 24 24" aria-hidden="true" height={28} width={28} className="fill-[#e7e9ea]">
              <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
            </svg>
            <h2 className={sidebarTabHeaderCSS}>Notifications</h2>
          </div>

          <div className={sidebarTabCSS}>
            <svg viewBox="0 0 24 24" aria-hidden="true" height={28} width={28} className="fill-[#e7e9ea]">
              <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
            </svg>
            <h2 className={sidebarTabHeaderCSS}>Messages</h2>
          </div>

          <Link href="/profile" className={sidebarLinkCSS}>
            <svg viewBox="0 0 24 24" aria-hidden="true" height={28} width={28} className="fill-[#e7e9ea]">
              <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6z"></path>
            </svg>
            <h2 className={sidebarTabHeaderCSS}>Profile</h2>
          </Link>
        </section>
      </div>
    </aside>
  );
}