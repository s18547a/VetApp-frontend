import { XLg } from 'react-bootstrap-icons';
import ModalEnableCancelBtn from '../../../components/Modal/ModalEnableCancelBtn';

function ActivitiesTable({ medicalActivityList, setDeletedId }) {
	return (
		<table className=" table table-bordered">
			<thead>
				<tr>
					<th>Aktywność</th>
					<th>Opłata</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{medicalActivityList.map((activity) => {
					return (
						<tr
							id={activity.MedicalActivityId}
							key={activity.MedicalActivityId}
						>
							<td>{activity.ActivityName}</td>
							<td>{`${activity.Price} zł`}</td>
							<td>
								<div className="d-flex justify-content-center">
									<ModalEnableCancelBtn
										className={' '}
										id="act"
										onClick={() => {
											setDeletedId(activity.MedicalActivityId);
										}}
										value={activity.MedicalActivityId}
										icon={<XLg />}
									/>
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default ActivitiesTable;
