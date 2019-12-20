// Created by szatpig at 2019/8/21.
// import React, {useState, useEffect, Component} from 'react';

import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux'
import { FormComponentProps } from 'antd/es/form';
import { systemUserRequestAction } from './../../../store/actions/system'
import {getPublicKey} from "../../../api/login-api";

class DepartManage extends Component<UserFormProps, State> {
    static defaultProps = {}

    state = {
        codePanel:false,
        publicKey:'',
    }

    componentDidMount() {
        const { systemUserRequestAction } = this.props;
        systemUserRequestAction({ a:1 })
    }

    render(){return (<div className="depart-manage-container">部门管理</div>)}

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
