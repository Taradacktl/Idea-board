import React from 'react';
import {connect} from 'react-redux';
import List from './list';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import {addList} from '../actions/dashboards';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    addList(title) {
            this.props.dispatch(addList(title, this.props.match.params.dashboardId));
        }

    render() {
        const lists = this.props.lists.map((list, index) => (
            <li className="list-wrapper" key={index}>
                <List
                    index={index}
                    dashboardId={this.props.match.params.dashboardId}
                    {...list}
                />
            </li>
        ));
        return (
            <div className="dashboard">
            <h2>{this.props.match.params.dashboardId}</h2>
                <ul className="lists">
                    {lists}
                </ul>
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    console.log("props dashboard:", props)
    console.log("state dashboard:", state)
    const {currentUser} = state.auth;
    const dashboard = Object.assign(
        {},
        {
            lists: []
        },
        state.dashboards[props.match.params.dashboardId]
    );
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        lists: dashboard.lists
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
