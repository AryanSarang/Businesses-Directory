
import ProcessImage from '../../assets/process.png';
import Accordion2 from "./Accordion2";

const HowItWorks = () => {
    return (
        <div className="bg-white  px-4 md:px-32 py-10 md:py-16" >
            <h1 className="text-3xl text-center md:text-6xl mb-7 md:mb-10">Consulting <b className="gilroy-extraBold">process</b></h1>
            <div className="flex flex-col justify-between md:flex-row">
                <div className="md:w-1/2 p-10 pt-0">
                    <img src={ProcessImage} alt="consulting process" className="rounded-lg" />
                </div>
                <Accordion2 />
            </div>
        </div>
    )
};

export default HowItWorks;
