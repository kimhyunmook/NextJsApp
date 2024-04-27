interface Props {
    className?:string;
    children?:any;
    onClick?:any;
  }

function Btn (props:Props):React.ReactElement{
    let defaultClassName :string = 'block rounded-sm p-2 pl-4 pr-4 bg-blue-400 text-white text-basic w-full h-full';
    return (
        <button className={defaultClassName+ ' '+ props.className} onClick={props.onClick}>
            {!!props.children ? props.children :'Click'}
        </button>
    )
}
export default Btn