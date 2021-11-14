import React, { useState } from "react";
import PropTypes from "prop-types";

const Sound = props => {
	const [like, setLike] = useState(
		<i className="far fa-heart fa-2x unclicked"></i>
	);
	const [add, setAdd] = useState(
		<i className="far fa-plus-square fa-2x unclicked"></i>
	);
	const [value, setValue] = useState(true);

	const ChangeLike = () => {
		if (value == true) {
			setLike(<i className="far fa-heart fa-2x clicked"></i>);
			setValue(false);
		} else {
			setLike(<i className="far fa-heart fa-2x unclicked"></i>);
			setValue(true);
		}
	};

	const ChangeAdd = () => {
		if (value == true) {
			setAdd(<i className="far fa-plus-square fa-2x clicked"></i>);
			setValue(false);
		} else {
			setAdd(<i className="far fa-plus-square fa-2x unclicked"></i>);
			setValue(true);
		}
	};

	return (
		<li>
			<div
				onClick={() => {
					props.addingSource();
				}}
				className="nameBOX">
				{props.name}
			</div>
			<div className="categoryBOX">{props.category}</div>
			<div className="buttonsBOX">
				<span onClick={() => ChangeLike()}>{like}</span>
				<span onClick={() => ChangeAdd()}>{add}</span>
			</div>
		</li>
	);
};

Sound.propTypes = {
	name: PropTypes.string,
	category: PropTypes.string,
	url: PropTypes.string,
	addingSource: PropTypes.func
};
export default Sound;
