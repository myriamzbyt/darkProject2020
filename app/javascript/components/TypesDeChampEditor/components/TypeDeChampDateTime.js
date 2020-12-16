import React from 'react';
import PropTypes from 'prop-types';

function TypeDeChampDateTime({ isVisible, handler }) {
  if (isVisible) {
    return (
      <div className="cell libelle">
        <label htmlFor={handler.id}>Date et Heure par Défaut</label>
        <input
          type="checkbox"
          id={handler.id}
          name={handler.name}
          checked={!!handler.value}
          onChange={handler.onChange}
          className="small-margin small"
        />
      </div>
    );
  }
  return null;
}

TypeDeChampDateTime.propTypes = {
  isVisible: PropTypes.bool,
  handler: PropTypes.object
};

export default TypeDeChampDateTime;
