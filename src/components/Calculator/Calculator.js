import React, { Component } from 'react';
import Select from '../Select/Select';
import './Calculator.css';

class Calculator extends Component {
  state = {
    source: false,
    target: false,
    filteredConversionOptions: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sourceOptions !== this.props.sourceOptions) {
      const value = this.props.sourceOptions.find(
          option => option.value === 'option3',
      );

      if (value) {
        this.setState({ source: value });
      }
    }

    if (prevState.source !== this.state.source) {
      const filtered = this.props.sourceOptions.filter(
          option => option.value !== this.state.source.value,
      );

      this.setState({ filteredConversionOptions: filtered, target: filtered[0] });
    }
  }

  sourceChanged = (value) => {
    this.setState({ source: value });
  };

  targetChanged = (value) => {
    this.setState({ target: value });
  };

  render() {
    return (
        <div className="calculator">
          <div className="calculator__left">
            <Select
                options={ this.props.sourceOptions }
                onChange={ this.sourceChanged }
                value={ this.state.source }
            />
          </div>
          <div className="calculator__right">
            <Select
                options={ this.state.filteredConversionOptions }
                onChange={ this.targetChanged }
                value={ this.state.target }
            />
          </div>
        </div>
    );
  }
}

export default Calculator;