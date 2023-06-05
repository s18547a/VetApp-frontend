import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Vet from '../../../../classes/Vet';
import EditButton from '../../../../components/Buttons/EditButton';
import CardTtile from '../../../../components/General/CardTitle';
import ProfileDiv from '../../../../components/Profile/ProfileDiv';
import { getCurrentUser } from '../../../../utils/authHelper';
import { spaceContact } from '../../../../utils/contactHelper';

import VetSchedulde from './VetSchedulde';
import { getDefaultProfileImage } from '../../../../utils/imageHelper';

function VetProfileMain({
	types,
	vet,
	vetId,
	setServerError,
}: {
	types: any[];
	vet: Vet;
	vetId: string | undefined;
	setServerError: (any) => void;
}): ReactElement {
	const specString = (): string => {
		let specString: string = '';
		types.forEach((type, index) => {
			if (index == types.length - 1) {
				specString = specString + type.VetType;
			} else {
				specString = specString + type.VetType + ', ';
			}
		});

		return specString;
	};
	const navigate = useNavigate();

	return (
		<div className="row justify-content-center">
			<div className="col-lg-3 col-12  mt-sm-3">
				<div className=" card card-body border-0 shadow">
					<img
						height="250px"
						width="250px"
						className=" card-img-top"
						src={
							vet.ProfileImage == null
								? getDefaultProfileImage()
								: vet.ProfileImage
						}
					/>
				</div>
			</div>

			<div className=" col-lg-4  col-12 mt-sm-3">
				<div className=" card card-body shadow ">
					<div className=" mb-3 d-flex justify-content-start">
						<CardTtile label="Informacje główne" />

						<div className="">
							<EditButton
								onClick={() =>
									navigate(`/vets/${vet?.VetId}/edit`, {
										state: { VetId: vet?.VetId },
									})
								}
							/>
						</div>
					</div>

					<div className="d-flex flex-column">
						<ProfileDiv label={'Imie'} value={vet.Name} />
						<ProfileDiv label={'Nazwisko'} value={vet.LastName} />
						<ProfileDiv label={'Kontakt'} value={spaceContact(vet.Contact)} />
						<ProfileDiv label={'Email'} value={vet.Email} />
						<ProfileDiv label={'Zatrudniono'} value={vet.HireDate} />
						<ProfileDiv label={'Specjalizacje'} value={specString()} />
					</div>
				</div>
			</div>

			<div className="col-lg-3 col-12  mt-sm-3">
				<VetSchedulde
					VetId={vetId == undefined ? getCurrentUser().userTypeId : vetId}
					setServerError={setServerError}
				/>
			</div>
		</div>
	);
}

export default VetProfileMain;
