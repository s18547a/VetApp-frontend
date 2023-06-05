import { ReactElement } from 'react';

interface PageNavType {
	value: string;
	label: string;
}

function PageNavigationComponent({
	buttons,
	onChange,
	selectedTab,
}: {
	buttons: PageNavType[];
	onChange: (any) => void;
	selectedTab: string;
}): ReactElement {
	return (
		<ul
			className=" list-unstyled d-flex justify-content-center  "
			style={{ width: '100%', height: '100%' }}
		>
			{buttons.map((navElement) => {
				return (
					<li className="  " key={navElement.label}>
						<button
							className={
								selectedTab == navElement.value
									? 'text-decoration-none btn bg-primary text-white '
									: 'text-decoration-none btn  text-secondary '
							}
							value={navElement.value}
							onClick={onChange}
							style={{
								borderRadius: 0,
								fontWeight: '300',
								fontSize: '17.5px',
								height: '100%',
							}}
						>
							{navElement.label}
						</button>
					</li>
				);
			})}
		</ul>
	);
}

export default PageNavigationComponent;
