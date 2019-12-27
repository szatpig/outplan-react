// Created by szatpig at 2019/8/21.
import React, { useState, useEffect, useReducer, forwardRef } from 'react';
import { connect } from 'react-redux'
import { Tree, Input, Select, Button, Table, Form, Modal, message, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import { systemUserRequestAction } from './../../../store/actions/system'

import UserSearchComponent from './components/UserSearchComponent'
import UserModal from './components/userModal'

import searchTree from './../../../utils/treeNode'
import { getAllDepart, userInfoList, getRoleListByDepartList, getDpartAndChild, getRandomPwd, addUser, updateUser, deleteUser, updateUserStatus } from './../../../api/system-api'
import  './../../../less/system/user.less'

const { TreeNode } = Tree;
const { Search } = Input;

interface userManageProps extends FormComponentProps {
    tableData:any,
    systemUserRequestAction?: any;
}
const UserManage = (props:userManageProps) => {
    const [searchValue,setSearchValue] = useState('');
    const [expandedKeys,setExpandedKeys] = useState(['1']);
    const [autoExpandParent,setAutoExpandParent] = useState(true);
    const [treeData,setTreeData] = useState([]);
    const [treeNodeList,setTreeNodeList] = useState([]);
    const [roleList,setRoleList] = useState([]);
    const [search, setSearch] = useState({
        keywords:'',
        department:'',
        state:0,
        role:0,
        departId:1,
        pageNum:1,
        total:0,
        pageSize:10
    });
    const [show,setShow] = useState(false);
    const [isEdit,setIsEdit] = useState(0);
    const [userInfo,setUserInfo] = useState({
        userId:'',
        email:'',
        password: '',
        userName:'',
        realName:'',
        mobile:'',
        departId:'',
        roleIds:[]
    })

    const handleOff = (args:any) =>{
        let { id,state,userName } = args;
        Modal.confirm({
            title:'提示',
            content:`是否确认${ state == 1 ? '禁用':'启用'}【${ userName }】账号？`,
            centered:true,
            onOk:()=>{

                updateUserStatus({
                    id,
                    status: state == 1 ? 2 : 1
                }).then( data => {
                    systemUserRequestAction(search)
                    message.success(`${ state == 1 ? '禁用':'启用'}成功`)
                }).catch(()=>{

                });
            },
            onCancel:()=>{

            }
        })
    }
    const handleEdit = (args:any) =>{
        setIsEdit(1)
        setShow(true)
        setUserInfo({
            ...userInfo,
            ...args,
            roleIds:args.roleId,
            userId:args.id
        })
    }
    const handleDelete = (args:any) =>{
        let { id,userName } = args;
        Modal.confirm({
            title:'提示',
            content:`是否确认删除【${ userName }】账号？`,
            centered:true,
            onOk:()=>{
                deleteUser({ userId:id }).then( data => {
                    systemUserRequestAction(search)
                    message.success(`删除成功`);
                }).catch(()=>{

                })
            },
            onCancel:()=>{

            }
        })
    }

    const columns = [
        {
            title: '账号',
            dataIndex: 'userName'
        },
        {
            title: '姓名',
            dataIndex: 'realName',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
        },
        {
            title: '部门',
            dataIndex: 'departName'
        },
        {
            title: '角色',
            dataIndex: 'roleName',
        },
        {
            title: '状态',
            key:'state',
            render: (text:string,params:any) => (
                <span>
                    {
                        params.state == 1 ? <Icon type="check-circle" style={{color: '#19be6b'}} theme="filled" />:<Icon type="minus-circle" style={ {color: '#f00'} } theme="filled" />
                    }
                    <i>{ params.state == 1 ? ' 启用':' 禁用' }</i>
                </span>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (text:string,params:any) => (
                <span className="tableActionCell">
                    <i onClick={ () => handleOff(params) }>{ params.state == 1 ? '禁用':'启用' }</i>
                    <i onClick={ () => handleEdit(params) }>编辑</i>
                    <i onClick={ () => handleDelete(params) }>删除</i>
                </span>
            )
        }
    ];

    const { tableData,systemUserRequestAction } = props;
    const loopTree = (data:any) =>{
       return data.map((item:any)=>{
            item.value = item.id
            if(item.children.length){
                loopTree(item.children)
            }
            return item
        })
    }

    useEffect(() => {
        //do something
        let _data ={

        };
        getAllDepart(_data).then((data:any) => {
            let _data:any = loopTree(JSON.parse(JSON.stringify(data.data)));
            setTreeData(_data);
            setTreeNodeList(data.data)
        })
        systemUserRequestAction(search)
    },[]);

    useEffect(() => {
        //do something
        let _data ={
            departId: 1
        };
        getRoleListByDepartList(_data).then((data:any) => {
            setRoleList(data.data)
        })
    },[]);


    //分页操作
    const changePage = (pageNum:any,pageSize:any) =>{
        let _search = {
            ...search,
            pageNum,
            pageSize
        }
        setSearch(_search)
        systemUserRequestAction(_search)
    }
    const changePageSize = (pageNum:any,pageSize:any) =>{
        console.log(pageNum,pageSize)
        let _search = {
            ...search,
            pageNum,
            pageSize
        }
        setSearch(_search)
        systemUserRequestAction(_search)
    }
    const paginationProps = {
        current:tableData.pageNum,
        pageSize:tableData.pageSize,
        total:tableData.total,
        size:'middle',
        showQuickJumper:true,
        showSizeChanger:true,
        onChange:changePage,
        onShowSizeChange:changePageSize
    }

    const searchSubmit = (e:any)=>{
        console.log(e);
        let _search = {
            ...search,
            ...e
        }
        setSearch(_search)
        console.log(search)
        systemUserRequestAction(_search)
    }

    const handleUserSubmit = (arg:any) => {
        console.log(11,{...userInfo,...arg})
        let args = { ...userInfo,...arg }
        let { userId, email , realName, mobile, departId, password, roleIds } = args
        if(isEdit){
            let _data = {
                userId,
                email,
                userName:email,
                realName,
                mobile,
                departId,
                roleIds:args.roleId
            }
            updateUser(_data).then(data => {
                setShow(false);
                message.success('用户修改成功');
                systemUserRequestAction(search)

            })
        }else{
            let _data = {
                userId,
                email,
                password,
                userName:email,
                realName,
                mobile,
                departId,
                roleIds
            }
            addUser(_data).then(data => {
                setShow(false);
                message.success('用户添加成功');
                systemUserRequestAction(search)
            })
        }
    }
    const handleShowModal = (type:number,flag:boolean) =>{
        if(flag){

            getRandomPwd({}).then((data:any) =>{
                setUserInfo({
                    userId:'',
                    email:'',
                    password: data.data,
                    userName:'',
                    realName:'',
                    mobile:'',
                    departId:search.departId.toString(),
                    roleIds:[]
                })
            })
        }
        setIsEdit(type)
        setShow(flag)
    }

    const onChange = (e:any) => {
        const { value } = e.target
        const temp = searchTree(value,treeData)
        setTreeNodeList(temp)
        let _expandArr:any = temp[0]&&temp[0].children
                .map((item:any) => {
                    return item.id.toString()
                });
        _expandArr = _expandArr && _expandArr.concat(['1']) || _expandArr;

        setExpandedKeys(_expandArr);
        setSearchValue(value);
        setAutoExpandParent(true)
    };

    const handleTreeSelect = (value:any,e:any) => {
        if(!e.selected) return false;
        let _search = {
            ...search,
            departId:value[0]
        }
        setSearch(_search)
        console.log(search)
        systemUserRequestAction(_search)
    }

    const onExpand = (expandedKeys:any) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false)
    };

    const loop = (data:any):any =>(
            data.map((item:any) => {
                if (item.children.length) {
                    return (
                            <TreeNode key={ item.id } title={item.title}>
                                { loop(item.children) }
                            </TreeNode>
                    );
                }
                return <TreeNode key={ item.id } title={ item.title } />;
            })
    )

    const rowSelection = {
        onChange: (selectedRowKeys:any, selectedRows:any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record:any) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div className="user-manage-container wrapper-container">
            <div className="user-wrapper-left">
                <Search style={{ marginBottom: 8 }} placeholder="部门名称" onChange={ onChange } />
                {
                    treeNodeList.length ? (
                        <Tree
                            onExpand={ onExpand }
                            expandedKeys={ expandedKeys }
                            defaultExpandParent = { true } onSelect={ handleTreeSelect }>
                            { loop(treeNodeList) }
                        </Tree>
                    ) : 'loading...'
                }
            </div>
            <div className="user-wrapper-right">
                <UserSearchComponent
                        roleList={ roleList }
                        searchSubmit={ searchSubmit } handleShow={ handleShowModal } />
                <div className="table-container">
                    <Table size="middle"
                           bordered
                           rowSelection={ rowSelection }
                           rowKey="id"
                           columns={ columns }
                           pagination = { paginationProps }
                           dataSource={ tableData.list } />
                </div>
                <div className="page-container"></div>
            </div>
            <UserModal
                    isEdit={ isEdit }
                    show={ show }
                    userInfo={ userInfo }
                    treeData={ treeData }
                    handleShow ={ handleShowModal }
                    handleSubmit={ handleUserSubmit } />
        </div>
    );
}


const mapStateToProps = (state:any) => ({
    tableData:state.system.tableData
})

const mapDispatchToProps = {
    systemUserRequestAction
}

export default connect(mapStateToProps,mapDispatchToProps)(UserManage)
