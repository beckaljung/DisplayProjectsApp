import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/home'
import ProjectDetails from '../screens/projectDetails'

const screens={
    Home:{
        screen: Home,
        navigationOptions:{
            title: '',
        }
    },
    ProjectDetails:{
        screen: ProjectDetails,
        navigationOptions:{
            title: 'Project Details',

        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#eee',
            height:40
        }
    }
});

export default createAppContainer(HomeStack);
