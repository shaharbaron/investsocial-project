import {View, AppButton} from 'react-native';
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';
import Home from './app/screens/Home';
import Create from './app/screens/Create';
import Explore from './app/screens/Explore';
import Profile from './app/screens/Profile';

export default function App() {
    return (
      // <View style={{
      //   flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      // >
      //   <AppButton title="Login" onPress={() => console.log("Tapped") }/>
      // </View>
      <Login />
      //<Signup />
      //<Home />
      //<Explore />
      //<Create />
      //<Profile />
  );
  }


