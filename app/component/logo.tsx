import Link from "next/link";
type logo ={
    className:string
    text?:string|null;
}
export default function Logo(props:logo) {
    return(
        <Link href={!!props.text ? '/':'/admin'} className={"text-4xl font-base block "+props.className}>
            {
                !!props.text ? props.text :'ADMIN'
            }
        </Link>
    )
}