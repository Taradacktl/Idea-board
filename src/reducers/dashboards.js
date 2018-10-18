import * as actions from '../actions/dashboards';

const initialState = {
    dashboards: {}
};

const defaultdashboard = {
    lists: []
};

export const dashboardReducer = (state=initialState, action) => {
    if (action.type === actions.ADD_LIST) {
        const {title, dashboardId} = action;
        const dashboards = state.dashboards;
        const dashboard = Object.assign({}, defaultdashboard, dashboards[dashboardId]);
        dashboard.lists = [...dashboard.lists, {
            cards: [],
            title
        }];
        return Object.assign({}, state, {
            dashboards: Object.assign({}, dashboards, {
                [dashboardId]: dashboard
            })
        });
    }
    else if (action.type === actions.ADD_CARD) {
        const {text, dashboardId, listIndex} = action;
        const dashboards = state.dashboards;
        const dashboard = Object.assign({}, defaultdashboard, dashboards[dashboardId]);
        dashboard.lists = dashboard.lists.map((list, index) => {
            if (index !== listIndex) {
                return list;
            }
            return Object.assign({}, list, {
                cards: [...list.cards, {
                    text
                }]
            });
        });

        return Object.assign({}, state, {
            dashboards: Object.assign({}, dashboards, {
                [dashboardId]: dashboard
            })
        });
    }
    return state;
};