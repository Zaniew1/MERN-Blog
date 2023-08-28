

import classes from './HeaderText.module.css';
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
    <h3 className={classes.headerText} style={headerStyle}>{props.text}</h3>
);    
}
// .paragraphText{
//     color: var(--fontSize-color-text);
//     font-family: var(--fontFamily-text);
// }