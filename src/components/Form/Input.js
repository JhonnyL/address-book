import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  <input
    id={props.id}
    type={props.type}
    value={props.value}
    className={`form-control${props.className}`}
    placeholder={props.placeholder}
    onBlur={e => props.onBlur(props.id, e.target.value)}
    onChange={e => props.onChange(props.id, e.target.value)}
  />
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
  className: '',
};

export default Input;
