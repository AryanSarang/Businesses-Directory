
const ConsultantPrice = ({ consultant }) => {
    return (
        <div className="bg-gradient-2 w-72 rounded-lg px-6 py-6  shadow-xl ">
            <h4 className="text-md gilroy-extraBold tracking-wide uppercase">{consultant.specialization}</h4>

            <div className="flex justify-between mt-2">
                <div className="flex flex-col">
                    <span className="text-sm gilroy-bold">1 hour</span>
                    <span className="text-sm gilroy-bold">Video meeting</span>
                </div>
                <span className="text-sm font-bold bg-white rounded-lg my-auto p-2 align-middle shadow-lg"><a href="#formDiv">Rs. {consultant.feesPerConsultation}</a></span>
            </div>

        </div>
    )
};

export default ConsultantPrice;
