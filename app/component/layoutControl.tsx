import Container from "./container";
import Header from "./header";
import Nav from "./nav";

type layout= {
    children:React.ReactNode;
    header?:boolean;
    headerLogo?:string;
    footer?:boolean;
    nav?:boolean;
    all?:boolean;
}
export default function Layout(props:layout) {
    return (
        <div className="layoutControl">
            {
                props.header || props.all ?
                <Header logo={ !!props.headerLogo ? props.headerLogo : null } /> :null
            }
            <Container >
                {
                    props.nav || props.all ?
                    <Nav /> :null
                }
                <div className="contentView relative">
                    { props.children }
                </div>
            </Container>
        </div>
    )
}