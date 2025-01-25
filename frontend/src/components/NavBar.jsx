import { useEffect, useState } from 'react';
import hakomerch from '../assets/hakomerch.svg';

const NavBar = () => {
  const [isScroll, setIsScroll] = useState(null);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);
  return (
    <>
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-3 flex items-center justify-between z-50 ${
          isScroll ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm' : ''
        }`}
      >
        <a href="/">
          <div>
            <img src={hakomerch} alt="logo" className="w-36" />
          </div>
        </a>
        <ul className="hidden md:flex text-3sm items-center gap-6 lg:gap-8 rounded-full px-12 py-3">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/collections">Albums</a>
          </li>
          <li>
            <a href="/collections">Photocards</a>
          </li>
          <li>
            <a href="/collections">Lightsticks</a>
          </li>
          <li>
            <a href="/collections">Magazines</a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/create"
            className="hidden lg:flex items-center gap-3 px-8 py-3 border border-gray-600 ml-4 hover:bg-lightHover hover:text-gray-900 duration-500"
          >
            Create a Product
          </a>
          <button className="block md:hidden">hello</button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
