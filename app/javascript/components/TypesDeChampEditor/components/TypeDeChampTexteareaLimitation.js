import React from 'react';
import PropTypes from 'prop-types';

function TypeDeChampTexteareaLimitation({ isVisible, handler }) {
  if (isVisible) {
    return (
      <div className="cell libelle">
        <label htmlFor={handler.id}>Nombre de caractère maximum</label>
        <input
          type="number"
          id={handler.id}
          name={handler.name}
          defaultValue={1000}
          value={handler.value}
          onChange={handler.onChange}
          className="small-margin small"
        />
      </div>
    );
  }
  return null;
}

TypeDeChampTexteareaLimitation.propTypes = {
  isVisible: PropTypes.bool,
  handler: PropTypes.object
};

export default TypeDeChampTexteareaLimitation;
