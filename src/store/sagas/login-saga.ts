// Created by szatpig at 2019/9/5.
import { take, fork, race, call, cancel, put ,delay } from 'redux-saga/effects';

import { userLogin,getRoleMenu } from './../../api/login-api'

function* loginAsync(payload:any) {
    try {
        const { data } =  yield call(userLogin,payload);
        yield put({ type: 'USER_LOGIN', payload:data })
        const { menuList } = yield call(getRoleMenu,{})
        yield put({ type: 'USER_MENU_LIST', payload:menuList })
    }catch (e) {
        yield put({ type: 'FETCH_ERROR', e })
    }
}

export function* loginFlow() {

    while (true){
        const { payload } = yield take('LOGIN_REQUEST')
        console.log( payload )
        const data = yield call(loginAsync,payload);
    }

}

