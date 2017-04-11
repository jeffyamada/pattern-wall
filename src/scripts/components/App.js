import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import appStart from '../actions/appActions';


function mapStateToProps({ appReducer }) {
  return { appReady: appReducer.appReady };
}

@connect(mapStateToProps)
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    appReady: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(appStart());
  }

  render() {
    if (this.props.appReady) {
      return <h1>Ready!</h1>;
    }

    return <h1>Getting Ready</h1>;
  }
}
