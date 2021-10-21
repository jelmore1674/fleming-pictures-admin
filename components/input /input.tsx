import React from 'react';

interface Props {
	label: string;
	type: string;
}

const Input: React.FC<Props> = ({ label, type }) => {
	return (
		<div>
			<div>
				<label htmlFor={label}>{label}</label>
				<input type={type} id={label} />
			</div>
		</div>
	);
};

export default Input;
