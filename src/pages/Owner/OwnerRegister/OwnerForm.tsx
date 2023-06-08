import { ReactElement, useCallback, useState } from 'react';
import { OwnerApiCalls } from '../../../apiCalls/ownerApiCalls';
import { UserApiCalls } from '../../../apiCalls/userApiCalls';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDiv from '../../../components/Form/FormDiv';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import { isEmailValid, isEmpty } from '../../../utils/validatiorHelper';

interface IOwnerForm {
	Name: string;
	LastName: string;
	Contact: string;
	Email: string;
	Password: string;
}
function OwnerForm({
	handleLogin,
}: {
	handleLogin: (any) => void;
}): ReactElement {
	const [owner, setOwner] = useState<IOwnerForm>({
		Name: '',
		LastName: '',
		Contact: '',
		Email: '',
		Password: '',
	});
	const [error, setError] = useState({
		Name: '',
		LastName: '',
		Contact: '',
		Email: '',
		Password: '',
	});

	const [passwordError, setPasswordError] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [serverError, setServerError] = useState(false);

	const ownerApiCalls = new OwnerApiCalls();
	const userApiCalls = new UserApiCalls();

	const handleChange = useCallback((e): void => {
		const { name, value } = e.target;

		setOwner((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const validateForm = (): boolean => {
		let isValid = true;

		for (const [name, value] of Object.entries(owner)) {
			error[name] = '';
			setPasswordError('');

			if (name === 'Email') {
				if (!isEmailValid(value)) {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Niepoprawny format Email',
					}));
					isValid = false;
				}
			}
			if (name == 'Password') {
				if (value != repeatPassword) {
					setPasswordError('Hasła muszą być takie same');
					isValid = false;
				}
			}

			if (name == 'Contact') {
				const isNumber = /^\d+$/.test(value);

				if (value.length < 9 || !isNumber) {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Niepoprawny number',
					}));
					isValid = false;
				}
			}
			if (isEmpty(value)) {
				setError((prevErrors) => ({
					...prevErrors,
					[name]: 'Puste pole',
				}));
				isValid = false;
			}
		}
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			setDisabledButton(true);
			try {
				const response = await ownerApiCalls.registerOwnerApiCall(owner);
				if (response) {
					setDisabledButton(false);

					if (response.status === 500) {
						setServerError(true);
					}
					if (response.status == 409) {
						setError((prev) => ({
							...prev,
							Email: 'Email jest już zarejestrowany',
						}));
					}
					if (response.status === 201) {
						const secondRespone = await userApiCalls.login({
							Email: owner.Email,
							Password: owner.Password,
						});

						if (secondRespone.status != 201) {
							setServerError(true);
						} else {
							handleLogin(JSON.stringify(await secondRespone.json()));
						}
					}
				}
			} catch (error) {
				setServerError(true);
			}
		}
	};

	const handleRepeatPassword = (e): void => {
		const { name, value } = e.target;
		setRepeatPassword(value);
	};
	const [disabledButton, setDisabledButton] = useState(false);
	return (
		<form className="container " onSubmit={handleSubmit} noValidate={true}>
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row justify-content-center">
				<div className="col-lg-6">
					<div className="card card-body border-0 shadow">
						<div className="row">
							<div className="col-12">
								<div className="row">
									<div className="col-lg-12">
										<FormDiv
											name="Name"
											label="Imie"
											error={error.Name}
											onChange={handleChange}
											type="text"
											value={undefined}
											min={''}
											placeholder={''}
											disabled={undefined}
										/>
									</div>
									<div className="col-lg-12">
										<FormDiv
											name="LastName"
											label="Nazwisko"
											error={error.LastName}
											onChange={handleChange}
											type="text"
											value={undefined}
											min={''}
											placeholder={''}
											disabled={undefined}
										/>
									</div>
								</div>
							</div>

							<div className="col-12">
								<div className="row">
									<div className="col-lg-12">
										<FormDiv
											name="Contact"
											label="Numer telefonu"
											error={error.Contact}
											onChange={handleChange}
											type="number"
											value={undefined}
											min={''}
											placeholder={''}
											disabled={undefined}
										/>
									</div>
									<div className="col-lg-12">
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
							</div>
							<div className="col-12">
								<div className="row">
									<div className="col-lg-12">
										<FormDiv
											name="Password"
											label="Hasło"
											error={error.Password}
											onChange={handleChange}
											type="password"
											value={undefined}
											min={''}
											placeholder={''}
											disabled={undefined}
										/>
									</div>
									<div className="col-lg-12">
										<FormDiv
											name="Password2"
											label="Powtórz hasło"
											error={passwordError}
											onChange={handleRepeatPassword}
											type="password"
											value={undefined}
											min={''}
											placeholder={''}
											disabled={undefined}
										/>
									</div>
								</div>
							</div>

							<div className="col-12">
								<SubmitFormButton
									label="Zarejestruj"
									disable={disabledButton}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default OwnerForm;
