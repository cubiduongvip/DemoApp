import { StackNavigator } from 'react-navigation';

import List from '../screen/List';
import Item from '../screen/Item';

const Router = StackNavigator(
  {
    List: { screen: List },
    Item: { screen: Item }
  },
  { initialRouteName: 'List' }
);

export default Router;
