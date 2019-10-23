// Created by szatpig at 2019/8/21.
import React, { useState, useEffect } from 'react';
import { Tree, Input, Select, Button, Table } from 'antd';

import { getAllDepart, userInfoList, getRoleListByDepartList, getDpartAndChild } from './../../../api/system-api'
import  './../../../less/system/user.less'

const { TreeNode } = Tree;
const { Search } = Input;
const { Option } = Select;
const InputGroup = Input.Group;


const UserManage = () => {
    const [searchValue,setSearchValue] = useState('');
    const [expandedKeys,setExpandedKeys] = useState([]);
    const [autoExpandParent,setAutoExpandParent] = useState(true);
    const [treeData,setTreeData] = useState([]);
    const [tableData,setTableData] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];


    useEffect(() => {
        //do something
        let _data ={

        };
        getAllDepart(_data).then((data:any) => {
            console.log(JSON.stringify(data.data))
            setTreeData(data.data);
        })
    },[]);

    let aaa =[{"id":1,"parentId":0,"title":"意能通","expand":true,"children":[{"id":2,"parentId":1,"title":"产品部","expand":true,"children":[{"id":8,"parentId":2,"title":"产品一部","expand":true,"children":[],"flag":false},{"id":174,"parentId":2,"title":"产品二部","expand":true,"children":[],"flag":false}],"flag":false},{"id":3,"parentId":1,"title":"测试部","expand":true,"children":[{"id":11,"parentId":3,"title":"测试一部","expand":true,"children":[],"flag":false},{"id":176,"parentId":3,"title":"测试二部","expand":true,"children":[],"flag":false},{"id":178,"parentId":3,"title":"测试三部","expand":true,"children":[],"flag":false}],"flag":false},{"id":52,"parentId":1,"title":"技术部","expand":true,"children":[{"id":53,"parentId":52,"title":"前端组","expand":true,"children":[],"flag":false},{"id":123,"parentId":52,"title":"研发一组","expand":true,"children":[],"flag":false},{"id":175,"parentId":52,"title":"开发二组","expand":true,"children":[],"flag":false},{"id":177,"parentId":52,"title":"开发三部","expand":true,"children":[],"flag":false}],"flag":false}],"flag":true}];

    const loop = (data:any):any =>(
       data.map((item:any) => {
            if (item.children.length) {
                return (
                        <TreeNode key={ item.id } title={item.title}>
                            { loop(item.children) }
                        </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={item.title} />;
        })
    )





    const onChange = (e:any) => {
        const { value } = e.target;
        // const expandedKeys:any = dataList
        //         .map((item:any) => {
        //             if (item.title.indexOf(value) > -1) {
        //                 return item.parentId;
        //             }
        //             return null;
        //         })
        //         .filter((item:any, i:number, self:any) => item && self.indexOf(item) === i);
        setExpandedKeys(expandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true)
    };

    const handleChange = (value:any) => {
        console.log(value); // { key: "lucy", label: "Lucy (101)" }
    }

    const onExpand = (expandedKeys:any) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false)
    };

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
                    treeData.length ? (
                        <Tree
                            onExpand={ onExpand }
                            expandedKeys={ expandedKeys }
                            autoExpandParent>
                            { loop(aaa) }
                        </Tree>
                    ) : 'loading'
                }
            </div>
            <div className="user-wrapper-right">
                <div className="search-container">
                    <div className="input-cells">
                        <Select
                                labelInValue
                                defaultValue={{ key: '' }}
                                style={{ width: 120 }}
                                onChange={ handleChange }
                        >
                            <Option value="">全部角色</Option>
                            <Option value="1">管理员</Option>
                        </Select>
                        <Select
                                labelInValue
                                defaultValue={{ key: '' }}
                                style={{ width: 120 }}
                                onChange={ handleChange }
                        >
                            <Option value="">全部</Option>
                            <Option value="1">正常</Option>
                            <Option value="0">禁用</Option>
                        </Select>
                    </div>
                    <div className="input-cells">
                        <InputGroup compact>
                            <Select defaultValue="account">
                                <Option value="account">账号</Option>
                                <Option value="name">姓名</Option>
                                <Option value="mobile">手机号</Option>
                            </Select>
                            <Input style={{ width: 180 }} placeholder="账号/姓名/手机号" />
                        </InputGroup>
                        <Button type="primary">重置密码</Button>
                    </div>
                </div>
                <div className="table-container">
                    <Table bordered rowSelection={ rowSelection } columns={ columns } dataSource={ tableData } />
                </div>
                <div className="page-container"></div>
            </div>
        </div>
    );
}

export default UserManage
