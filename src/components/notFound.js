import React from 'react';

export default function NotFound(props){

    return(
        <div className="not-found pt-5">
            <div className="panel panel-default animated bounceIn pt-5" id="login-form" 
            style={{maxWidth: "300px", margin:"0 auto 20px", textAlign:"left"}}
            
            >
      
              <div className="panel-body">
                   <p style={{fontSize:"30px",textAlign:"center"}}>{props.pageName}</p>
              </div>
      
            </div>
            <br />
            <div className="text text-center powered">Powered by <a href="https://www.google.co.id" target="_blank" rel="noreferrer">syofian</a></div>
        </div>
    )
}