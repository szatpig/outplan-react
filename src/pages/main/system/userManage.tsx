// Created by szatpig at 2019/8/21.
import React, { useState, useEffect, useReducer, forwardRef } from 'react';
import { connect } from 'react-redux'
import { Tree, Input, Select, Button, Table, Form, Modal, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import { systemUserRequestAction } from './../../../store/actions/system'

import UserSearchComponent from './components/UserSearchComponent'

import searchTree from './../../../utils/treeNode'
import { getAllDepart, userInfoList, getRoleListByDepartList, getDpartAndChild } from './../../../api/system-api'
import  './../../../less/system/user.less'
import EnhancedUserSearchComponent from "./components/UserSearchComponent";

const { TreeNode } = Tree;
const { Search } = Input;
const { Option } = Select;

interface modalProps extends FormComponentProps{
    isEdit:boolean
}

const ModalContent = (props:modalProps)=>{
    const [show,setShow] = useState(false);
    const { getFieldDecorator } = props.form
    const showModal = () => {
        setShow(true);
    };
    const handleOk = (e:any) => {
        console.log(e);
        setShow(false);
    };
    const handleCancel = (e:any) => {
        console.log(e);
        setShow(false);
    };
    const { isEdit } = props
    return(
        <Modal
            title={ isEdit ? '编辑用户': '新增用户' }
            visible={ show }
            onOk={ handleOk }
            onCancel={ handleCancel }
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
        >
            <Form>
                <Form.Item label="邮箱">
                    { getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '请输入合法的邮箱地址',
                            },
                            {
                                required: true,
                                message: '请输入邮箱地址',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                        label="姓名"
                >
                    { getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入姓名', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                        label="手机号"
                >
                    { getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入姓名', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                        label="部门"
                >
                    { getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请选择部门', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                        label="角色"
                >
                    { getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请选择角色', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

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
    const [searchForm,setSearchForm] = useState('');
    const [search, setSearch] = useState({
        keywords:'',
        department:'',
        state:0,
        role:0,
        departId:'1',
        pageNum:1,
        total:0,
        pageSize:10
    });

    const handleOff = (args:any) =>{
        Modal.confirm({
            title:'提示',
            content:`是否确认${ args.state == 1 ? '禁用':'启用'}【${ args.userName }】账号？`,
            centered:true,
            onOk:()=>{
                message.success(`${ args.state == 1 ? '禁用':'启用'}成功`)
            },
            onCancel:()=>{

            }
        })
    }
    const handleEdit = (args:any) =>{

    }
    const handleDelete = (args:any) =>{

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
            dataIndex: 'state',
        },
        {
            title: '操作',
            key: 'action',
            render: (text:string,params:any) => (
                <span className="tableActionCell">
                    <i onClick={ () => handleOff(params) }>禁用</i>
                    <i onClick={ () => handleEdit(params) }>编辑</i>
                    <i onClick={ () => handleDelete(params) }>删除</i>
                </span>
            ),
        },
    ];

    const { tableData,systemUserRequestAction } = props;

    useEffect(() => {
        //do something
        let _data ={

        };
        getAllDepart(_data).then((data:any) => {
            setTreeData(data.data);
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
                        searchSubmit={ searchSubmit } />
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
