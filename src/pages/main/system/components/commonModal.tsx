// Created by szatpig at 2019/12/31.
import React, {useState, useEffect, createRef, forwardRef, useImperativeHandle} from 'react';
import { FormComponentProps } from "antd/es/form";
import { Input, Select, Form, Modal } from 'antd';

type Ref = FormComponentProps

interface commonFormProps extends FormComponentProps{
    userInfo:any,
    treeData:any,
    isEdit:number
}

interface modalProps {
    isEdit:number,
    show:boolean,
    userInfo:any,
    treeData:any,
    children:any,
    handleShow:(type:number,flag:boolean)=>void,
    handleSubmit:(e:any)=>void
}

const CommonForm = forwardRef<Ref, commonFormProps>(({ form, userInfo, treeData, isEdit }, ref) =>{
    const [selectData,setSelectData] = useState([]);
    const { getFieldDecorator } = form
    useImperativeHandle(ref, () => ({
        form,
    }));

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
            </Form>
    )
})


const EnhancedCommonForm = Form.create<commonFormProps>({ name:'commonForm' })(CommonForm)

const CommonModalContent =(props:modalProps)=> (WrappedComponent:any) => {
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
            <WrappedComponent wrappedComponentRef ={ formRef } { ...props }  />
        </Modal>
    )
}

export default CommonModalContent
