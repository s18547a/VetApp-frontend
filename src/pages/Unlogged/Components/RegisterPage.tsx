import OwnerRegister from '../../Owner/OwnerRegister/OwnerForm';

function RegisterPage({
	handleLoginFunction,
}: {
	handleLoginFunction: (any) => void;
}) {
	return <OwnerRegister handleLogin={handleLoginFunction} />;
}

export default RegisterPage;
