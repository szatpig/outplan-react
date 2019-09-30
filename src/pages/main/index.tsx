// Created by szatpig at 2019/8/20.
import React, {Component, lazy } from 'react'

const ContentLayout  = lazy(() => import('./layout/content'));
const HeaderLayout  = lazy(() => import('./layout/header'));
const MenuLayout  = lazy(() => import('./layout/menu'));

const ErrorBoundary  = lazy(() => import('./../../components/ErrorBoundary'));

class Home extends Component<Props, State>{

    render() {
        console.log(this.props)
        return (
            <div className="main-container">
                <MenuLayout />
                <div className="wrapper-container">
                    <HeaderLayout />
                    <ErrorBoundary>
                        <ContentLayout { ...this.props.match } />
                    </ErrorBoundary>
                </div>
            </div>
        )
    }
}

interface Props {
    // url:string
    match:any
}

interface State {
}

export default Home