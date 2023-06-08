import { ReactElement, useCallback, useState } from 'react';
import { UserApiCalls } from '../../../apiCalls/userApiCalls';
import FormDiv from '../../../components/Form/FormDiv';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import { isEmpty } from '../../../utils/validatiorHelper';

function LoginForm({
	handleLogin,
}: {
	handleLogin: (any) => void;
}): ReactElement {
	const userApiCalls = new UserApiCalls();
	const [loginForm, editLoginForm] = useState({ Email: '', Password: '' });
	const [error, setError] = useState({ Email: '', Password: '' });

	const [serverError, setServerError] = useState(false);

	const handleChange = useCallback((e): void => {
		const { name, value } = e.target;

		editLoginForm((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			setDisabledButton(true);
			try {
				const response = await userApiCalls.login(loginForm);
				if (response) {
					setDisabledButton(false);
					if (response.status == 404 || response.status == 401) {
						setError((prev) => ({
							...prev,
							Email: 'Niepoprawny email lub hasło',
							Password: 'Niepoprawny email lub hasło',
						}));
					}
					if (response.status == 201) {
						const user = JSON.stringify(await response.json());

						handleLogin(user);
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setDisabledButton(false);
				console.log(error);
				setServerError(true);
			}
		}
	};
	const validateForm = (): boolean => {
		let isValid = true;
		for (const [name, value] of Object.entries(loginForm)) {
			error[name] = '';

			if (isEmpty(value)) {
				isValid = false;
				setError((prev) => ({
					...prev,
					[name]: 'Puste pole',
				}));
			}
		}

		return isValid;
	};
	const [disabledButton, setDisabledButton] = useState(false);

	return (
		<form onSubmit={handleSubmit} className="container">
			<div className="row justify-content-center">
				<ServerErrorInfoComponenet serverError={serverError} />
				<div className="col-6">
					<div className="card card-body  border-0 shadow">
						<div className="row justify-content-center">
							<div className="col-12">
								<FormDiv
									name="Email"
									label="Email"
									error={error.Email}
									onChange={handleChange}
									type="text"
									value={undefined}
									min={''}
									placeholder={''}
									disabled={undefined}
								/>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-12">
								<FormDiv
									name="Password"
									label="Hasło"
									error={error.Password}
									onChange={handleChange}
									type={'password'}
									value={undefined}
									min={''}
									placeholder={''}
									disabled={undefined}
								/>
							</div>
						</div>
						<div className="col-12">
							<SubmitFormButton label="Zaloguj" disable={disabledButton} />
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default LoginForm;
