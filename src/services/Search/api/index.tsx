import axiosInstance,{baseUrl} from "../../config/axiosInstance";

export const searchForBooks = async ({searchTerm,startIndex,maxResults}:any) => {
    console.log(searchTerm,startIndex,maxResults,'payload')
    const response = await axiosInstance.get(`${baseUrl}volumes?q="${searchTerm||'random'}"&key=${process.env.REACT_APP_BOOKS_API_KEY}&maxResults=${maxResults}&startIndex=${startIndex}`);
    return response.data;
    }