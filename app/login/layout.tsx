import { flex_center } from "../util/style";

interface Props {
    children:React.ReactNode;
}
export default function LoginLayout (props:Props) {
    return(
        <div className="h-screen flex">
            { props.children }
            <div className={"img-box w-full h-screen bg-green-100 bg-center bg-no-repeat bg-cover" + flex_center}>
                <img src="/img/adminLogo.png" className="max-w-[200px]" alt="" />
            </div>
        </div>
    )
}