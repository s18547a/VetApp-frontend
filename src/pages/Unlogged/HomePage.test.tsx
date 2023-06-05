/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

test('test HomePage navigation', () => {
	render(<HomePage handleLogin={function (any: any): void {}} />);
	const loginTab = screen.getByText('Logowanie');
	expect(loginTab).toBeInTheDocument();

	const scheduldeTab = screen.getByText('Godziny otwarcia');
	expect(scheduldeTab).toBeInTheDocument();

	const registerTab = screen.getByText('Rejestracja');
	expect(registerTab).toBeInTheDocument();
});

test('Testing login in ', () => {});
