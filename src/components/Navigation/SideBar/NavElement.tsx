import { ReactElement, useEffect, useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
interface elementType {
	label: string;
	link: string;
	icon: any;
}

function NavElement(props: {
	id: string;
	label: string;
	mainLink: string;
	elements: elementType[];
}): ReactElement {
	return (
		<div className="  border-bottom ">
			<li>
				<a
					className="text-decoration-none btn btn-toogle rounded collapsed d-flex justify-content-between align-items-baseline"
					role={'button'}
					data-bs-toggle="collapse"
					data-bs-target={'#' + props.id}
					aria-expanded="false"
				>
					<label className={' text-black lead'}>{props.label}</label>
					<ChevronDown />
				</a>
			</li>

			<ul id={props.id} className={'collapse p-0'} data-parent="#accordion">
				{props.elements.map((element) => {
					return (
						<li className="" key={element.label}>
							<a
								className={
									'  text-decoration-none btn btn-group-toggle d-flex align-items-center  text-secondary '
								}
								href={element.link}
							>
								<div className="">{element.icon}</div>

								<label className=" ms-2">{element.label}</label>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default NavElement;
