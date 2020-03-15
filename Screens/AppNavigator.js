import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "./Home";
import Login from "./Login";
import Index from "./Index";
import UpdateUserName from "./updateUserName";
import ConfirmDelete from "./ConfirmDelete";

const AppNavigator = createStackNavigator({
  Index: {
    screen: Index,
  },
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  GetUserName: {
    screen: UpdateUserName
  },
  ConfirmDelete: {
    screen: ConfirmDelete
  }
}, {
  headerMode: 'none',
});

export default createAppContainer(AppNavigator);
