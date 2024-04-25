import { useState } from "react";
import { absolute_center } from "../util/style";

type Props = {
    children?:React.ReactElement|string;
    className?:string;
    display:boolean;
    closeBtn?:React.ReactElement;
}

export default function Modal(props:Props) {
    const [display,setDisplay] = useState(props.display)
    function close(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setDisplay(false);
        window.location.reload();
    }
    return(
        <div className={`modal-bg ${display ? 'block' : 'hidden'}`}>
            <div className={`modal ${props.className}`}>
                {
                    !!!props.closeBtn ?
                    <button className="modalBtn" onClick={close}>Close</button> :
                    props.closeBtn
                }
                {props.children}
            </div>
        </div>
    )
}