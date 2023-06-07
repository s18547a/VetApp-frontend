export async function responseAuthenticationHandler(response) {
	if (response.status == 401 || response.status == 403) {
		sessionStorage.removeItem('user');
	}
}
