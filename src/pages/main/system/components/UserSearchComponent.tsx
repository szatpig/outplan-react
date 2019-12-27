// Created by szatpig at 2019/12/18.
import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';

const { Option } = Select;

function UserSearchComponent(props:userManageProps) {

    const { roleList, handleShow } = props
    const { getFieldDecorator } = props.form;

    useEffect(() => {
        //do something
    },[]);

    const prefixSelector = getFieldDecorator('prefix', {
        initialValue: 'userName',
    })(
            <Select>
                <Option value="userName">账号</Option>
                <Option value="realName">姓名</Option>
                <Option value="mobile">手机号</Option>
            </Select>,
    );
    return (
            <div className="search-container">
                <div className="input-cells">
                    <Form layout="inline">
                        <Form.Item>
                            { getFieldDecorator('keyword', {
                                initialValue:''
                            })(
                                    <Input addonBefore={ prefixSelector } style={{ width: 240 }} placeholder="账号/姓名/手机号" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            { getFieldDecorator('role', {
                                initialValue:''
                            })(
                                    <Select
                                            placeholder="请选择角色"
                                            style={{ width: 120 }}
                                    >
                                        <Option value="">全部角色</Option>
                                        {
                                            roleList.map((item:any) => {
                                                return( <Option key={ item.id } value={ item.id }>{ item.roleName }</Option> )
                                            })
                                        }
                                    </Select>
                            ) }
                        </Form.Item>
                        <Form.Item>
                            { getFieldDecorator('state', {
                                initialValue:''
                            })(
                                    <Select
                                            placeholder="请选择状态"
                                            style={{ width: 120 }}
                                    >
                                        <Option value="">全部</Option>
                                        <Option value="1">正常</Option>
                                        <Option value="0">禁用</Option>
                                    </Select>
                            ) }
                        </Form.Item>
                    </Form>
                </div>
                <div className="input-cells">
                    <Button type="primary">重置密码</Button>
                    <Button type="primary" onClick={ () => handleShow(0,true) }>添加用户</Button>
                </div>
            </div>
    );
}

interface userManageProps extends FormComponentProps {
    roleList:any,
    searchSubmit:(...args:any) => void,
    handleShow:(type:number,flag:boolean) => void,
    systemUserRequestAction?: any;
}


const EnhancedUserSearchComponent = Form.create({
    onValuesChange({ searchSubmit }:userManageProps,changedVal,{ prefix,keyword,role,state }){
        searchSubmit({
            [prefix]:keyword,
            role,
            state
        })
    }
})(UserSearchComponent)

export default EnhancedUserSearchComponent
