export const Loading:React.FC = ():JSX.Element => {
    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <img className="h-[100px] w-[100px] md:w-[400px] md:h-[400px]" alt="Spinner" src="../../../public/img/Spin-1s-200px.gif"/>
            <p className="text-gray-600 text-[1.4em] pt-[20px]"> Loading posts...</p>
        </div>
    )
}