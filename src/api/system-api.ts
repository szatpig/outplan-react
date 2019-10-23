// Created by szatpig at 2019/10/21.
import fetch from './../utils/fetch'
import site from './../utils/config'

export const getAllDepart= (params:any) => fetch(site.base + '/depart/getAllDepart' ,{
    type: 'get',
    params
});

export const userInfoList= (data:any) => fetch(site.base + '/userinfo/queryUserInfoList' ,{
    type: 'post',
    data
});

export const getRoleListByDepartList= (data:any) => fetch(site.base + '/role/getRoleListByDepartList' ,{
    type: 'post',
    data
});

export const getDpartAndChild= (params:any) => fetch(site.base + '/userinfo/getDpartAndChild' ,{
    type: 'get',
    params
});