import { ReactElement, memo } from 'react';

import Vet from '../../classes/Vet';
import { spaceContact } from '../../utils/contactHelper';
import { getDefaultProfileImage } from '../../utils/imageHelper';

function VetChoiceComponent({
	handleVetChange,
	vetList,
	selected,
	error,
}: {
	handleVetChange: (any) => void;
	vetList: Vet[];
	selected: string | undefined;
	error: string;
}): ReactElement {
	function handleVetChangeFunction(e) {
		handleVetChange(e);
	}

	return (
		<div className=" form-group">
			<div className=" form-label">Weterynarz</div>

			<div className=" row">
				{vetList.map((vet) => {
					return (
						<div className="col-6" key={vet.VetId}>
							<div className="card">
								<img
									height={'150px'}
									src={
										vet.ProfileImage == null
											? getDefaultProfileImage()
											: vet.ProfileImage
									}
									className=" card-img-top"
								/>

								<div className=" card-body p-0 mt-2" style={{ height: '30px' }}>
									<div className=" card-title d-flex justify-content-center">
										<h6>{vet.Name + ' ' + vet.LastName}</h6>
									</div>
								</div>
								<ul className=" list-group list-group-flush">
									<li className="list-group-item">{`tel. ${spaceContact(
										vet.Contact
									)}`}</li>
									<li className="list-group-item ">
										<div className="row">
											{vet.VetId !== selected && (
												<button
													name={'VetId'}
													value={vet.VetId}
													onClick={handleVetChangeFunction}
													className=" btn btn-primary"
												>
													Wybierz
												</button>
											)}
											{vet.VetId === selected && (
												<button className=" btn btn-success">Wybrano</button>
											)}
										</div>
									</li>
								</ul>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default memo(VetChoiceComponent);
