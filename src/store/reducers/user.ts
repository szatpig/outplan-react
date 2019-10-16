// Created by szatpig at 2019/8/19.

import {
    USER_LOGINOUT,
    USER_MENU_LIST,
    USER_LOGIN
} from './../actionTypes'

const initState:State = {
    token:sessionStorage.getItem('USER_TOKEN') || null,
    menuList: sessionStorage.getItem('USER_MENU_LIST') && JSON.parse(sessionStorage.getItem('USER_MENU_LIST') || '') || []
};

let userReducer = (state:State = initState,action:any):any => {
    switch (action.type) {
        case USER_LOGINOUT:
            return initState;
            break;
        case USER_LOGIN:
            return Object.assign({},state,action.payload);
            break;
        case USER_MENU_LIST:
            return Object.assign({},state,{ menuList:action.payload });
            break;
        default:
            return state
    }
};

interface State {
    token:any,
    menuList:[]
}

export default userReducer

