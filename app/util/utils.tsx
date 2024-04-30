type Props = {
    alltarget?:any;
    type?:string;
}
export default function util(ob:Props) {
    let result:any = {
        firstUppercase: (target:string)=>{
            const t = ob.alltarget ? ob.alltarget : target 
            return t.charAt(0).toUpperCase()+t.slice(1)
        }
    }
        
    return result;
}