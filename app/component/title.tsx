import { title } from "../util/style";

export default function Title ({text}:{text:string}) {
    return(
        // <div className="flex flex-wrap">
            <h2 className={title}>
                { text } 
            </h2>
        // </div>
    )
}