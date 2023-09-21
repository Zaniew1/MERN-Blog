import {Nav} from '../Main/Nav'
export const Reset:React.FC = ():JSX.Element => {
    
    const asd = (e: React.FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
    }
    
    
    return (
        <div className="flex justify-center">
            <Nav/>
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[35%] xl:w-[25%]">
                <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Zresetuj hasło</p>
                <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={asd}>
                    <input className="px-[10px] py-[10px] mb-[15px] border-[1px] border-cyan-700" name="password" id="password" type="password" placeholder="Podaj nowe hasło" />
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="confirmPassword" type="confirmPassword" placeholder="Powtórz nowe hasło" />
                    <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white">Zaloguj</button>
                </form>
                <a href="/forget" className="mt-[20px] text-[0.8em] underline ">Nie pamiętam hasła</a>
            </div>
        </div>
    )
}