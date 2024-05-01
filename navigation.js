import { createStackNavigator } from '@react-navigation/stack';
import QuizPage from './Components/QuizPage';
import TriviaChallenge from './Components/TriviaChallenge';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuizPage" component={QuizPage} />
      <Stack.Screen name="TriviaChallenge" component={TriviaChallenge} />
    </Stack.Navigator>
  );
};

export default Navigation;