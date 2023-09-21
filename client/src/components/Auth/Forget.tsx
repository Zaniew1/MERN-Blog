import {Nav} from '../Main/Nav'
export const Forget:React.FC = ():JSX.Element => {
    
    const asd = (e: React.FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
    }
    
    return (
        <div className="flex justify-center">
            <Nav/>
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[35%] xl:w-[25%]">
                <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Zapomniałeś hasło?</p>
                <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={asd} >
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="email" id="email" type="text" placeholder="Podaj email" />
                    <button type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[0.8em] py-[12px] font-semibold shadow-myShadow hover:bg-cyan-700 hover:text-white">Wyślij mail resetujący</button>
                </form>
            </div>
        </div>
    )
}