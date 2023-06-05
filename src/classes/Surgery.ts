import Animal from './Animal';
import Vet from './Vet';

class Surgery {
	SurgeryId: string;
	SurgeryDate: string;
	SurgeryType: string;
	LeadVetId: string;
	Description: string | null;
	AnimalId: string;

	Report: null | string;
	StartTime: string;
	Vet: Vet;
	Animal: Animal;
	constructor(
		SurgeryId: string,
		SurgeryDate: string,
		SurgeryType: string,
		LeadVetId: string,
		Description: string | null,
		AnimalId: string,
		Report: null | string,
		StartTime: string,

		Vet: Vet,
		Animal: Animal
	) {
		this.SurgeryId = SurgeryId;
		this.SurgeryDate = SurgeryDate;
		this.SurgeryType = SurgeryType;
		this.LeadVetId = LeadVetId;
		this.Description = Description;
		this.AnimalId = AnimalId;
		this.Report = Report;
		this.StartTime = StartTime;
		this.Vet = Vet;
		this.Animal = Animal;
	}
}

export default Surgery;
