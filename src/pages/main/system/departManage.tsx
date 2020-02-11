// Created by szatpig at 2019/8/21.
import React, {useState, useEffect, Component} from 'react';
import { connect } from 'react-redux'
import {Tree, Input, Empty, message, Modal} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { systemUserRequestAction } from './../../../store/actions/system'
import searchTree from "../../../utils/treeNode";
import { addDepart, updateDepart, deleteDepart, getAllDepart} from "../../../api/system-api";

import './../../../less/system/depart.less'

const { TreeNode } = Tree;
const { Search } = Input;

function DepartManage(props:UserFormProps) {
    const [expandedKeys,setExpandedKeys] = useState(['1']);
    const [autoExpandParent,setAutoExpandParent] = useState(true);
    const [treeData,setTreeData] = useState([]);
    const [treeNodeList,setTreeNodeList] = useState([]);

    const handleDelete = (args:any) => {
        console.log(args);
        let { id,title } = args;
        Modal.confirm({
            title:'提示',
            content:`是否确认删除【${ title }】部门？`,
            centered:true,
            onOk:()=>{
                deleteDepart({ departId:id }).then( data => {
                    message.success(`部门删除成功`);
                }).catch(()=>{

                })
            },
            onCancel:()=>{

            }
        })
    }

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
    },[]);

    const onChange = (value:any) => {
        const temp = searchTree(value,treeData)
        setTreeNodeList(temp)
        let _expandArr:any = temp[0]&&temp[0].children
                .map((item:any) => {
                    return item.id.toString()
                });
        _expandArr = _expandArr && _expandArr.concat(['1']) || _expandArr;

        setExpandedKeys(_expandArr);
        setAutoExpandParent(true)
    };
    const handleTreeSelect = (value:any,e:any) => {
        if(!e.selected) return false;
    }
    const onExpand = (expandedKeys:any) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false)
    };
    const renderAction = (item:any) => {
        return (
                <div className="title-wrapper">
                    {
                        item.title
                    }
                    <div className="action-wrapper">
                        <i>添加</i>
                        <i>编辑</i>
                        <i onClick={ ()=>handleDelete(item) }>删除</i>
                    </div>
                </div>
        )
    }
    const loop = (data:any):any =>(
            data.map((item:any) => {
                if (item.children.length) {
                    return (
                            <TreeNode key={ item.id } title={ renderAction( item )}>
                                { loop(item.children) }
                            </TreeNode>
                    );
                }
                return <TreeNode key={ item.id } title={ renderAction(item) } />;
            })
    )
    return (
        <div className="depart-manage-container wrapper-container">
            <Search style={{ width:'320px' }} placeholder="请输入部门名称" onSearch={ onChange } />
            {
                treeNodeList.length ? (
                    <Tree
                        onExpand={ onExpand }
                        expandedKeys={ expandedKeys }
                        defaultExpandParent = { true } onSelect={ handleTreeSelect }>
                        { loop(treeNodeList) }
                    </Tree>
                ) : 'data leaveing ...'
            }
        </div>
    )
}



interface UserFormProps extends FormComponentProps {
    username: number;
    password: string;
    userToken:string;
    systemUserRequestAction?: any;
}

interface State {
}

const mapStateToProps = (state:any) => ({
    userToken:state.user.token
})

const mapDispatchToProps = {
    systemUserRequestAction
}

export default connect(mapStateToProps,mapDispatchToProps)(DepartManage)

// export default DepartManage
