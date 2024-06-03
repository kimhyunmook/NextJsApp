'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faServer, faTrash ,faCube, faHome, faPalette, faPen } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
type myIcons = {
    className?:string;
    icon: string|IconProp;
}
export default function MyIcons (props:myIcons) {
    const icon = props.icon;
    const [fontawsomeProps,setFont] = useState<IconProp>(faHome);
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
        }
    },[])

    return (
        <FontAwesomeIcon icon={fontawsomeProps} />
    )
}