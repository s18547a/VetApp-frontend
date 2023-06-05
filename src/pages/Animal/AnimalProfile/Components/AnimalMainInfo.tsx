import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Animal from '../../../../classes/Animal';
import Owner from '../../../../classes/Owner';
import EditButton from '../../../../components/Buttons/EditButton';
import { spaceContact } from '../../../../utils/contactHelper';
import { getDefaultProfileImage } from '../../../../utils/imageHelper';
import ProfileDiv from '../../../../components/Profile/ProfileDiv';
import CardTitleCompnenet from '../../../../components/General/CardTitle';

function AnimalProfile({
	animal,
	owner,
}: {
	animal: Animal | undefined;
	owner: Owner | undefined;
}): ReactElement {
	const navigate = useNavigate();

	return (
		<div className="row justify-content-center">
			<div className="col-lg-4 col-12">
				<div className=" card card-body border-0 shadow">
					<div className="row justify-content-center">
						<div className="col-12 ">
							<img
								className=" card-img-top"
								height="400px"
								width="350px"
								src={
									animal?.ProfileImage == null
										? getDefaultProfileImage()
										: animal.ProfileImage
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-6 col-sm-12 justify-content-center">
				<div className="row">
					<div className="col-10 mt-sm-3">
						<div className="row justify-content-center ">
							<div className="col-lg-12 col-10 card card-body border-0 shadow ms-5">
								<div className=" d-flex justify-content-start">
									<div className="">
										<CardTitleCompnenet label="Informacje główne" />
									</div>
									<div className=" ">
										<EditButton
											onClick={() =>
												navigate(`/animals/${animal?.AnimalId}/edit`, {
													state: { AnimalId: animal?.AnimalId },
												})
											}
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-12">
										<ProfileDiv label={'Imie'} value={animal?.Name} />
									</div>
									<div className="col-12">
										<ProfileDiv
											label={'Data urodzenia'}
											value={animal?.BirthDate}
										/>
									</div>
									<div className="col-12">
										<ProfileDiv
											label={'Rasa'}
											value={`${animal?.AnimalType?.Race},${animal?.AnimalType?.Family}`}
										/>
									</div>

									<div className="col-12">
										<ProfileDiv
											label={'Płeć'}
											value={
												animal?.Sex == 1
													? 'Samiec'
													: animal?.Sex == 2
													? 'Samica'
													: 'Nieokreślono'
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-8 mt-5">
						<div className=" row justify-content-center">
							<div className="col-lg-12 col-10 card card-body border-0 shadow ms-5">
								<CardTitleCompnenet label="Właściciel" />
								<div className="row">
									<div className="col-12">
										<ProfileDiv
											label={'Właściciel'}
											value={`${owner?.Name} ${owner?.LastName}`}
										/>
									</div>
									<div className="col-12">
										<ProfileDiv label={'Email'} value={owner?.Email} />
									</div>
									<div className="col-12">
										<ProfileDiv
											label={'Telefon'}
											value={spaceContact(owner?.Contact)}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AnimalProfile;
