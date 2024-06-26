'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faServer, faTrash ,faCube, faHome, faPalette, faPen, faWrench, 
    faUserPlus, faRightToBracket, faRightFromBracket, faUser,faArrowRightToBracket, faArrowRightFromBracket , faHammer, 
    faExclamation,
    faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import Tooltip from '../tooltip';
type myIcons = {
    className?:string;
    icon: string|IconProp;
    tooltip?:string|any;
}
export default function MyIcons (props:myIcons) {
    const icon = props.icon;
    const [fontawesomeProps,setFont] = useState<IconProp>(faHome);
    useEffect(()=>{
        if (typeof icon ==='string')    
        switch (icon) {
            case 'home' :setFont(faHome);
                break;
            case 'database' :setFont(faDatabase);
                break;
            case 'server' :setFont(faServer);
                break;
            case 'trash' :setFont(faTrash);
                break;
            case 'cube' :setFont(faCube);
                break;
            case 'palette' :setFont(faPalette);
                break;
            case 'pen' : setFont(faPen)
                break;
            case 'wrench' :setFont(faWrench);
                break;
            case 'user-plus' :setFont(faUserPlus);
                break;
            case 'login' :setFont(faArrowRightToBracket);
                break;
            case 'logout': setFont(faArrowRightFromBracket);
                break;
            case 'user' :setFont(faUser);
                break;
            case 'fix' : setFont(faHammer);
                break;
            case 'exclamation' :setFont(faExclamationCircle);
                break;
        }
    },[])

    return (
        <b className={!!props.tooltip ?`myIcon`:''}>
            <FontAwesomeIcon className={`${props.className}`} icon={fontawesomeProps} />
            {
                !!props.tooltip ?
                    <Tooltip text={props.tooltip}></Tooltip>
                    :null
            }
        </b>
    )
}