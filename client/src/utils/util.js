import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function isAuthenticated() {
    const token = Cookies.get('authToken');
    if(!token) {
        return false;
    }
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        console.warn("Token not valid ", error);
        return false;
    }
}

function getBackendUrl(){
    if(window.location.origin.includes('localhost')){
        return "http://localhost:8080/api";
    } else return "/api";
}

export const util = {
    isAuthenticated,
    getBackendUrl
}