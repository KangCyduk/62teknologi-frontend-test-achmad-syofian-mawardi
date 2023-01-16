import { securityData } from "./globalHelper";

const eng = {
    lang:{
        loading:"Authentication in progress",
        inStock:"In Stock",
        soldOut:"Sold Out",
        outStock:"Stock < 5",
        footerText1:"Terms & Condition",
        footerText2:"Copyright © 2018. All rights reserved. PT Radya Gita Bahagi"
    }
}

const ind = {
    lang:{
        loading:"Autentikasi sedang berjalan",
        inStock:"In Stock",
        soldOut:"Sold Out",
        outStock:"Stock < 5",
        footerText1:"Terms & Condition",
        footerText2:"Copyright © 2018. All rights reserved. PT Radya Gita Bahagi"
    }
}

const defaultLang = securityData.Security_lang()? 
                {
                    'ENG' : eng,
                    'IND' : ind
                }[securityData.Security_lang()] || eng
            : 
            eng

export default defaultLang;