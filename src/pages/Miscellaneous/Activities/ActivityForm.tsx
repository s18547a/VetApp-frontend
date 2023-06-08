import { ReactElement, useCallback, useState } from 'react';
import { VisitApiCalls } from '../../../apiCalls/visitApiCalls';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDiv from '../../../components/Form/FormDiv';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import { isNumberEmpty } from '../../../utils/validatiorHelper';

function ActivityForm({
	setServerError,
	setEdited,
}: {
	setServerError;
	setEdited;
}): ReactElement {
	const [medicalActivity, setMedicalActivity] = useState<{
		Price: number;
		ActivityName: String;
	}>({
		Price: 0,
		ActivityName: '',
	});
	const [error, setError] = useState({
		Price: '',
		ActivityName: '',
	});

	const onChange = useCallback((e): void => {
		const { name, value } = e.target;

		setMedicalActivity((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);
	const visitApiCalls = new VisitApiCalls();
	const handleSubmit = async (e): Promise<void> => {
		e.preventDefault();

		if (validateForm()) {
			setDisabledButton(true);
			try {
				const response = await visitApiCalls.addMedicalActivity(
					medicalActivity
				);
				if (response) {
					setDisabledButton(false);

					if (response.status == 201) {
						window.location.reload();
					} else if (response.status == 409) {
						setError((prev) => ({
							...prev,
							ActivityName: 'Aktywność już zarejestrowana',
						}));
					} else {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
			}
		}
	};

	const validateForm = () => {
		let isValid = true;
		setError({
			Price: '',
			ActivityName: '',
		});
		for (const [name, value] of Object.entries(medicalActivity)) {
			if (isNumberEmpty(value)) {
				setError((prev) => ({
					...prev,
					[name]: 'Puste pole',
				}));
				isValid = false;
			}
		}

		return isValid;
	};
	const [disabledButton, setDisabledButton] = useState(false);
	return (
		<div className=" card card-body shadow">
			<CardTitleCompnenet label="Nowa czynność" />
			<form onSubmit={handleSubmit} className="row">
				<div className="col-8">
					<FormDiv
						label="Czynność"
						value={medicalActivity.ActivityName}
						name={'ActivityName'}
						error={error.ActivityName}
						onChange={onChange}
						placeholder={''}
						disabled={undefined}
						min={''}
						type={'string'}
					/>
				</div>
				<div className="col-4">
					<FormDiv
						label={'Cena'}
						type={'number'}
						error={error.Price}
						name={'Price'}
						onChange={onChange}
						value={medicalActivity.Price}
						min={''}
						placeholder={''}
						disabled={undefined}
					/>
				</div>
				<div className="col-12 ">
					<SubmitFormButton label="Dodaj" disable={disabledButton} />
				</div>
			</form>
		</div>
	);
}

export default ActivityForm;
