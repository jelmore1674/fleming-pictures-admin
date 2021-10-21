import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signin from '../components/signin/signin';

describe('<Signin />', () => {
	it('should render email input', () => {
		const signin = render(<Signin />);
		const email = screen.getByText('email');
		expect(email).toBeInTheDocument();
	});

	it('should render password input', () => {
		const signin = render(<Signin />);
		const password = screen.getByText('password');
		expect(password).toBeInTheDocument();
	});
	it('should render a Sign in button', () => {
		const signin = render(<Signin />);
		const button = screen.getByRole('button');
		expect(button.innerHTML).toBe('Sign In');
		expect(button).toBeInTheDocument();
	});
});
