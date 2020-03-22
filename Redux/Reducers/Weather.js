const weatherReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CURRENT_WEATHER':
            return state = action.load;
        default:
            return state;
    }
};

export default weatherReducer;