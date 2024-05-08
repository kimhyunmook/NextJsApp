import Loading from "@/app/loadingg";
type Props = {
    children:any;
}
export default function MongoDBRootLayout (props:Props) {
    return(
        <Loading loading={null} default={500}>
            {props.children}
        </Loading>
    )
}