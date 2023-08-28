import classes from './CustomImage.module.css';
import Image from 'next/image';
type CustomImageType = {
    src: string,
    alt: string,
    customClass?: string,
    key?: string,
    layout?:"fill",
    objectFit?:"cover",
    imageClass?: string,
  }
export const CustomImage:React.FC<CustomImageType> = (props:CustomImageType): JSX.Element =>{
    return (
        <div className={`${props.customClass !== undefined ? `${classes.image__wrapper} ${props.customClass}` : classes.image__wrapper}`}>
            <Image
            src={props.src}
            alt={props.alt}
            quality={70}
            fill
            priority
            style={{objectFit:"cover"}}
            className={`${props.imageClass !== undefined ? `${classes.slider__image} ${props.imageClass}` : classes.slider__image}`}
            />
         
        </div>
    )
}