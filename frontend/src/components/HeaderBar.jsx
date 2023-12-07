import React, { useState, useEffect, useRef } from 'react';
import { useGetCategoryQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../../uploads/logo.webp';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CartIcon from './CartIcon';
import { deepPurple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { setCredentials } from '../slices/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../../uploads/logo.webp';
import SearchBar from './SearchBar';
import UserAvatar from './UseAvatar';


const HeaderBar = () => {
    const navigate = useNavigate();
    const { data: categories, isLoading, isError, error } = useGetCategoryQuery();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { userInfo } = useSelector(state => state.auth);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
    };


    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        {
            setCartCount(cartItems.length);
        }
    }, [cartItems]);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef2 = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-200 dark:border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
                                onClick={toggleSidebar}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <LinkContainer to="/">
                                <a href="" className="flex ms-2 md:me-24">
                                    <img src={Logo} className="h-10 me-3 w-500" alt="BASHPO" style={{ width: '3em' }} />
                                </a>
                            </LinkContainer>
                        </div>

                        {userInfo ?
                            (<div className="flex items-center">
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded={isDropdownOpen}
                                        onClick={handleToggleDropdown}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        {/* <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        /> */}
                                        <UserAvatar name={userInfo.name} />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="z-50 absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                                            <div className="px-4 py-3">
                                                <p className="text-sm text-gray-900 dark:text-black">{userInfo.name.toUpperCase()}</p>
                                                <p className="text-sm font-medium text-black-900 truncate dark:text-black-300 dark:text-black">
                                                    {userInfo.email}
                                                </p>
                                            </div>
                                            <ul className="py-1">
                                                <li>
                                                    <div>
                                                        <LinkContainer to={`/favorites/${userInfo._id}`}>
                                                            <a
                                                                href=""
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-black-300 dark:hover:bg-gray-600 dark:hover:text-white
                                                                text-decoration-none"
                                                                role="menuitem"
                                                                onClick={handleToggleDropdown}
                                                            >
                                                                My Favorites

                                                            </a>
                                                        </LinkContainer>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <LinkContainer to={`/myorder/${userInfo._id}`}>
                                                            <a
                                                                href=""
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-black-300 dark:hover:bg-gray-600 dark:hover:text-white
                                                                text-decoration-none"
                                                                role="menuitem"
                                                                onClick={handleToggleDropdown}
                                                            >
                                                                My Orders

                                                            </a>
                                                        </LinkContainer>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <LinkContainer to="/profile">
                                                            <a
                                                                href=""
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-black-300 dark:hover:bg-gray-600 dark:hover:text-white 
                                                                text-decoration-none"
                                                                role="menuitem"
                                                                onClick={handleToggleDropdown}
                                                            >
                                                                Update Profile

                                                            </a>
                                                        </LinkContainer>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <MenuItem onClick={logoutHandler}>
                                                            <span

                                                                className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 dark:text-black-300 dark:hover:bg-red-600 dark:hover:text-white text-decoration-none"
                                                                role="menuitem"
                                                                onClick={handleToggleDropdown}
                                                            >
                                                                <LogoutIcon />Logout

                                                            </span>
                                                        </MenuItem>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>) :
                            (
                                <>
                                    {/* Toggle button for small screens */}
                                    <button
                                        className="block md:hidden text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
        dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={toggleDropdown}
                                    >
                                        Menu
                                    </button>

                                    {/* Dropdown for small screens */}
                                    {dropdownOpen && (
                                        <div
                                            ref={dropdownRef2}
                                            className="md:hidden z-50 absolute right-3 mt-2 top-[3rem] w-48 bg-blue-100 divide-y divide-gray-100 shadow dark:bg-gray-900 dark:divide-gray-600"
                                        >
                                            <LinkContainer to="/register">
                                                <button
                                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                                    onClick={closeDropdown}
                                                >
                                                    Register
                                                </button>
                                            </LinkContainer>
                                            <LinkContainer to="/login">
                                                <button
                                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                                    onClick={closeDropdown}
                                                >
                                                    Login
                                                </button>
                                            </LinkContainer>
                                        </div>
                                    )}

                                    {/* Buttons for medium and larger screens */}
                                    <div className="hidden md:flex z-50 absolute right-0 md:right-60 lg:right-10">
                                        <LinkContainer to="/register">
                                            <button
                                                className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
                hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-4"
                                            >
                                                Register
                                            </button>
                                        </LinkContainer>
                                        <LinkContainer to="/login">
                                            <button
                                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 
                dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Login
                                            </button>
                                        </LinkContainer>
                                    </div>
                                </>


                            )
                        }
                    </div>

                </div>
            </nav>
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? '-translate-x-0' : '-translate-x-full'
                    } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-200`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {isLoading ? (
                            <Loader />
                        ) : error ? (
                            <Loader />
                        ) : (
                            <>
                                <div>
                                    {userInfo && userInfo.admin && (
                                        <LinkContainer to="/admin/userslist">
                                            <button className="bg-red-500 hover:bg-red-400 text-white font-bold border-b-4 border-red-700 hover:border-red-500 rounded px-10 mt-2"
                                            >
                                                <AdminPanelSettingsIcon />
                                                <>Admin Panel</>
                                            </button>
                                        </LinkContainer>
                                    )}
                                    <div>

                                        <div className='py-2'>
                                            <Link to="/cart">
                                                <CartIcon itemCount={cartCount} />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="">
                                        <SearchBar />
                                    </div>
                                    {Array.isArray(categories) &&
                                        categories.map((category) => (
                                            <li key={category}>
                                                <LinkContainer to={`/${category}`}>
                                                    <a key={category} className="flex items-center p-2 text-gray-900 text-sm rounded-lg dark:text-dark hover:bg-lightBlue-100 dark:hover:bg-gray-200 group text-decoration-none">
                                                        <span className="">{category.toUpperCase()}</span>
                                                    </a>
                                                </LinkContainer>
                                            </li>
                                        ))}
                                </div>
                            </>
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default HeaderBar;
