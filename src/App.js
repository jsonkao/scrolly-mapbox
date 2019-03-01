import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import injectSheet from 'react-jss';
import 'mapbox-gl/dist/mapbox-gl.css';

import CustomMapController from './CustomMapController';

const styles = {
  graphicContainer: {
    position: 'sticky',
  },
  sticky: {
    margin: 0,
    position: 'sticky',
    width: '100%',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  steps: {
    padding: '0 5vw 130vh 5vw',
  },
  step: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: '0 auto 70vh auto',
    maxWidth: '500px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  stepText: {
    textAlign: 'center',
    padding: '1rem',
    fontSize: '1.2rem',
    fontFamily: 'Merriweather',
    fontWeight: 400,
    lineHeight: '2rem',
  },
};

const steps = [
  {
    text: 'Qingxi',
    latitude: 22.8442,
    longitude: 114.1643,
    zoom: 11,
  },
  {
    text: 'Hunghua Zhen',
    latitude: 24.193648,
    longtiude: 112,
    zoom: 11,
  },
];

class App extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,

      // Initial view settings
      latitude: 23.1729,
      longtiude: 112.411,
      zoom: 4,
    },
  };

  mapController = new CustomMapController();

  onViewportChange = viewport => {
    this.setState({ viewport });
  };

  onStepEnter = ({ data: { latitude, longitude, zoom } }) => {
    const viewport = {
      ...this.state.viewport,
      latitude,
      longitude,
      zoom,
    };
    this.setState({ viewport });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.graphicContainer}>
        <figure className={classes.sticky}>
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onViewportChange={this.onViewportChange}
            controller={this.mapController}
          />
        </figure>
        <article className={classes.steps}>
          <Scrollama offset={0.5} onStepEnter={this.onStepEnter}>
            {steps.map(step => (
              <Step key={step.longitude} data={step}>
                <div className={classes.step}>
                  <p
                    className={classes.stepText}
                    dangerouslySetInnerHTML={{ __html: step.text }}
                  />
                </div>
              </Step>
            ))}
          </Scrollama>
        </article>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
