import React from 'react';
import PropTypes from 'prop-types';

const Company = ({ conversations, logo, name }) => {
  return (
    <div className='item'>
      <div className='right floated content'>
        <div className='ui large label'>{conversations}</div>
      </div>
      <img className='ui avatar image' src={logo} alt="" />
      <div className='content'>
        {name}
      </div>
    </div>
  );
};

Company.defaultProps = {
  conversations: 0,
  logo: '',
  name: ''
};

Company.propTypes = {
  conversations: PropTypes.number,
  logo: PropTypes.string,
  name: PropTypes.string
};

export default Company;