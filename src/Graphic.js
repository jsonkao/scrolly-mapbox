import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import injectSheet from 'react-jss';
import Map from './Map.js';

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
    padding: '0 0 130vh 10vw',
  },
  step: {
    position: 'relative',
    backgroundColor: '#000',
    marginBottom: '70vh',
    maxWidth: '500px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  stepText: {
    padding: '0.6em 0.8em',
    color: '#fff',
    fontSize: '1.4em',
    fontFamily: 'Merriweather',
    fontWeight: 400,
    lineHeight: '1.4em',
  },
};

const steps = [
  {
    text:
      'I closed the silky, dark blue covers and reached for another volume from the mountain of records stacked in front of me.',
    // must be in longtiude latitutude, not lat-lng
    center: [114.1643, 22.8442],
    zoom: 11,
  },
  {
    text:
      'I was looking for someone named Yan Ji Ci. Youngest of three, born on a winter’s night in 1900 in Dong Yang.',
    center: [112, 24.193648],
    zoom: 11,
  },
];

class Graphic extends Component {
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
          <Map center={center} zoom={zoom} />
        </figure>
        <article className={classes.steps}>
          <Scrollama offset={0.5} onStepEnter={this.onStepEnter}>
            {steps.map(step => (
              <Step key={step.text} data={step}>
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

export default injectSheet(styles)(Graphic);
