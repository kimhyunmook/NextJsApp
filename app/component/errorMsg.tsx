export default function ErrorMsg ({text}:{text:string}) {
    return (
        <h3 className="absolute top-full left-0 mt-1 text-sm text-red-400">
            { text } 
        </h3>
    )
}