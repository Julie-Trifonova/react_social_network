import {GetItemsType, instance, APIResponseType} from "./api.ts";
import {profileAPI} from "./profileAPI";

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get<GetItemsType>(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`,
            {}).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>
    },
    // getProfile(userId: number) {
    //     console.warn('Obsolete method. Please profile API object')
    //     return profileAPI.getProfile(userId)
    // }
}