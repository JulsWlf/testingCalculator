import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator/Calculator';
import ShouldRender from './components/ShouldRender/ShouldRender';

class App extends Component {
  state = {
    items: [],
    showCalculator: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        items: [
          { id: 1, value: 'option1', text: 'Item 1' },
          { id: 2, value: 'option2', text: 'Item 2' },
          { id: 3, value: 'option3', text: 'Item 3' },
        ],
      });
    }, 2000);
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <div>
            <button onClick={() => this.setState({ showCalculator: !this.state.showCalculator })}>Toggle</button>
          </div>
          <div style={ { marginTop: 40 } }>
            <ShouldRender condition={this.state.showCalculator}>
              <Calculator
                  sourceOptions={ this.state.items }
                  conversionOptions={ this.state.items }
              />
            </ShouldRender>
          </div>
        </div>
    );
  }
}

export default App;
