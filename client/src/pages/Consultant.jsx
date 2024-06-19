import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, consulatantFormFailure, consulatantFormStart, consulatantFormSuccess } from "../redux/user/userSlice";
import { useLocation, useParams } from 'react-router-dom';
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { registerLicense } from '@syncfusion/ej2-base';
import { Helmet } from 'react-helmet';


const Consultant = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeEx0QXxbf1x0ZFdMYVxbRX5PMyBoS35RckVlWHhecnVVR2heWEB3');
    const dispatch = useDispatch();
    const [consultant, setConsultant] = useState([]);
    const { consultantId } = useParams();
    const [consultantName, setConsultantName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [status, setStatus] = useState(null);
    const [formData, setFormData] = useState({
        formName: "Booking Form",
        specialization: "Performance Marketing",
        userId: currentUser ? currentUser._id : "not logged in",
        userName: currentUser ? currentUser.username : "not logged in",
        consultantName: "",
        consultantId: consultantId
    });


    const minDate = new Date();
    minDate.setMinutes(0, 0, 0);
    minDate.setHours(minDate.getHours() + 4);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    useEffect(() => {


        const appointmentDateInput = document.getElementById('appointmentDate');
        if (appointmentDateInput) {
            appointmentDateInput.disabled = true;
            appointmentDateInput.style.cursor = 'auto';
        }
        dispatch(clearError());
        const getConsultant = async () => {
            try {
                const res = await fetch("/api/auth/getConsultantById", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ consultantId }),
                });
                const data = await res.json();
                console.log(data);
                if (data.success) {
                    setConsultant(data.data);
                    const consultantFirstName = data.data.name.split(' ')[0];
                    setFirstName(consultantFirstName);

                    setConsultantName(data.data.name);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getConsultant();
    }, []);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            consultantName: consultantName
        }));
    }, [consultantName]);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }
    const handleBooking = async (e) => {
        e.preventDefault();

        dispatch(clearError());
        console.log(formData);
        try {
            dispatch(consulatantFormStart());
            const res = await fetch("/api/user/book-appointment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(consulatantFormFailure(data.message));
                setStatus(data.message);
                return;
            }
            dispatch(consulatantFormSuccess());
            console.log(data);
            if (data.success === true) {
                setStatus("Thank you for booking, we have recieved your appointment and soon we will contact you.");

            }
        } catch (error) {
            dispatch(consulatantFormFailure(error.message));
            setStatus(error.message);
        }
    }

    return (
        <main className="pb-16">
            <div className="consultantBanner min-h-96 flex flex-col-reverse md:flex-row bg-white pt-5 md:pt-32 md:px-40 pb-10 md:pb-20">
                <div className="w-full md:w-2/3 pt-9 px-4 min-h-96 md:px-0">
                    <h4 className="flex mb-3 gap-1 items-center text-4xl font-medium text-gray-900 gilroy-bold tracking-wider">{consultant.name}
                        <svg className='w-9 h-9' xmlns="http://www.w3.org/2000/svg" id="Layer_1" enableBackground="new 0 0 120 120" height="512" viewBox="0 0 120 120" width="512"><g>
                            <path d="m99.5 52.8-1.9 4.7c-.6 1.6-.6 3.3 0 4.9l1.9 4.7c1.1 2.8.2 6-2.3 7.8l-4.2 2.9c-1.4 1-2.3 2.5-2.7 4.1l-.9 5c-.6 3-3.1 5.2-6.1 5.3l-5.1.2c-1.7.1-3.3.8-4.5 2l-3.5 3.7c-2.1 2.2-5.4 2.7-8 1.2l-4.4-2.6c-1.5-.9-3.2-1.1-4.9-.7l-5 1.2c-2.9.7-6-.7-7.4-3.4l-2.3-4.6c-.8-1.5-2.1-2.7-3.7-3.2l-4.8-1.6c-2.9-1-4.7-3.8-4.4-6.8l.5-5.1c.2-1.7-.3-3.4-1.4-4.7l-3.2-4c-1.9-2.4-1.9-5.7 0-8.1l3.2-4c1.1-1.3 1.6-3 1.4-4.7l-.5-5.1c-.3-3 1.5-5.8 4.4-6.8l4.8-1.6c1.6-.5 2.9-1.7 3.7-3.2l2.3-4.6c1.4-2.7 4.4-4.1 7.4-3.4l5 1.2c1.6.4 3.4.2 4.9-.7l4.4-2.6c2.6-1.5 5.9-1.1 8 1.2l3.5 3.7c1.2 1.2 2.8 2 4.5 2l5.1.2c3 .1 5.6 2.3 6.1 5.3l.9 5c.3 1.7 1.3 3.2 2.7 4.1l4.2 2.9c2.5 2.2 3.5 5.4 2.3 8.2z" fill="#00d566" />
                            <g opacity=".15"><path d="m43.4 93.5-2.3-4.6c-.8-1.5-2.1-2.7-3.7-3.2l-4.8-1.6c-2.9-1-4.7-3.8-4.4-6.8l.5-5.1c.2-1.7-.3-3.4-1.4-4.7l-3.2-4c-1.9-2.4-1.9-5.7 0-8.1l3.2-4c1.1-1.3 1.6-3 1.4-4.7l-.5-5.1c-.3-3 1.5-5.8 4.4-6.8l4.8-1.6c1.6-.5 2.9-1.7 3.7-3.2l2.3-4.6c.8-1.6 2.2-2.7 3.7-3.2-2.7-.4-5.4 1-6.6 3.5l-2.3 4.6c-.8 1.5-2.1 2.7-3.7 3.2l-4.8 1.6c-2.9 1-4.7 3.8-4.4 6.8l.5 5.1c.2 1.7-.3 3.4-1.4 4.7l-3.2 4c-1.9 2.4-1.9 5.7 0 8.1l3.2 4c1.1 1.3 1.6 3 1.4 4.7l-.5 5.1c-.3 3 1.5 5.8 4.4 6.8l4.8 1.6c1.6.5 2.9 1.7 3.7 3.2l2.3 4.6c1.4 2.7 4.4 4.1 7.4 3.4l.6-.1c-2.2-.4-4.1-1.6-5.1-3.6z" />
                                <path d="m60.6 22.5 4.4-2.6c.4-.2.8-.4 1.2-.5-1.4-.2-2.9.1-4.1.8l-4.4 2.6c-.4.2-.8.4-1.2.5 1.4.2 2.8 0 4.1-.8z" /><path d="m81 92c-.5 0-1 .1-1.4.2l3.6-.2c.5 0 .9-.1 1.4-.2z" />
                                <path d="m65 98.9-4.4-2.6c-1.5-.9-3.2-1.1-4.9-.7l-.6.1c.9.1 1.7.4 2.5.8l4.4 2.6c1.7 1 3.6 1.1 5.4.5-.8 0-1.6-.2-2.4-.7z" /></g>
                            <path d="m44 53.6 12.5 14.3 25.6-20.6" fill="#00d566" />
                            <path d="m53.5 75.3c-1.4 0-2.8-.6-3.8-1.7l-12.5-14.3c-1.8-2.1-1.6-5.2.4-7.1 2.1-1.8 5.2-1.6 7.1.4l9.4 10.7 21.9-17.6c2.1-1.7 5.3-1.4 7 .8s1.4 5.3-.8 7l-25.6 20.7c-.9.7-2 1.1-3.1 1.1z" fill="#fff" /></g>
                        </svg>
                    </h4>
                    <h5 className="text-sm text-gray-700 gilroy-bold tracking-wider">{consultant.specialization}</h5>

                    <h5 className="text-sm text-gray-700 gilroy-bold tracking-wider">Experience: {consultant.experienceYear} year</h5>
                    <h5 className="text-base mt-2 text-slate-900 font-semibold tracking-wider">Rs. {consultant.feesPerConsultation}/hr</h5>
                    <h5 className="text-base text-slate-900 gilroy-bold mt-5 tracking-widest underline underline-offset-4">ABOUT</h5>
                    <p className="text-sm min-h-32 text-slate-800 font-semibold tracking-wider leading-7 my-3 md:pe-20">
                        {consultant.experience}
                    </p>
                    <h5 className="text-sm text-green-700 gilroy-bold tracking-wider">Successfully consulted: {consultant.ordersNumber} </h5>
                    <div className="flex flex-col mt-2 align-middle text-center">
                        <div className="flex gap-2 items-center">
                            <svg className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        </div>

                    </div>
                </div>
                <div className="md:w-1/3 flex p-5 text-right">
                    <>
                        <Helmet>
                            <link
                                rel="preload"
                                as="image"
                                href={consultant.avatar}
                            />
                        </Helmet>
                        <img src={consultant.avatar} className="w-60 h-60 mx-auto rounded-full" alt={consultant.name} /></>
                    <h1 className="text-4xl gilroy-bold md:gilroy-extraBold text-slate-300 select-none
                     text-center md:text-left uppercase tracking-widest writing-vlr">{consultant.badge !== "none" && consultant.badge}</h1>
                </div>
            </div>

            <div className="pt-10 md:pt-20 px-4 md:px-40">
                <h4 className="mb-9 text-center text-3xl md:text-4xl font-medium text-gray-900 gilroy-bold tracking-wider">Book an appointment with {firstName}</h4>
                {status &&
                    <div className='md:w-1/2 mx-auto mb-9 bg-white py-3 px-4 md:px-1 rounded-lg'>
                        <p className='text-center text-green-500'>{status}</p>

                    </div>}
                <form className="md:w-1/2 mx-auto" id="bookingForm" onSubmit={handleBooking}>
                    <div className='md:flex justify-between gap-8'>

                        <div className="mb-5 md:w-6/12">
                            <label htmlFor="userPhone" className="block mb-2 text-md font-medium text-gray-900">Phone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <FaPhoneAlt />
                                </div>
                                <input type="tel" id="userPhone" required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="9876543210" inputMode="numeric" pattern="[0-9]*" />
                            </div>
                        </div>
                        <div className="mb-5 md:w-6/12 ">
                            <label htmlFor="appointmentDate" className="block mb-2 text-md font-medium text-gray-900">Date & Time</label>
                            <div className="relative datetimepickerDiv">
                                <DateTimePickerComponent required onChange={handleChange} format="dd-MMM-yy HH:mm" min={minDate} max={maxDate}
                                    placeholder="Choose a date and time" id="appointmentDate" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="userMessage" className="block mb-2 text-md font-medium text-gray-900">Message</label>
                        <textarea id="userMessage" onChange={handleChange} rows="4" className="block min-h-28 max-h-52 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                     border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder={`Write a message to ${firstName}`}></textarea>
                    </div>
                    {!currentUser ? (<button className="bg-slate-700 text-white p-2 px-5  rounded-lg
                hover:opacity-90 disabled:opacity-80 tracking-wider">Log in to book appointment</button>) :
                        (<button type="submit" className="bg-slate-700 text-white p-2 px-5  rounded-lg
                hover:opacity-90 disabled:opacity-80 tracking-wider">Book appointment</button>)
                    }
                    <h5 className='my-5 '></h5>
                </form>
            </div >

        </main >
    )
};

export default Consultant;
