export const floors = [
	{ value: -2, label: 'non indicato' },
	{ value: -1, label: 'seminterrato' },
	{ value: 0, label: 'piano terra' },
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
	{ value: 6, label: '6' },
	{ value: 7, label: '7' },
	{ value: 8, label: 'sopra il 7' },
	{ value: 9, label: 'ultimo' },
	{ value: 0.5, label: 'piano rialzato' },
	{ value: 11, label: 'su più livelli' },
];

export const tipologies = [
	{ value: ' ', label: 'Seleziona...', type: [1, 4] },
	{ value: 4, label: 'Appartamento', type: [1] },
	{ value: 23, label: 'Attività / Licenza comm', type: [4] },
	{ value: 31, label: 'Bar', type: [4] },
	{ value: 19, label: 'Capannone', type: [4] },
	{ value: 9, label: 'Casa Bi / Trifamiliare', type: [1] },
	{ value: 8, label: 'Casa indipendente', type: [1] },
	{ value: 36, label: 'Garage / Auto silos', type: [4] },
	{ value: 17, label: 'Garage / Box auto', type: [1] },
	{ value: 7, label: 'Immobile di prestigio', type: [1, 4] },
	{ value: 24, label: 'Laboratorio', type: [4] },
	{ value: 32, label: 'Locale commerciale', type: [4] },
	{ value: 35, label: 'Loft', type: [1] },
	{ value: 18, label: 'Magazzino', type: [4] },
	{ value: 20, label: 'Negozio', type: [4] },
	{ value: 40, label: 'Ristorante', type: [4] },
	{ value: 26, label: 'Show room', type: [4] },
	{ value: 15, label: 'Terratetto/Terracielo', type: [1] },
	{ value: 21, label: 'Ufficio', type: [4] },
	{ value: 12, label: 'Villa', type: [1] },
	{ value: 13, label: 'Villetta a schiera', type: [1] },
	{ value: 50, label: 'Attico/Mansarda', type: [1] },
];

export const energy = [
	{ value: 0, label: 'Non indicata', type: [0] },
	{ value: 997, label: 'DL 192 del 19/08/05', type: [0] },
	{ value: 1, label: 'A+', type: [997], className: 'aplus', selectedClassName: 'aplus-sel' },
	{ value: 2, label: 'A', type: [997], className: 'a', selectedClassName: 'a-sel' },
	{ value: 3, label: 'B', type: [997], className: 'b', selectedClassName: 'b-sel' },
	{ value: 4, label: 'C', type: [997], className: 'c', selectedClassName: 'c-sel' },
	{ value: 5, label: 'D', type: [997], className: 'd', selectedClassName: 'd-sel' },
	{ value: 6, label: 'E', type: [997], className: 'e', selectedClassName: 'e-sel' },
	{ value: 7, label: 'F', type: [997], className: 'f', selectedClassName: 'f-sel' },
	{ value: 8, label: 'G', type: [997], className: 'g', selectedClassName: 'g-sel' },
	{ value: 998, label: 'D.M. 26/06/2015', type: [0] },
	{ value: 12, label: 'A4', type: [998], className: 'a4', selectedClassName: 'a4-sel' },
	{ value: 13, label: 'A3', type: [998], className: 'a3', selectedClassName: 'a3-sel' },
	{ value: 14, label: 'A2', type: [998], className: 'a2', selectedClassName: 'a2-sel' },
	{ value: 15, label: 'A1', type: [998], className: 'a1', selectedClassName: 'a1-sel' },
	{ value: 16, label: 'B', type: [998], className: 'b', selectedClassName: 'b-sel' },
	{ value: 17, label: 'C', type: [998], className: 'c', selectedClassName: 'c-sel' },
	{ value: 18, label: 'D', type: [998], className: 'd', selectedClassName: 'd-sel' },
	{ value: 19, label: 'E', type: [998], className: 'e', selectedClassName: 'e-sel' },
	{ value: 20, label: 'F', type: [998], className: 'f', selectedClassName: 'f-sel' },
	{ value: 21, label: 'G', type: [998], className: 'g', selectedClassName: 'g-sel' },
	{ value: 11, label: 'Non Classificabile', type: [0] },
	{ value: 9, label: 'Esente', type: [0] },
	{ value: 10, label: 'In fase di richiesta', type: [0] },
];

export const heatingtype = [
	{ value: -1, label: 'n.i.' },
	{ value: 1, label: 'Nessuno' },
	{ value: 2, label: 'Autonomo' },
	{ value: 3, label: 'Centralizzato' },
	{ value: 4, label: 'Centr. contabilizz. individuale' },
];

export const emptyUnit = {
	balconyMq: null,
	bathNum: null,
	bodyCorporateFeesMin: null,
	bodyCorporateFeesMax: null,
	bodyCorporateFees: null,
	boxTypeId: -1,
	categoryTypeId: 1,
	listingDescIt: '',
	listingDescEn: '',
	listingDescFr: '',
	listingDescEs: '',
	listingDescDe: '',
	energyEfficiencyRatingId: null,
	energyEfficiencyValue: null,
	energyEfficiencyValueRenew: null,
	epiEnum: null,
	epeEnum: null,
	floorNum: -2,
	floorMin: null,
	floorMax: null,
	gardenTypeId: -1,
	hasBalcony: null,
	hasTerrace: null,
	hidePrice: null,
	inheritEnergyClassificationFromParent: true,
	isCubeMeters: null,
	isSold: false,
	isQuiteZeroEnergyeState: null,
	listingEnabled: true,
	numberOfUnits: 1,
	price: 0,
	priceMin: null,
	priceMax: null,
	propertyTypeId: 4,
	publisherListingId: '',
	roomNum: null,
	size: null,
	sizeMqMin: null,
	sizeMqMax: null,
	terraceMq: null,
};

export const priceRanges = [
	{ value: '', text: 'Seleziona...' },
	{ value: 50000, text: '50.000' },
	{ value: 100000, text: '100.000' },
	{ value: 150000, text: '150.000' },
	{ value: 200000, text: '200.000' },
	{ value: 250000, text: '250.000' },
	{ value: 300000, text: '300.000' },
	{ value: 350000, text: '350.000' },
	{ value: 400000, text: '400.000' },
	{ value: 450000, text: '450.000' },
	{ value: 500000, text: '500.000' },
	{ value: 550000, text: '550.000' },
	{ value: 600000, text: '600.000' },
	{ value: 650000, text: '650.000' },
	{ value: 700000, text: '700.000' },
	{ value: 750000, text: '750.000' },
	{ value: 800000, text: '800.000' },
	{ value: 850000, text: '850.000' },
	{ value: 900000, text: '900.000' },
	{ value: 950000, text: '950.000' },
	{ value: 1000000, text: '1.000.000' },
	{ value: 1250000, text: '1.250.000' },
	{ value: 1500000, text: '1.500.000' },
	{ value: 1750000, text: '1.750.000' },
	{ value: 2000000, text: '2.000.000' },
	{ value: 2500000, text: '2.500.000' },
	{ value: 3000000, text: '3.000.000' },
	{ value: 4000000, text: '4.000.000' },
	{ value: 5000000, text: '5.000.000' },
	{ value: 10000000, text: '10.000.000' },
];

export const mqRanges = [
	{ value: '', text: 'Seleziona...' },
	{ value: '20', text: '20' },
	{ value: '30', text: '30' },
	{ value: '40', text: '40' },
	{ value: '50', text: '50' },
	{ value: '60', text: '60' },
	{ value: '70', text: '70' },
	{ value: '80', text: '80' },
	{ value: '90', text: '90' },
	{ value: '100', text: '100' },
	{ value: '110', text: '110' },
	{ value: '120', text: '120' },
	{ value: '130', text: '130' },
	{ value: '140', text: '140' },
	{ value: '150', text: '150' },
	{ value: '160', text: '160' },
	{ value: '170', text: '170' },
	{ value: '180', text: '180' },
	{ value: '190', text: '190' },
	{ value: '200', text: '200' },
	{ value: '250', text: '250' },
	{ value: '300', text: '300' },
	{ value: '350', text: '350' },
	{ value: '400', text: '400' },
	{ value: '450', text: '450' },
	{ value: '500', text: '500' },
	{ value: '550', text: '550' },
	{ value: '600', text: '600' },
	{ value: '650', text: '650' },
	{ value: '700', text: '700' },
	{ value: '750', text: '750' },
	{ value: '800', text: '800' },
	{ value: '850', text: '850' },
	{ value: '900', text: '900' },
	{ value: '950', text: '950' },
	{ value: '1000', text: '1.000' },
	{ value: '1500', text: '1.500' },
	{ value: '2000', text: '2.000' },
	{ value: '2500', text: '2.500' },
	{ value: '3000', text: '3.000' },
	{ value: '3500', text: '3.500' },
	{ value: '4000', text: '4.000' },
	{ value: '4500', text: '4.500' },
	{ value: '5000', text: '5.000' },
	{ value: '5500', text: '5.500' },
	{ value: '6000', text: '6.000' },
	{ value: '6500', text: '6.500' },
	{ value: '7000', text: '7.000' },
	{ value: '7500', text: '7.500' },
	{ value: '8000', text: '8.000' },
	{ value: '8500', text: '8.500' },
	{ value: '9000', text: '9.000' },
	{ value: '9500', text: '9.500' },
	{ value: '10000', text: '10.000' },
];
