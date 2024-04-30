interface Props {
    children:React.ReactNode;
}
export default function LoginLayout (props:Props) {
    return(
        <div className="h-screen flex">
            {props.children}
            <div className="img-box w-full h-screen bg-[url('/img/loginbg.jpg')] bg-center bg-no-repeat bg-cover">
            </div>
        </div>
    )
}