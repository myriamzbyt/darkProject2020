import React from 'react';
import PropTypes from 'prop-types';

function TypeDeChampRepetitionLibelleLigne({ isVisible, handler }) {
  if (isVisible) {
    return (
      <div className="cell libelle">
        <label htmlFor={handler.id}>Libellé ligne</label>
        <input
          type="text"
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

TypeDeChampRepetitionLibelleLigne.propTypes = {
  handler: PropTypes.object,
  isVisible: PropTypes.bool
};

export default TypeDeChampRepetitionLibelleLigne;
