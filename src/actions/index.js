export const ADD_LIST = 'ADD_LIST';
export const addList = (title, dashboardId) => ({
    type: ADD_LIST,
    title,
    dashboardId,
});
