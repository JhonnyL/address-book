import React from 'react';
import PropTypes from 'prop-types';

const Select = props => (
  <select
    id={props.id}
    className="form-control"
    onChange={e => props.onChange(props.id, e.target.value)}
    value={props.value}
  >
    {
      props.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))
    }
  </select>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  value: '',
};

export default Select;
