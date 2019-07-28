import React from 'react';

const GetInput = (props) => {
	const {
		label, type, input, placeholder, handleChange, handleFocus,
	} = props;


	return (
		<div className="flex-col controlled-input">
			<label htmlFor={label}>
				<div>{label}</div>
				<input
					id={label}
					type={type}
					value={input}
					placeholder={placeholder}
					onChange={handleChange}
					onFocus={handleFocus}
				/>
			</label>
		</div>
	);
};

export default GetInput;
