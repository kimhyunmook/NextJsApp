export default function ErrorMsg ({text,className}:{text:string,className?:string}) {
    return (
        <h3 className={`absolute top-full left-0 mt-1 text-sm text-red-400 ${className}`}>
            { text } 
        </h3>
    )
}