import axios from "axios";
// import { graphConfig } from "../config/msalConfig";
// import { callMsGraph } from "../config/MSUtils";
import { env } from "./globalHelper";

const getUserInfo = () =>{
    return JSON.parse(localStorage.getItem("userinfo"));
}

const postData = async (subUrl,param)=>{
    try {
        const response = await axios.post(env.apiBaseUri + subUrl, param)
        return response
    } catch (error) {
        errorData(error)
    }
}

const getData = async (suburl,getPhotoss=null, options=null)=>{
    try {
        const url = getPhotoss==null? env.apiBaseUri + suburl : suburl
        const response = await axios.get(url,options);
        return response;
    } catch (error) {
        errorData(error)
    }
}

const errorData = (error)=>{
    if(error){
        if(error.response){
            switch (error.response.status) {
                case 401:
                    // let responseApiRefresh = await this.postDataRefresh("awbrefreshToken");
                    // if(responseApiRefresh.status===200){
                    //     localStorage.setItem("token_from_backend", responseApiRefresh.data.newToken);
                    //     return await this.postData(suburl,param);
                    // }else{
                        return error.response
                    // }
                case 400:
                    alert("SESSION EXPIRED, CLICK OK TO RELOGIN");
                    // const response = await this.logOut();
                    // if(response.status===200){
                    //     authContext.login();
                    // }
                    return error.response
                case 403:
                    alert("YOU DONT HAVE PERMISSION TO SEE THIS PAGE, CLICK OK TO REDIRECT");
                    // window.location.href = routeAll.routesComponent.accessDenied.path
                    return error.response
                case 500:
                    alert("API NO RESPONSE, CLICK OK TO RELOAD");
                    const getUrl = window.location.href;
                    if(getUrl.includes("dev")||getUrl.includes("qas")||getUrl.includes("localhost")){
                        console.log("error api")
                    }else{
                        window.location.href = getUrl;
                    }
                    return error.response
                default:
                    return error.response
            }
        }else{
            return console.log(error)
        }
    }
}


export {
    getUserInfo,
    getData,
    postData,
    errorData
};