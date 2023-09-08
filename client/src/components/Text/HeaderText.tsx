type HeaderTextType = {
    text:string;
    weight?: number;
    size?: number;
}
export const HeaderText:React.FC<HeaderTextType> = (props): JSX.Element => {
    const headerStyle = {
        fontSize: props.size,
        fontWeight: props.weight
    }

return(
    <h3 className='text-[26px]' style={headerStyle}>{props.text}</h3>
);    
}