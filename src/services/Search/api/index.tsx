import axiosInstance,{baseUrl} from "../../config/axiosInstance";

export const searchForBooks = async (searchTerm:string) => {
    const response = await axiosInstance.get(`${baseUrl}volumes?q="${searchTerm||'random'}"&key=${process.env.REACT_APP_BOOKS_API_KEY}&maxResults=40`);
    return response.data;
    }