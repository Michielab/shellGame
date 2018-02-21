import React from "react";
import PropTypes from "prop-types";

const Shell = props => {
  const { positionX, positionY, reveal, color, name } = props;
  return (
    <path
      d={`M ${positionX} ${positionY} q 100 -300 200 0`}
      stroke="black"
      strokeWidth="5"
      fill={color}
      onClick={reveal}
      name={name}
    />
  );
};

Shell.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  color: PropTypes.string,
  reveal: PropTypes.func,
  name: PropTypes.string
};

export default Shell;
