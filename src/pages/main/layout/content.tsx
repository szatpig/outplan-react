// Created by szatpig at 2019/8/20.
import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

import routes from '../router'

class ContentLayout extends Component<Props, State> {
    static defaultProps = {}

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        const  { url } =this.props;
        console.log(this.props,routes);
        return (
            <div className="content-container">
                <Switch>
                    {
                        routes.map((item,i) =>
                            item.path ?
                                <Route key={ i } path={ url + item.path } component={ item.component } exact strict /> :
                                <Route key={ i } component={ item.component } />
                        )
                    }
                </Switch>
            </div>
        )
    }
}

interface Props {
    url:string
}

interface State {
}

export default ContentLayout