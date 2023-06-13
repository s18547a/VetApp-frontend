import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SurgeryApiCalls } from '../../../apiCalls/surgeryApiCalls';
import Surgery from '../../../classes/Surgery';
import Modal from '../../../components/Modal/Modal';
import ModalEnableBtn from '../../../components/Modal/ModalEnableBtn';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import ProfileDiv from '../../../components/Profile/ProfileDiv';
import { isManager } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

import SurgeryReportForm from '../SurgeryRegister/SurgeryReportForm';
import { CheckLg } from 'react-bootstrap-icons';
import EditButton from '../../../components/Buttons/EditButton';
import CardTtile from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';

function SurgeryProfile(): ReactElement {
	const [surgery, setSurgery] = useState<Surgery>();
	const [editReport, setEditReport] = useState(false);
	const [report, setReport] = useState('');
	const [reload, setReload] = useState(false);
	const [serverError, setServerError] = useState(false);
	const navigate = useNavigate();
	const surgeryApiCalls = new SurgeryApiCalls();
	const param = useParams();
	const [disabledButton, setDisabledButton] = useState(false);
	const loadSurgery = async () => {
		try {
			const surgeryId = param.SurgeryId;

			const response = await surgeryApiCalls.getSurgery(surgeryId);
			if (response) {
				const data = await response.json();
				if (response.status == 200) {
					setSurgery(data);
					setReport(data.Report);
				}
				if (response.status == 500) {
					setServerError(true);
				}
			}
		} catch (error) {
			setServerError(true);
		}
	};
	useEffect(() => {
		loadSurgery();
	}, []);

	useEffect(() => {
		loadSurgery();
	}, [reload]);

	const onReportChange = (e): void => {
		const value = e.target.value;
		setReport(value);
	};

	const saveEditReport = async () => {
		try {
			const response = await surgeryApiCalls.updateSurgeryReport(
				report,
				surgery?.SurgeryId
			);
			if (response) {
				if (response.status == 201) {
					navigate(`/surgeries/${surgery?.SurgeryId}`);
					setEditReport(false);
					setReload(true);
				} else {
					setServerError(true);
				}
			}
		} catch (error) {
			setServerError(true);
			console.log(error);
		}
	};

	const handleClick = async () => {
		try {
			setDisabledButton(true);
			const response = await surgeryApiCalls.cancelSurgery(surgery?.SurgeryId);
			setDisabledButton(false);
			if (response) {
				if (response.status == 500) {
					setServerError(true);
				}
				navigate('/surgeries', {
					state: { newId: surgery?.SurgeryId, deleted: true },
				});
			}
		} catch (error) {
			setServerError(true);
			console.log(error);
		}
	};

	const saveEditButton = (
		<button
			onClick={saveEditReport}
			className="btn btn-primary btn-sm d-flex"
			style={{ background: 'green' }}
			disabled={disabledButton}
		>
			Zapisz
			<div className=" ms-1">
				<CheckLg />
			</div>
		</button>
	);
	const starteditButton = (
		<EditButton
			onClick={() => {
				setEditReport(true);
			}}
		/>
	);
	const reportButton = !editReport ? starteditButton : saveEditButton;
	const reportContent = editReport ? (
		<SurgeryReportForm onChange={onReportChange} value={report} />
	) : (
		<p>{report}</p>
	);

	const deleteButton = (
		<ModalEnableBtn
			id={'cancelSurgery'}
			className="btn btn-sm btn-danger"
			label={'Usuń'}
			onClick={() => {}}
			value={surgery?.SurgeryId}
			icon={undefined}
		/>
	);

	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Zabiegi', active: false, link: '/surgeries' },
							{
								label: 'Profil',
								active: true,
								link: '',
							},
						]}
					/>
				}
			>
				{}
			</UpperPageStripe>
			<div className="container">
				<Modal
					id={'cancelSurgery'}
					function={handleClick}
					label={'Czy na pewno?'}
				/>

				<div className="">
					<ServerErrorInfoComponenet serverError={serverError} />

					<div className="row justify-content-center">
						<div className="col-lg-4 ">
							<div className="card card-body shadow">
								<CardTtile label={'Głowne informacje'} />
								<ProfileDiv label={'Data'} value={surgery?.SurgeryDate} />
								<ProfileDiv label={'Rodzaj'} value={surgery?.SurgeryType} />
								<ProfileDiv
									label={'Weterynarz'}
									value={`${surgery?.Vet.Name} ${surgery?.Vet.LastName}`}
								/>

								<div className="row  mt-2">
									<div className="col-6">
										<p className=" ">{'Operowany'}</p>
									</div>
									<div
										className="col-6"
										onClick={() => {
											navigate(`/animals/${surgery?.Animal.AnimalId}`);
										}}
									>
										<label className="text-muted" style={{ color: 'black' }}>
											{surgery?.Animal.Name}
										</label>{' '}
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-8  m-lg-0">
							<div className="card card-body shadow  ">
								<CardTtile label="Opis" />
								<p className="">{surgery?.Description}</p>
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-lg-12 ">
							<div className="card card-body shadow">
								<div className="row w-50">
									<div className="col-2 pe-0">
										<CardTtile label="Raport" />
									</div>
									<div className="col-1 me-3 ps-0">
										{surgery?.LeadVetId == getCurrentUser().userId ||
										isManager()
											? reportButton
											: null}
									</div>
									<div className="col-1 ">
										{surgery?.LeadVetId == getCurrentUser().userId ||
										isManager()
											? surgery?.Report == '' || surgery?.Report == null
												? deleteButton
												: null
											: null}
									</div>
								</div>
								<div className="row ">
									<div className="col-12 ">{reportContent}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SurgeryProfile;
