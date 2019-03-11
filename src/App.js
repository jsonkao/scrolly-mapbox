import React from 'react';
import archieml from 'archieml';
import injectSheet from 'react-jss';
import { copy } from './copy';
import Graphic from './Graphic';

const styles = {};

// const paragraphs = archieml(copy);
// console.log('paragraphs', paragraphs);

const App = () => (
  <div>
    <Graphic />
  </div>
);

export default injectSheet(styles)(App);
