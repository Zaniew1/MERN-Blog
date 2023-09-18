export const Login:React.FC = ():JSX.Element => {
    return (
        <div className="">
            <p>Zaloguj się</p>
            <input type="text" placeholder="Podaj email" className=""/>
            <input type="password" placeholder="Podaj hasło" className=""/>
            <button type="submit">Zaloguj</button>
        </div>
    )
}