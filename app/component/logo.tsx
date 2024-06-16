import Link from "next/link";
type logo ={
    className:string
    text?:string|null;
}
export default function Logo(props:logo) {
    return(
        <Link href={!!props.text ? '/':'/admin'} className={"h-full text-2xl font-base block "+props.className}>
            {
                !!props.text ? props.text : 
                <div className="flex items-center h-full">
                    <img className="mr-2 ml-2 max-w-[35px]" src="/img/adminLogo.png" alt="adminLogo" /> 
                    ADMIN
                </div>
            }
        </Link>
    )
}