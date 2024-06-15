import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    clearError, logOutUserFailure, logOutUserStart,
    logOutUserSuccess, notificationFailure,
    notificationStart, notificationSuccess
} from "../redux/user/userSlice";

const Navbar = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [avatarKey, setAvatarKey] = useState(Date.now());
    useEffect(() => {
        if (currentUser) {
            setAvatarKey(Date.now());
            dispatch(clearError());
            const getAllNotifications = async () => {
                try {
                    dispatch(notificationStart());
                    const res = await fetch(`/api/user/get-all-notification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: currentUser._id }),
                    });
                    const data = await res.json();
                    if (data.success === false) {
                        dispatch(notificationFailure(data.message));
                        return;
                    }
                    dispatch(notificationSuccess(data.data));

                } catch (error) {
                    dispatch(notificationFailure(error.message));
                }
            }
            getAllNotifications();
            const intervalId = setInterval(getAllNotifications, 5000);

            return () => clearInterval(intervalId);
        }

    }, [currentUser && currentUser.notification.length]);


    const handleLogOut = async () => {
        try {
            dispatch(logOutUserStart());
            const response = await fetch('/api/auth/logout');
            const data = await response.json();
            if (data.success === false) {
                dispatch(logOutUserFailure(data.message));
                return;
            }
            dispatch(logOutUserSuccess());
        } catch (error) {
            dispatch(logOutUserFailure(data.message));
        }
    }

    return (
        <nav className="bg-white ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1 gilroy-bold text-md">


                <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                    <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg
                     md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">

                        <li><Link to={"/allconsultants"} className="block  md:hover:text-slate-700 py-2 px-3  md:border-0 
                            md:p-0 text-black">
                            All Consultant</Link>
                        </li>
                        <li><Link to={"/dashboard"} className="block  md:hover:text-slate-700 py-2 px-3 md:border-0 
                            md:p-0 text-black">
                            <span>Inbox</span>{currentUser && currentUser.notification && <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium rounded-full bg-blue-900 text-white">{currentUser.notification.length}</span>}
                        </Link>

                        </li>
                        <li><Link to={"/businessconsultancy"} className="block py-2 px-3 md:border-0 
                            md:p-0 md:hover:text-slate-700 text-black">
                            Performance Marketing</Link>
                        </li>
                        <li><Link to={"/applyconsultant"} className="block py-2 px-3 md:border-0 
                            md:p-0 md:hover:text-slate-700 text-black">
                            Become a consultant</Link>
                        </li>
                        {
                            currentUser ?
                                <li className="relative">
                                    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center w-full py-2 px-3 md:hover:bg-transparent md:border-0 md:hover:text-slate-700 md:p-0 md:w-auto">
                                        <img referrerPolicy="no-referrer" src={currentUser.avatar} key={avatarKey} alt="dashboard" className="rounded-full h-7 w-7 object-cover" />
                                        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>
                                    <div id="dropdownNavbar" className="z-10 hidden font-normal divide-y divide-gray-200 rounded-lg shadow w-36 bg-white">
                                        <ul className="py-2 text-sm text-black" aria-labelledby="dropdownLargeButton">
                                            <li>
                                                <span className="block px-2 pt-1 pb-2 text-black hover:bg-gray-100">@{currentUser.username}</span>
                                            </li>
                                            <li>
                                                <Link to={"/dashboard"} className="block px-2 py-1 font-semibold text-black hover:bg-gray-100">
                                                    Dashboard</Link>
                                            </li>

                                        </ul>

                                        <div className="py-1" onClick={handleLogOut}><Link to={"/"} className="block px-2 py-1 text-sm text-black  font-semibold hover:bg-gray-100">
                                            Log out
                                        </Link>  </div>

                                    </div>
                                </li>

                                :
                                <Link to={"/login"}>
                                    <li className="text-white tracking-wider gilroy-Bold hover:bg-white hover:text-slate-700 bg-slate-500 border-2 rounded-md border-slate-500 w-24 p-2 ">

                                        Log In

                                    </li></Link>


                        }


                    </ul>
                </div>
            </div>
        </nav >
    )
};

export default Navbar;
