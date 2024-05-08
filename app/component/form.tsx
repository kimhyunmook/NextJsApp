import style, { title } from "../util/style"
import Btn from "./button"
type Props = {
    children:React.ReactNode;
    title:string|null;
    onClick:React.MouseEventHandler<HTMLButtonElement> | null
    id:string;
}
export default function FormLayout(props:Props) {

    return(
        <form className={style.formDefault} id={props.id}>
            <h2 className={title}>
                { props.title }
            </h2>
            { props.children } 
            {
                !!props.onClick ?
                <Btn onClick={props.onClick}></Btn>
                : null
            }
        </form>
    )
}