import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VetApiCalls } from '../../../../apiCalls/vetApiCalls';

import SubmitFormButton from '../../../../components/Buttons/SubmitFormButton';
import CardTitleCompnenet from '../../../../components/General/CardTitle';
import UpperPageStripe from '../../../../components/General/UpperPageStripe';
import ServerErrorInfoBannerComponenet from '../../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import BreadCrumbComponent from '../../../../components/Navigation/BreadCrumbComponent';

import NewScheduldeDayEditComponent from './NewScheduldeDayEditComponent';

export interface IVetScheduldeForm {
	Monday: string;
	Tuesday: string;
	Wednesday: string;
	Thursday: string;
	Friday: string;
	Saturday: string;
	Sunday: string;
}

function VetScheduldeForm(): ReactElement {
	const vetApiCalls = new VetApiCalls();
	const params = useParams();
	const [serverError, setServerError] = useState(false);

	const navigate = useNavigate();
	const [schedulde, setSchedulde] = useState({
		Monday: '',
		Tuesday: '',
		Wednesday: '',
		Thursday: '',
		Friday: '',
		Saturday: '',
		Sunday: '',
	});

	const [error, setError] = useState({
		Monday: '',
		Tuesday: '',
		Wednesday: '',
		Thursday: '',
		Friday: '',
		Saturday: '',
		Sunday: '',
	});
	const [vetId, setVetId] = useState<string>();
	const [fullSchedulde, setFullSchedulde] = useState<
		{
			VetId: string;
			Name: string;
			LastName: string;
			Monday: string;
			Tuesday: string;
			Wednesday: string;
			Thursday: string;
			Friday: string;
			Saturday: string;
			Sunday: string;
		}[]
	>([]);
	const naviagate = useNavigate();
	const loadVetSchedulde = async () => {
		try {
			const paramVetId = params.VetId;
			setVetId(paramVetId);

			const response = await vetApiCalls.getVetSchedulde(paramVetId);

			if (response) {
				if (response.status == 200) {
					const data = await response.json();
					for (const [name, value] of Object.entries(data)) {
						setSchedulde((prev) => ({
							...prev,
							[name]: value,
						}));
						if (value == null) {
							setSchedulde((prev) => ({
								...prev,
								[name]: '',
							}));
						}
						//}
					}
				}
			}
			const response2 = await vetApiCalls.getFullSchedulde();
			if (response2) {
				const data2 = await response2.json();
				setFullSchedulde(data2);
			}
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
	};
	useEffect(() => {
		loadVetSchedulde();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(value);
		setError((prev) => ({
			...prev,
			[name]: '',
		}));

		setSchedulde((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const isValid = (): boolean => {
		let isValid = true;
		for (const [name, value] of Object.entries(schedulde)) {
			setError((prev) => ({
				...prev,
				[name]: '',
			}));

			if (value != '') {
				const splitedHours = value.split('-');
				if (splitedHours.length != 2) {
					setError((prev) => ({
						...prev,
						[name]: 'error',
					}));
					isValid = false;
				} else {
					splitedHours.forEach((hours) => {
						const regex = '[0-2][0-9]:[0][0]';
						const match = hours.match(regex);
						if (match == null) {
							setError((prev) => ({
								...prev,
								[name]: 'error',
							}));
							isValid = false;
						}
						if (Number(hours.split(':')[0]) > 24) {
							if (match == null) {
								setError((prev) => ({
									...prev,
									[name]: 'error',
								}));
								isValid = false;
							}
						}
					});

					if (splitedHours[0] >= splitedHours[1]) {
						setError((prev) => ({
							...prev,
							[name]: 'error',
						}));
						isValid = false;
					}
				}
			}
		}
		console.log(error);

		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isValid()) {
			try {
				const newSchedulde = {
					VetId: params.VetId,
					...schedulde,
				};
				for (const [name, value] of Object.entries(newSchedulde)) {
					if (value == '') {
						newSchedulde[name] = null;
					}
				}

				const response = await vetApiCalls.updateSchedulde(newSchedulde);
				if (response) {
					if (response.status == 201) {
						navigate(`/vets/${params.VetId}`);
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
				console.log(error);
			}
		}
	};

	return (
		<div className="">
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Weterynarze', active: false, link: '/vets' },
							{
								label: 'Profil',
								active: false,
								link: `/vets/${vetId}`,
							},
							{ label: 'Edycja harmonogramu', active: true, link: '' },
						]}
					/>
				}
			>
				{}
			</UpperPageStripe>
			<form className="container" onSubmit={handleSubmit}>
				<ServerErrorInfoBannerComponenet serverError={serverError} />
				<div className="">
					<div className=" card card-body shadow">
						<div className="d-flex mb-3">
							<div className="">
								<CardTitleCompnenet
									label={`Edycja harmonogramu: ${
										fullSchedulde.filter((schedulde) => {
											if (schedulde.VetId == vetId) {
												return true;
											}
										})[0]?.Name
									} ${
										fullSchedulde.filter((schedulde) => {
											if (schedulde.VetId == vetId) {
												return true;
											}
										})[0]?.LastName
									}`}
								/>
							</div>
							<div className=" ms-3 ps-0">
								<SubmitFormButton label={'Zapisz'} disable={false} />
							</div>
						</div>

						<div className=" ">
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Poniedziałek</th>
										<th>Wtorek</th>
										<th>Środa</th>
										<th>Czwartek</th>
										<th>Piątek</th>
										<th>Sobota</th>
										<th>Niedziela</th>
									</tr>
								</thead>
								<tbody>
									<tr key={vetId} className="">
										<td>
											<NewScheduldeDayEditComponent
												value={schedulde.Monday}
												onChange={handleChange}
												name={'Monday'}
												error={error.Monday}
											/>
										</td>
										<td>
											<NewScheduldeDayEditComponent
												value={schedulde.Tuesday}
												onChange={handleChange}
												name={'Tuesday'}
												error={error.Tuesday}
											/>
										</td>
										<td>
											<NewScheduldeDayEditComponent
												value={schedulde.Wednesday}
												onChange={handleChange}
												name={'Wednesday'}
												error={error.Wednesday}
											/>
										</td>
										<td>
											<NewScheduldeDayEditComponent
												value={schedulde.Thursday}
												onChange={handleChange}
												name={'Thursday'}
												error={error.Thursday}
											/>
										</td>
										<td>
											<NewScheduldeDayEditComponent
												value={schedulde.Friday}
												onChange={handleChange}
												name={'Friday'}
												error={error.Friday}
											/>
										</td>
										<td>
											<NewScheduldeDayEditComponent
												value={schedulde.Saturday}
												onChange={handleChange}
												name={'Saturday'}
												error={error.Saturday}
											/>
										</td>
										<td>
											<NewScheduldeDayEditComponent
												value={schedulde.Sunday}
												onChange={handleChange}
												name={'Sunday'}
												error={error.Sunday}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className=" mt-5">
					<div className=" card card-body shadow">
						<div className="">
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Weterynarz</th>
										<th>Poniedziałek</th>
										<th>Wtorek</th>
										<th>Środa</th>
										<th>Czwartek</th>
										<th>Piątek</th>
										<th>Sobota</th>
										<th>Niedziela</th>
									</tr>
								</thead>
								<tbody>
									{fullSchedulde.map((vetSchdulde) => {
										if (vetId != vetSchdulde.VetId) {
											return (
												<tr key={vetSchdulde.VetId} className="">
													<td>{`${vetSchdulde.Name} ${vetSchdulde.LastName}`}</td>
													<td>{vetSchdulde.Monday}</td>
													<td>{vetSchdulde.Tuesday}</td>
													<td>{vetSchdulde.Wednesday}</td>
													<td>{vetSchdulde.Thursday}</td>
													<td>{vetSchdulde.Friday}</td>
													<td>{vetSchdulde.Saturday}</td>
													<td>{vetSchdulde.Sunday}</td>
												</tr>
											);
										}
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default VetScheduldeForm;
