import classes from './PublishedDate.module.css';
type PublishedDateType = {
    date:string;
}

export const PublishedDate:React.FC<PublishedDateType> = (props): JSX.Element => {
return(
    <p className={classes.publishedDate}>{`Opublikowano: ${props.date}`}</p>
);    
}