import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VetApiCalls } from '../../../../apiCalls/vetApiCalls';
import EditButton from '../../../../components/Buttons/EditButton';
import CardTitleCompnenet from '../../../../components/General/CardTitle';
import { isManager } from '../../../../utils/userType';

interface ScheduldeI {
	Monday: string | null | undefined;
	Tuesday: string | null | undefined;
	Wednesday: string | null | undefined;
	Thursday: string | null | undefined;
	Friday: string | null | undefined;
	Saturday: string | null | undefined;
	Sunday: string | null | undefined;
}

function VetSchedulde({
	VetId,
	setServerError,
}: {
	VetId: string;
	setServerError: (any) => void;
}) {
	const vetApiCalls = new VetApiCalls();
	const [schedulde, setSchedulde] = useState<ScheduldeI>({
		Monday: '',
		Tuesday: '',
		Wednesday: '',
		Thursday: '',
		Friday: '',
		Saturday: '',
		Sunday: '',
	});
	const navigate = useNavigate();
	useEffect(() => {
		const loadVetSchedulde = async () => {
			try {
				const response = await vetApiCalls.getVetSchedulde(VetId);
				if (response) {
					if (response.status == 200) {
						setSchedulde(await response.json());
					}

					if (response.status == 404) {
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
				console.log(error);
			}
		};
		loadVetSchedulde();
	}, []);

	return (
		<div className="contianer card card-body shadow ">
			<div className="row">
				<div className="col-12">
					<div className="d-flex justify-content-start">
						<CardTitleCompnenet label="Grafik" />
						<div className="">
							{isManager() ? (
								<EditButton
									onClick={() => {
										navigate(`/vets/${VetId}/schedulde/edit`);
									}}
								/>
							) : null}
						</div>
					</div>
				</div>

				<div className="col-12 mt-2">
					<div className="row">
						<div className="col-5">
							<label>Poniedziałek</label>
						</div>
						<div className="col-7">
							<label>
								{schedulde.Monday == null ? 'Nie pracuje' : schedulde.Monday}
							</label>
						</div>
					</div>
				</div>

				<div className="col-12 mt-2">
					<div className="row">
						<div className="col-5">
							<label>Wtorek</label>
						</div>
						<div className="col-7">
							<label>
								{schedulde.Tuesday == null ? 'Nie pracuje' : schedulde.Tuesday}
							</label>
						</div>
					</div>
				</div>

				<div className="col-12 mt-2">
					<div className="row">
						<div className="col-5">
							<label>Środa</label>
						</div>
						<div className="col-7">
							<label>
								{schedulde.Wednesday == null
									? 'Nie pracuje'
									: schedulde.Wednesday}
							</label>
						</div>
					</div>
				</div>

				<div className="col-12 mt-2">
					<div className="row">
						<div className="col-5">
							<label>Czwartek</label>
						</div>
						<div className="col-7">
							<label>
								{schedulde.Thursday == null
									? 'Nie pracuje'
									: schedulde.Thursday}
							</label>
						</div>
					</div>
				</div>

				<div className="col-12 mt-2">
					<div className="row">
						<div className="col-5">
							<label>Piątek</label>
						</div>
						<div className="col-7">
							<label>
								{schedulde.Friday == null ? 'Nie pracuje' : schedulde.Friday}
							</label>
						</div>
					</div>
				</div>

				<div className="col-12 mt-2">
					<div className="row">
						<div className="col-5">
							<label>Sobota</label>
						</div>
						<div className="col-7">
							<label>
								{schedulde.Saturday == null
									? 'Nie pracuje'
									: schedulde.Saturday}
							</label>
						</div>
					</div>
				</div>

				<div className="col-12 mt-2">
					<div className="row">
						<div className="col-5">
							<label>Niedziela</label>
						</div>
						<div className="col-7">
							<label>
								{schedulde.Sunday == null ? 'Nie pracuje' : schedulde.Sunday}
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetSchedulde;
