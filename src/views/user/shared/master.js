import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { securityData } from '../../../helpers/globalHelper';
import routeAll from '../../../helpers/route';
import Footer from "./footer";
import Header from "./header";

export default function LayoutUser(props){
    const history = useNavigate()
    useEffect(()=>{
        if(props.children.props.adminLevel > securityData.Security_adminLevel()){
            history(routeAll.component.accessDenied.path)
        }
    },[])

    return(
        <div>
            <Header {...props}/>
                <main>{props.children}</main>
            <Footer/>
        </div>
    )
}