import { Component, CSSProperties } from 'react';
import { AlertProps } from '../types';

class Alert extends Component<AlertProps> {
  protected color: string | null = null;
  protected bgColor: string | null = null;

  getStyle = (): CSSProperties => {
    return {
      color: this.color ?? undefined,
      backgroundColor: this.bgColor ?? undefined,
      borderColor: this.color ?? undefined,
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
  protected color = 'rgb(255, 0, 0)';
  protected bgColor = 'rgba(255, 0, 0, 0.1)';
}

class ErrorAlert extends Alert {
  protected color = 'rgb(255, 0, 0)';
  protected bgColor = 'rgba(255, 0, 0, 0.1)';
}

class WarningAlert extends Alert {
  protected color = 'rgb(255, 165, 0)';
  protected bgColor = 'rgba(255, 165, 0, 0.1)';
}

export { InfoAlert, ErrorAlert, WarningAlert };
