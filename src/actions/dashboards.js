export const ADD_LIST = 'ADD_LIST';
export const addList = (title, dashboardId) => ({
    type: ADD_LIST,
    title,
    dashboardId,
});

export const ADD_CARD = 'ADD_CARD';
export const addCard = (text, dashboardId, listIndex) => ({
    type: ADD_CARD,
    text,
    dashboardId,
    listIndex
});