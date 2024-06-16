import style, { title } from "../util/style"
import Btn from "./button"
import Title from "./title";
type Props = {
    children:React.ReactNode;
    title:string;
    onClick:React.MouseEventHandler<HTMLButtonElement> | null
    id:string;
}
export default function FormLayout(props:Props) {

    return(
        <form className={style.formDefault} id={props.id}>
            <Title text={props.title}/>
            { props.children } 
            {
                !!props.onClick ?
                <Btn onClick={props.onClick}></Btn>
                : null
            }
        </form>
    )
}