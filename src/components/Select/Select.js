import React, { Component } from 'react';
import ShouldRender from '../ShouldRender/ShouldRender';
import './Select.css';

class Select extends Component {
  state = {
    selected: false,
    open: true,
    query: '',
    options: [],
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.options !== prevState.options) {
  //     return {options: nextProps.options}
  //   }
  //
  //   return null;
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ selected: this.props.value });
    }

    if ((prevProps.options !== this.props.options)) {
      this.setState({
        selected: this.props.options[0],
        options: this.props.options,
      });
    }
  }

  showList = (event) => {
    if (event.target.tagName === 'INPUT') {
      return;
    }

    return this.setState({
      open: !this.state.open,
      query: '',
      options: this.props.options,
    });
  };

  selectValue(value) {
    this.setState({ selected: value }, this.triggerParentUpdate);
  }

  triggerParentUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state.selected);
    }
  }

  filterList = (event) => {
    const query = event.target.value;

    const options = this.props.options.filter(
        option => option.text.indexOf(query) > -1,
    );
    this.setState({ query, options });
  };

  render() {
    const items = this.state.options.map(
        item => (
            <div
                key={ item.id }
                className="select__list__item"
                onClick={ () => this.selectValue(item) }
            >
              { item.text }
            </div>
        ),
    );

    return (
        <div className="select" onClick={ this.showList }>
          <div
              className="select__selected-choice"
          >{ this.state.selected.text }</div>

          <ShouldRender condition={ this.state.open }>
            <div className="select__list">
              <div className="select__list__search-bar">
                <input
                    type="text"
                    placeholder="Search"
                    value={ this.state.query }
                    onChange={ this.filterList }
                />
              </div>
              <div className="select__list__items">
                { items }
              </div>
            </div>
          </ShouldRender>
        </div>
    );
  }
}

export default Select;
