import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
test('renders appliaction', () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
});
