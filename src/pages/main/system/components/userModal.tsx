// Created by szatpig at 2019/12/23.
import React, { useState, useEffect, createRef, forwardRef, useImperativeHandle } from 'react';
import { FormComponentProps } from "antd/es/form";
import { Input, TreeSelect, Select, Button, Form, Modal, message } from 'antd';
import { userRoleList } from "../../../../api/system-api";
const { Option } = Select;


interface userFormProps extends FormComponentProps{
    userInfo:any,
    treeData:any,
    isEdit:number
}

interface modalProps {
    isEdit:number,
    show:boolean,
    userInfo:any,
    treeData:any,
    handleShow:(type:number,flag:boolean)=>void,
    handleSubmit:(e:any)=>void
}
type Ref = FormComponentProps

const UserForm = forwardRef<Ref, userFormProps>(({ form, userInfo, treeData, isEdit }, ref) =>{
    const [selectData,setSelectData] = useState([]);
    const { getFieldDecorator } = form
    useImperativeHandle(ref, () => ({
        form,
    }));

    useEffect(() => {
        if(userInfo.departId) {
            userRoleList({ departId:userInfo.departId }).then((data:any)=>{
                if(data.data.length==0){
                    setSelectData([]);
                    return false;
                }
                setSelectData(data.data.length && data.data.map((item:any) => {
                    return{
                        value:item.id,
                        label:item.roleName
                    }
                }));
            })
        }

    },[userInfo]);

    const handleTreeChange= (val:string,label:string,extra:any)=>{
        console.log(val,label)
        userRoleList({ departId:val }).then((data:any)=>{
            if(data.data.length==0){
                setSelectData([]);
                return false;
            }
            setSelectData(data.data.length && data.data.map((item:any) => {
                return{
                    value:item.id,
                    label:item.roleName
                }
            }));
        })
    }


    return(
         <Form layout='horizontal' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
            <Form.Item label="邮箱">
                { getFieldDecorator('email', {
                    initialValue:userInfo.email,
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
                })(<Input maxLength={ 45 } placeholder="请输入邮箱地址" />)}
            </Form.Item>
             {
                 !isEdit && (
                     <Form.Item label="密码" required>
                         <span>{ userInfo.password }</span>
                     </Form.Item>
                 )
             }
            <Form.Item label="姓名">
                { getFieldDecorator('realName', {
                    initialValue:userInfo.realName,
                    rules: [{ required: true, message: '请输入姓名', whitespace: true }],
                })(<Input maxLength={ 15 } placeholder="请输入姓名" />)}
            </Form.Item>
            <Form.Item label="手机号">
                { getFieldDecorator('mobile', {
                    initialValue:userInfo.mobile,
                    rules: [
                        { required: true, message: '请输入手机号', whitespace: true },
                        {message: '请输入正确格式的手机号码', pattern: /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/g}
                    ],
                })(<Input  maxLength={ 11 } placeholder="请输入手机号" />)}
            </Form.Item>
            <Form.Item label="部门">
                { getFieldDecorator('departId', {
                    initialValue:userInfo.departId,
                    rules: [{ required: true, message: '请选择部门', type:'number' }],
                })(
                    <TreeSelect
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={ treeData }
                        placeholder="请选择部门"
                        treeDefaultExpandAll
                        onChange={ handleTreeChange }
                    />
                )}
            </Form.Item>
            <Form.Item label="角色">
                { getFieldDecorator('roleIds', {
                    initialValue:userInfo.roleId,
                    rules: [{ required: true, message: '请选择角色', type: 'array' }],
                })(
                    <Select
                        mode="multiple"
                        placeholder="请选择角色"
                    >
                        { selectData.map((item:any)=>{
                            return (<Option key={ item.value } value={ item.value }>{item.label}</Option>)
                        }) }
                    </Select>
                )}
            </Form.Item>
        </Form>
    )
})

const EnhancedUserForm = Form.create<userFormProps>({ name:'userForm' })(UserForm)

const ModalContent = (props:modalProps)=>{
    const formRef:any = createRef<Ref>()
    const { show, isEdit, handleShow, handleSubmit} = props
    const handleOk = (e:any) => {
        formRef.current.form.validateFields((err:any,val:any)=>{
            if (!err) {
                handleSubmit(val)
            }
        });
    };
    const handleCancel = (e:any) => {
        console.log(e);
        handleShow(0,false);
    };
    return(
        <Modal
            title={ isEdit ? '编辑用户': '新增用户' }
            wrapClassName="common-dialog"
            visible={ show }
            onOk={ handleOk }
            onCancel={ handleCancel }
            okButtonProps={{ disabled: false }}
        >
            <EnhancedUserForm wrappedComponentRef ={ formRef } { ...props }  />
        </Modal>
    )
}

export default ModalContent