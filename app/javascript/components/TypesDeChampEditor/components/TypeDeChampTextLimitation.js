import React from 'react';
import PropTypes from 'prop-types';

function TypeDeChampTextLimitation({ isVisible, handler }) {
  if (isVisible) {
    return (
      <div className="cell libelle">
        <label htmlFor={handler.id}>Nombre de caractère maximum</label>
        <input
          type="number"
          id={handler.id}
          name={handler.name}
          value={handler.value}
          onChange={handler.onChange}
          className="small-margin small"
        />
      </div>
    );
  }
  return null;
}

TypeDeChampTextLimitation.propTypes = {
  isVisible: PropTypes.bool,
  handler: PropTypes.object
};

export default TypeDeChampTextLimitation;
