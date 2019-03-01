import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import injectSheet from 'react-jss';
import MyMap from './MyMap.js'
import 'mapbox-gl/dist/mapbox-gl.css';

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
    // must be in longtiude latitutude, not lat-lng
    center: [114.1643, 22.8442],
    zoom: 11,
  },
  {
    text: 'Hunghua Zhen',
    center: [112, 24.193648],
    zoom: 11,
  },
];

class App extends Component {
  state = {
    center: [112.411, 23.1729],
    zoom: 4,
  };

  onViewportChange = viewport => {
    this.setState({ viewport });
  };

  onStepEnter = ({ data: { center, zoom } }) => {
    this.setState({ center, zoom });
  };

  render() {
    const { zoom, center } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.graphicContainer}>
        <figure className={classes.sticky}>
          <MyMap center={center} zoom={zoom} />
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
