// Created by szatpig at 2019/9/5.
import { take, fork, race, call, cancel, put ,delay } from 'redux-saga/effects';

import { userLogin,getRoleMenu } from './../../api/login-api'

function* loginAsync(payload:any) {
    try {
        let { data } =  yield call(userLogin,payload);
        sessionStorage.setItem('USER_TOKEN', data.token);
        yield put({ type: 'USER_LOGIN', payload:data })
        let menuList = yield call(getRoleMenu,{})
        sessionStorage.setItem('USER_MENU_LIST',JSON.stringify(menuList.data || []));
        yield put({ type: 'USER_MENU_LIST', payload:menuList.data })
    }catch (e) {
        yield put({ type: 'FETCH_ERROR', e })
    }
}

export function* loginFlow() {

    while (true){
        const { payload } = yield take('LOGIN_REQUEST')
        const data = yield call(loginAsync,payload);
    }

}

