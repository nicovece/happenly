import React from 'react';
import { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderColor: this.color,
      // textAlign: 'center',
      // fontSize: '12px',
      // margin: '10px 0',
      // padding: '10px',
    };
  };

  render() {
    return (
      <div className="alert">
        <p className="alert-text" style={this.getStyle()}>
          {this.props.text}
        </p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)'; // red
    this.bgColor = 'rgba(255, 0, 0, 0.1)'; // light red
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)'; // red
    this.bgColor = 'rgba(255, 0, 0, 0.1)'; // light red
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 165, 0)'; // orange
    this.bgColor = 'rgba(255, 165, 0, 0.1)'; // light orange
  }
}
export { InfoAlert, ErrorAlert, WarningAlert };
