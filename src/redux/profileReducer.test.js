import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";
import {nanoid} from "nanoid";

let state = {
    posts: [
        { id: nanoid(), message: "Hi, how are you?", likesCount: 5 },
        { id: nanoid(), message: "It`s my first post", likesCount: 27 },
    ]
};

test('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('Hello guys')
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(3);
    expect(newState.posts[3].message).toBe('Hello guys')
});

test('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator('Hello guys')
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts[3].message).toBe('Hello guys')
});

test('after deleting, length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1)
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(1)
});

test('after deleting, length shouldn`t be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost(109)
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(2)
});

