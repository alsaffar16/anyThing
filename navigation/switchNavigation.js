import { createSwitchNavigator, createAppContainer } from "react-navigation";
import MyTabs from "./tabs";
import LogInStack from "./LogInStack";

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: LogInStack,
    Home: MyTabs,
  },
  {
    initialRouteName: "Auth",
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
