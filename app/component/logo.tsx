import Link from "next/link";
type logo ={
    className:string
}
export default function Logo(props:logo) {
    return(
        <Link href="/" className={"text-4xl font-base block "+props.className}>
            ADMIN
        </Link>
    )
}