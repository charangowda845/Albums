import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../App'; // Assuming your main component is in '../App'

// This is the core test that is likely failing
it('renders the main navigation stack correctly', async () => {
  let tree;
  
  // 1. Wrap the initial render in 'act'
  await act(async () => {
    tree = renderer.create(<App />);
  });

  // 2. Add an explicit wait after the render, which often resolves NavigationContainer issues
  await act(async () => {
    // Wait for any final timers or effects from NavigationContainer
    // You can also use a small promise delay here if act alone is not enough,
    // though act is the preferred way.
  });

  // 3. Perform assertions
  expect(tree.toJSON()).toMatchSnapshot();
});