import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Home from '../screens/home';
import Compass from '../screens/compass';
import Tilt from '../screens/tilt';
import Map from '../screens/map';
import Nmap from '../screens/mapnew';
//import Compassyrn from '../screens/compassyr';

const screens = {
    Home: {
        screen: Home 
    },
    Tilt: {
        screen: Tilt
    },
    Compass: {
        screen: Compass
    },
    Map:{
        screen:Map
    },
    Nmap:{
        screen:Nmap
    }
}

const Homestack = createStackNavigator(screens);
export default createAppContainer(Homestack);