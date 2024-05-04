import Layout from "@/app/component/layoutControl"

type children = {
    children: React.ReactNode
}

export default function dbLayout(props:children) {
    return(
        <Layout all={true}>
            { props.children }
        </Layout>
    )
}