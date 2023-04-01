import axios from "axios";

const instance  = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "af05d56d-4fd6-4811-99c5-7a261bfa3868"
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return  instance.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    }
}

