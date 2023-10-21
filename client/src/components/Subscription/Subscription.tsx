import {useRef} from 'react';
import { MutableRefObject } from "react"
export const Subscription:React.FC = ():JSX.Element => {
    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
    function subscribe(){
        console.log(emailRef.current.value)
    }
    return(
        <section className="w-full px-[10px] py-[20px] flex flex-col justify-center items-center md:w-[70%] lg:w-[60%]">
            <p  className="text-[1.6em] font-bold pt-[45px] pb-[15px] text-[#2C3241] md:text-[1.8em]	">NAZWA</p>
            <p className="text-[1.2em] text-gray-500 tracking-wider  text-center font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem eos ratione eligendi magnam odit dignissimos.</p>
            <input type="email" placeholder="Enter your mail" ref={emailRef} className="border border-slate-400 w-[90%] h-[50px] pl-[10px] my-[30px]"></input>
            <button onClick={subscribe} className="w-[90%] bg-cyan-700 mb-[10px] text-[1.4em] h-[50px] text-gray-50 font-semibold shadow-myShadow lg:w-[30%]">Subscribe</button>
            <p className="text-[0.8em] text-gray-400"><span className=" text-gray-600">No spam.</span> New articles and recipies. Get on board !</p>
        </section>
    );
}