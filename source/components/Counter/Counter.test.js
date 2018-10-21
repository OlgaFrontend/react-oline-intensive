// Core
import React from 'react';
import Counter from './';
import renderer from 'react-test-renderer';

const rendererTree = renderer.create(<Counter count = { 3 } />).toJSON();

test('Counter component should correspond to its snapshot counterpart', () => {
  expect(rendererTree).toMatchSnapshot();
});