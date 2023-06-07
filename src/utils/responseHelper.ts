import { useNavigate } from 'react-router-dom';

export function failedAuthenticationHelper(response) {
	const naviagate = useNavigate();
	if (response.status == 403 || response.status == 401) {
		sessionStorage.removeItem('user');

		naviagate('/');
	}
}
