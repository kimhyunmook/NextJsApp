import Layout from "@/app/component/layoutControl";

export default function AdminLayout ({children}:{
    children:React.ReactElement
}) {
    return(
        <Layout all={true}>
            { children }
        </Layout>
    )
}