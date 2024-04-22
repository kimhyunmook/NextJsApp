export default function aboutDetails (props:any) {
    console.log(props)
    return (
        <div>
            어바웃 디테일즈 {props.params.aboutid} / {props.searchParams.country}
        </div>
    )
}