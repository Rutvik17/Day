const locationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CURRENT_LOCATION':
            return state = action.load;
        default:
            return state;
    }
};

export default locationReducer;