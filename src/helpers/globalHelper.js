import { getUserInfo } from './apiHelper';

class securityData{
    static Security_lang(){
        const dataUser = getUserInfo();
        if(dataUser===null){
            return false
        }else{
            return dataUser.lang
        }
    }

    static Security_adminLevel(){
        const dataUser = getUserInfo();
        if(dataUser===null){
            return 1
        }else{
            return dataUser.role || 0
        }
    }

    static Security_getUser(){
        const dataUser = getUserInfo();
        if(dataUser===null){
            return {}
        }else{
            return dataUser
        }
    }
}

const env = {
    apiBaseUri : process.env.REACT_APP_API_BASE_URL,
}


export {securityData, env};