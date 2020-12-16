import React from 'react';
import PropTypes from 'prop-types';

function TypeDeChampApisCheckboxes({
  isVisible,
  handler,
  listApis,
  api_name,
  listChecked
}) {
  if (isVisible) {
    return (
      <div className="cell">
        <label>Liste des champs</label>
        <div className="apis-options">
          {listApis[api_name.value].map((item) => (
            <label key={item[0]}>
              <input
                type="checkbox"
                id={handler.id}
                name={handler.name}
                value={item[0]}
                checked={
                  listChecked[handler.id.substr(6, 1)]
                    ? !!listChecked[handler.id.substr(6, 1)].includes(item[0])
                    : item.value
                }
                onChange={handler.onChange}
                className="small-margin small"
              />
              {item[1]}
            </label>
          ))}
          {(listChecked[handler.id.substr(6, 1)] = null)}
        </div>
      </div>
    );
  }
  return null;
}

TypeDeChampApisCheckboxes.propTypes = {
  isVisible: PropTypes.bool,
  handler: PropTypes.object,
  listApis: PropTypes.object,
  api_name: PropTypes.object,
  listChecked: PropTypes.object
};

export default TypeDeChampApisCheckboxes;
