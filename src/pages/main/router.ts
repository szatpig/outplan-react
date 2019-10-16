// Created by szatpig at 2019/8/21.

import { lazy } from 'react'

const SceneList  = lazy(() => import('./scene/sceneList'));
const CustomerList  = lazy(() => import('./scene/customerList'));
const InteractiveManage  = lazy(() => import('./interactive/interactiveManage'));


const AuthorityManage  = lazy(() => import('./system/authorityManage'));
const DepartManage  = lazy(() => import('./system/departManage'));
const RoleManage  = lazy(() => import('./system/roleManage'));
const UserManage  = lazy(() => import('./system/userManage'));

const NoMatch = lazy(() => import('./../error/404'));

interface routes {
    path:string;
    component:any;
    meta:{
        collapsed:boolean;
        title:any;
        [propName: string]: any;
    }
}

export default [
    {
        path:'/sceneManager/sceneList',
        component:SceneList,
        meta:{
            collapsed:true,
            title:{
                mainMenu:'话术配置',
                secondMenu:'场景配置'
            }
        }
    },{
        path:'/sceneManager/customerList',
        component:CustomerList,
        meta:{
            collapsed:true,
            title:{
                mainMenu:'话术配置',
                secondMenu:'场景配置'
            }
        }
    },
    {
        path:'/interactiveManage',
        component:InteractiveManage,
        meta:{
            collapsed:false,
            title:{
                mainMenu:'通话管理'
            }
        }
    },{
        path:'/interactiveManage/add',
        component:InteractiveManage,
        meta:{
            collapsed:false,
            title:{
                mainMenu:'通话管理',
                secondMenu:'添加'
            }
        }
    },{
        path:'/interactiveManage/add/info',
        component:InteractiveManage,
        meta:{
            collapsed:false,
            title:{
                mainMenu:'通话管理',
                secondMenu:'添加',
                thirdMenu:'信息'
            }
        }
    },
    {
        path:'/system/menuAuthority',
        component:AuthorityManage,
        meta:{
            collapsed:true,
            title:{
                mainMenu:'系统设置',
                secondMenu:'权限设置'
            }
        }
    },{
        path:'/system/departManage',
        component:DepartManage,
        meta:{
            collapsed:true,
            title:{
                mainMenu:'系统设置',
                secondMenu:'部门设置'
            }
        }
    },{
        path:'/system/RoleManage',
        component:RoleManage,
        meta:{
            collapsed:true,
            title:{
                mainMenu:'系统设置',
                secondMenu:'角色设置'
            }
        }
    },{
        path:'/system/user',
        component:UserManage,
        meta:{
            collapsed:true,
            title:{
                mainMenu:'系统设置',
                secondMenu:'用户设置'
            }
        }
    },{
        path:'/system/departManage/add/info',
        component:NoMatch,
        meta:{
            collapsed:true,
            title:{
                mainMenu:'系统设置',
                secondMenu:'用户设置',
                thirdMenu:'编辑',
                fourMenu:'信息'
            }
        }
    },
    {
        path:null,
        component:NoMatch
    }
]
