import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import injectSheet from 'react-jss';

const styles = {
  graphicContainer: {
    position: 'sticky',
  },
  sticky: {
    margin: 0,
  },
};

const steps = ['Yote', 'Yotatl'];

class App extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  };

  onViewportChange = viewport => {
    this.setState({ viewport });
  };

  goToSF = () => {
    const viewport = {
      ...this.state.viewport,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
      transitionEasing: easeCubic,
    };
    this.setState({ viewport });
  };

  goToNYC = () => {
    const viewport = {
      ...this.state.viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionEasing: easeCubic,
    };
    this.setState({ viewport });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.graphicContainer}>
        <button onClick={this.goToNYC}>New York City</button>
        <button onClick={this.goToSF}>SF</button>
        <figure className={classes.sticky}>
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            transitionDuration={5000}
            transitionInterpolator={new FlyToInterpolator()}
            onViewportChange={this.onViewportChange}
          />
        </figure>
        <Scrollama
          offset={0.5}
          onStepEnter={this.onStepEnter}
          onStepExit={this.onStepExit}
        >
          {steps.map(text => (
            <Step key={text}>
              <div className={classes.step}>
                <p
                  className={classes.stepText}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
