import axios from "axios";

const fetchData = async (url)=>{
    const apiKey = process.env.REACT_APP_API_KEY;
    const queryURL = `${process.env.REACT_APP_API_BASE_URL}${url}`;
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
        const response =  await axios.get(`${queryURL}`, config);
        return response
    } catch (error) {
       return console.log(error);
    }
}

export{fetchData}