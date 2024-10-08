import { useEffect, useState } from "react";

const ConsultantCard = ({ consultant }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [btnVisible, setBtnVisible] = useState(true);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    const handleApproval = async (approval, consultant) => {
        try {
            const token = localStorage.getItem("access_token");

            const res = await fetch("/api/admin/consultantapprove", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    consultantId: consultant._id,
                    approved: approval
                }),
            });

            const data = await res.json();

            console.log(data);
            if (data.success) {
                console.log(data);
            }
            setBtnVisible(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full basis-1/1 mx-auto md:basis-1/3 shrink-0 p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex justify-end px-4 pt-4">
                {/* <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                        </li>
                    </ul>
                </div> */}
            </div>
            <div className="flex flex-col items-center py-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={consultant.avatar} alt={consultant.name} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{consultant.name}</h5>
                <span className="text-sm text-gray-500 ">{consultant.specialization}</span>
                <div className="flex gap-1">
                    <span className="text-sm text-gray-500 ">Contact: </span>
                    <span className="text-sm text-gray-500 ">{consultant.email}, </span>
                    <span className="text-sm text-gray-500">{consultant.phone}</span>

                </div>
                <span className="text-sm text-gray-500">
                    Charges: Rs. {consultant.feesPerConsultation}/-</span>
                {
                    consultant.approved === "pending" && btnVisible && <div className="flex mt-4 gap-3 md:mt-6">
                        <a onClick={() => handleApproval("approved", consultant)} href="#" className="inline-flex  items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Approve</a>
                        <a onClick={() => handleApproval("rejected", consultant)} href="#" className="py-2 px-4 ms-2 text-sm font-medium text-red-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Reject</a>
                    </div>
                }

                <span className={`text-sm text-gray-500 mt-5 px-5 ${!isExpanded ? 'line-clamp-3 overflow-hidden' : ''}`} >
                    {consultant.experience}<br /><br />
                    <b>Years of experience:</b> {consultant.experienceYear}
                    <br />
                    <b>LinkedIn profile:</b><a href={consultant.linkedinUrl} className="text-blue-600"> {consultant.linkedinUrl}</a>
                </span>
                <button
                    className="text-blue-500 text-xs ml-auto"
                    onClick={toggleIsExpanded}
                >
                    {isExpanded ? 'View Less' : 'View More'}
                </button>
            </div>
        </div>

    )
};

export default ConsultantCard;
