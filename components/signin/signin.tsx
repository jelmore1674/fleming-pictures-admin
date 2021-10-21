import React from 'react';
import Button from '../button/button';
import Input from '../input /input';

const Signin: React.FC = () => {
	return (
		<>
			<form>
				<Input label='email' type='email' />
				<Input label='password' type='password' />
				<Button text='Sign In' />
			</form>
		</>
	);
};

export default Signin;
