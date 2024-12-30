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

export const util = {
    isAuthenticated
}