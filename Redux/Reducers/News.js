const newsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'TOP_HEADLINES':
            return state.topHeadlines = action.load;
        default:
            return state;
    }
};

export default newsReducer;