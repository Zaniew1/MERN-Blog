import {Nav} from '../Main/Nav'
export const Login:React.FC = ():JSX.Element => {
    
    const asd = (e: React.FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
    }
    
    
    return (
        <div className="flex justify-center">
            <Nav/>
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[35%] xl:w-[25%]">
                <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Zaloguj się</p>
                <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={asd}>
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="email">Email</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="email" id="email" type="text" placeholder="Podaj email" />
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="password">Hasło</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="password" type="password" placeholder="Podaj hasło" />
                    <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white">Zaloguj</button>
                </form>
                <a href="/forget" className="mt-[20px] text-[0.8em] underline ">Nie pamiętam hasła</a>
            </div>
        </div>
    )
}