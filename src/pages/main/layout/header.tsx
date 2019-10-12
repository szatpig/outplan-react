// Created by szatpig at 2019/8/20.
import React, {Component} from 'react'
import { connect } from 'react-redux'

import { Layout, Icon } from 'antd';

import { headerCollapsed } from "../../../store/actions/header";

const { Header } = Layout;

interface Props {
}

interface State {
}

class HeaderLayout extends Component<Props, State> {
    static defaultProps = {}

    toggle = ()=>{

    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Header  className="header-container">
                <Icon
                    className="trigger"
                    type={ this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={ this.props.headerCollapsed }
                />
            </Header>
        )
    }
}

interface Props {
    collapsed:boolean,
    headerCollapsed:any
}

const mapStateToProps = (state:any) => ({
    collapsed:state.header.collapsed
})

const mapDispatchToProps = {
    headerCollapsed
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderLayout)