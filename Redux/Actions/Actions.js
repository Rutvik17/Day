export const currentUser = (user) => {
    return {
      type: 'CURRENT_USER',
      load: user
    };
};

export const locationAction = (loc) => {
    return {
        type: 'CURRENT_LOCATION',
        load: loc
    };
};