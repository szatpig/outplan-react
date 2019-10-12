// Created by szatpig at 2019/8/20.
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import logo from '@/images/logo-menu.png'
import logo_mini from '@/images/logo-min.png'


import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;


class MenuLayout extends Component<Props, State> {

    rootSubmenuId = this.props.menuList.map((item:any)=> item.id.toString());

    state:State = {
        openKeys: [],
    };

    onOpenChange = (openKeys:any) => {
        const latestOpenKey = openKeys.find((key:any) => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuId.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    componentDidMount() {
        this.setState({
            openKeys:[this.rootSubmenuId[0].toString()]
        })
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        const { menuList,collapsed } = this.props;
        const { openKeys } = this.state;
        return (
                <Fragment>
                    <div className="menu-logo-wrapper">
                        <img src={ collapsed ? logo_mini :logo } alt="意能通logo" />
                    </div>
                    <Menu theme="dark"
                          mode="inline" defaultSelectedKeys={['1']}
                          openKeys={ openKeys }
                          onOpenChange={this.onOpenChange}>
                        {
                            menuList.map((item:any)=>{
                                if(item.children.length){
                                    return (
                                        <SubMenu title={
                                            <span>
                                              <Icon type="user" />
                                              <span>{ item.title }</span>
                                            </span>
                                        } key={ item.id }>
                                            {
                                                item.children.map((cell:any)=>{
                                                    return <Menu.Item key={ cell.id }>{ cell.title }</Menu.Item>
                                                })
                                            }
                                        </SubMenu>
                                    )
                                }else{
                                   return (
                                        <Menu.Item key={ item.id }>
                                            <Icon type="user" />
                                            <span>{ item.title }</span>
                                        </Menu.Item>
                                   )
                                }
                            })
                        }
                    </Menu>
                </Fragment>
        )
    }
}

interface Props {
    menuList:[]
    collapsed:boolean
}

interface State {
    openKeys:string[]
}

const mapStateToProps = (state:any) => ({
    menuList:state.user.menuList,
    collapsed:state.header.collapsed
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuLayout)