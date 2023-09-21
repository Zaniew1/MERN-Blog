export const SeeMoreButton:React.FC = ():JSX.Element => {
    return (
        <div className="w-full flex justify-center items-center  ">
            <button className="w-full mx-[2em] my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white md:w-[30%]">See more posts</button>
        </div>
    );
}