// Created by szatpig at 2019/8/21.

import { lazy } from 'react'

const Dashboard  = lazy(() => import('./dashboard'));

const SceneList  = lazy(() => import('./scene/sceneList'));
const CustomerList  = lazy(() => import('./scene/customerList'));

const AuthorityManage  = lazy(() => import('./system/authorityManage'));
const DepartManage  = lazy(() => import('./system/departManage'));
const RoleManage  = lazy(() => import('./system/roleManage'));
const UserManage  = lazy(() => import('./system/userManage'));

const NoMatch = lazy(() => import('./../error/404'));


export default [
    {
        path:'/dashboard',
        component:Dashboard
    },
    {
        path:'/scene/sceneList',
        component:SceneList
    },{
        path:'/scene/customerList',
        component:CustomerList
    },
    {
        path:'/system/authority',
        component:AuthorityManage
    },{
        path:'/system/depart',
        component:DepartManage
    },{
        path:'/system/role',
        component:RoleManage
    },{
        path:'/system/user',
        component:UserManage
    },
    {
        path:null,
        component:NoMatch
    }
]
