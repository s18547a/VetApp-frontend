import PageNavigationComponent from '../../../components/Navigation/PageNavigation/PageNavigationComponent';

function HomePageNavigation({
	selectedTab,
	changeTab,
}: {
	selectedTab: string;
	changeTab: (any) => void;
}) {
	return (
		<div
			className=" bg-white   justify-content-center shadow mb-5"
			style={{ width: '100%' }}
		>
			<div className="me-5 ">
				<PageNavigationComponent
					buttons={[
						{ value: 'login', label: 'Logowanie' },
						{ value: 'sch', label: 'Godziny otwarcia' },
						{ value: 'register', label: 'Rejestracja' },
					]}
					selectedTab={selectedTab}
					onChange={changeTab}
				/>
			</div>
		</div>
	);
}

export default HomePageNavigation;
