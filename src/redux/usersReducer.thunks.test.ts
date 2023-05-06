import {actions, follow} from "./usersReducer";
import {usersAPI} from "../components/api/usersAPI";
import {APIResponseType, ResultCodeEnum} from "../components/api/api";

jest.mock('../components/api/usersAPI')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {},
}

//@ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()

    //@ts-ignore
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))


})