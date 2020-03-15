export const currentUser = (user) => {
    return {
      type: 'CURRENT_USER',
      load: user
    };
};