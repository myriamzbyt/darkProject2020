import React from 'react';
import PropTypes from 'prop-types';

function TypeDeChampApisOptions({ isVisible, handler, listApis }) {
  if (isVisible) {
    return (
      <div className="cell">
        <label>Liste des APIs</label>
        <select
          id={handler.id}
          name={handler.name}
          onChange={handler.onChange}
          value={handler.value}
          className="small-margin small"
        >
          {Object.keys(listApis).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return null;
}

TypeDeChampApisOptions.propTypes = {
  isVisible: PropTypes.bool,
  listApis: PropTypes.object,
  handler: PropTypes.object
};
export default TypeDeChampApisOptions;
