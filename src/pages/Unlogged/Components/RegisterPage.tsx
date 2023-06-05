import OwnerRegister from '../../Owner/OwnerForm/OwnerRegister';

function RegisterPage({
	handleLoginFunction,
}: {
	handleLoginFunction: (any) => void;
}) {
	return <OwnerRegister handleLogin={handleLoginFunction} />;
}

export default RegisterPage;
