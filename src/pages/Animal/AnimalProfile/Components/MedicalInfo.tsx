import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimalMedicalInfo from '../../../../classes/AnimalMedicalInfo';
import EditButton from '../../../../components/Buttons/EditButton';
import CardTitleCompnenet from '../../../../components/General/CardTitle';
import ProfileDiv from '../../../../components/Profile/ProfileDiv';
import { isManager, isVet } from '../../../../utils/userType';

function MedicalInfo({
	animalId,
	medicalInfo,
}: {
	animalId: string | undefined | null;
	medicalInfo: AnimalMedicalInfo | undefined;
}) {
	const navigate = useNavigate();

	const showBtn =
		isManager() || isVet() ? (
			<div className="row mb-1">
				<div className="col-1">
					<EditButton
						onClick={() => {
							navigate(`/animals/${animalId}/medicalInfo/edit`, {
								state: { medicalInfo: medicalInfo },
							});
						}}
					/>
				</div>
			</div>
		) : null;

	return (
		<div className="container row justify-content-center">
			<div className="col-lg-8">
				<div className="container  border-0 ">
					<div className="row">
						<div className="col-12">
							<div className="card card-body pb-0 shadow">
								<div className=" d-flex">
									<CardTitleCompnenet label="Karta zdrowotna" />
									{showBtn}
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-3">
							<div className="list-group shadow" id="list-tab" role="tablist">
								<a
									className="list-group-item list-group-item-action active"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#General"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Ogólne</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-home-list"
									data-bs-toggle="list"
									href="#Muscular"
									role="tab"
									aria-controls="list-home"
								>
									<h6>Układ mięśniowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-profile-list"
									data-bs-toggle="list"
									href="#Nervous"
									role="tab"
									aria-controls="list-profile"
								>
									<h6>Układ nerwowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-messages-list"
									data-bs-toggle="list"
									href="#Skeletal"
									role="tab"
									aria-controls="list-messages"
								>
									<h6>Układ szkieletowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Endocrine"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ hormonalny</h6>
								</a>

								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Cardiovascular"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ krążeniowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Lymphatic"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ limfatyczny</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Reproductive"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ rozrodczy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Respiratory"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ oddechowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Digestive"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ trawienny</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Urinary"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ wydalniczy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Optical"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ optyczny</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Derma"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Dermatologia</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Other"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Inne</h6>
								</a>
							</div>
						</div>
						<div className="col-9 card card-body shadow">
							<div className="tab-content" id="nav-tabContent">
								<div
									className="tab-pane fade show active"
									id="General"
									role="tabpanel"
									aria-labelledby="list-home-list"
								>
									<table className="table table-bordered">
										<thead>
											<tr>
												<th>Informacja</th>
												<th>Stan</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Waga</td>
												<td>{medicalInfo?.Weight}</td>
											</tr>
											<tr>
												<td>Chip</td>
												<td>{medicalInfo?.Chipped == true ? 'Tak' : 'Nie'}</td>
											</tr>
											<tr>
												<td>Steryzlizacja</td>
												<td>
													{medicalInfo?.Sterilized == true ? 'Tak' : 'Nie'}
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div
									className="tab-pane fade  "
									id="Muscular"
									role="tabpanel"
									aria-labelledby="list-home-list"
								>
									<p>{medicalInfo?.Muscular}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Nervous"
									role="tabpanel"
									aria-labelledby="list-profile-list"
								>
									<p>{medicalInfo?.Nervous}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Skeletal"
									role="tabpanel"
									aria-labelledby="list-messages-list"
								>
									<p>{medicalInfo?.Skeletal}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Endocrine"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Endocrine}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Cardiovascular"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Cardiovascular}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Lymphatic"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Cardiovascular}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Reproductive"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Reproductive}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Respiratory"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Respiratory}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Digestive"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Digestive}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Urinary"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Urinary}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Optical"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Optical}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Derma"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Dermalogical}</p>
								</div>
								<div
									className="tab-pane fade"
									id="Other"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									<p>{medicalInfo?.Others}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MedicalInfo;
