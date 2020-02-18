// let nextTodoId = 0;
// export const addTodo = text => ({
//     type: 'ADD_TODO',
//     // eslint-disable-next-line no-plusplus
//     id: nextTodoId++,
//     text,
// });
// export const setVisibilityFilter = filter => ({
//     type: 'SET_VISIBILITY_FILTER',
//     filter,
// });
// export const toggleTodo = id => ({
//     type: 'TOGGLE_TODO',
//     id,
// });
// export const VisibilityFilters = {
//     SHOW_ALL: 'SHOW_ALL',
//     SHOW_COMPLETED: 'SHOW_COMPLETED',
//     SHOW_ACTIVE: 'SHOW_ACTIVE',
// };

export const setAuthenticated = (auth) => ({
    type: 'SET_AUTHENTICATED',
    auth,
});

export const setUserId = (userId) => ({
    type: 'SET_USER_ID',
    userId,
});
