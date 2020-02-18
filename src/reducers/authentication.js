const authentication = (state = { auth: false, userId: null }, action) => {
    switch (action.type) {
        case ('SET_AUTHENTICATION'):
            return [
                ...state,
                {
                    authenticated: action.auth,
                },
            ];
        case ('SET_USER_ID'):
            return [
                ...state,
                {
                    userId: action.user,
                },
            ];
        default: return state;
    }
};

export default authentication;
