import Container from "./container";
import Header from "./header";
import Nav from "./nav";

type layout= {
    children:React.ReactNode;
    header?:boolean|null;
    footer?:boolean|null;
    nav?:boolean|null;
    all?:boolean|null;
}
export default function Layout(props:layout) {
    return (
        <div className="layoutControl">
            {
                props.header || props.all ?
                <Header /> :null
            }
            <Container >
                {
                    props.nav || props.all ?
                    <Nav /> :null
                }
                <div className="contentView">
                    { props.children }
                </div>
            </Container>
        </div>
    )
}