
export const flex_center:string = ` flex justify-center items-center `;
export const absolute_center:string = ` absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] `
export const absolute_y_center = `absolute top-1/2 translate-y-[-50%]`
export const absolute_x_center = `absolute left-1/2 translate-x-[-50%]`
export const mobile_box:string = ` max-w-[400px] m-auto`;
export const disable_button:string= `bg-zinc-200 text-black`;
export const able_button:string = `bg-blue-500 text-white`;
export const onepage:string = `pt-40 pb-40`

const style = {
    title_sm:'text-3xl font-bold mb-5 w-full',
    formDefault: `pt-4 m-auto max-w-[600px]`,
    disable_color:'bg-zinc-400 text-gray-600 border-3 border-gray-500',
    absolute_center:(t?:number)=>{
        if(!!t) {
            let init = `absolute top-1/2 left-1/2 translate-x-[-50%] `;
            switch(t) {
                case 1: return init+'translate-y-[-60%]'; 
                case 2: return init+'translate-y-[-70%]';
                case 3: return init+'translate-y-[-80%]';
                case 4: return init+'translate-y-[-150%]';
                case 5: return init+'translate-y-[-250%]';
                default: return absolute_center;
            }
        }
        else
        return absolute_center;
    },
    green_bg: 'bg-green-700',
    green_border:'border-green-700',
}
export const title:string = ` text-4xl font-black mb-6 p-2 border-b-4 ${style.green_border} `;

export default style