export interface Reclamation {
	id              : number;
	nom             : string;
	prenom          : string;
	cin?            : string;
    numeroDossier?  : string;
    email?          : string;
    telephone?      : string | null;
	// adresse?     	: string;
    // codeVille?   	: number | null;
	// ville?       	: string;
	motif?          : number;
	text?           : string | null;
    statut?         : string;
	canal?          : number;
	initiateur      : string;
    dateReception?  : Date | null;
    // adressePostale?      : string;
    // telephoneDomicile?   : string | null;
	// telephoneBureau?     : string;
    // telephoneAutre?     	: string;
	pieces			: Piece[];
}

export interface Motif {
	id: number;
	libelle: string;
	libelleselfcare: string;
	username: string;
	entite: number;
	delaiRecevabilite: number;
	delaiTraitement: number;
	delaiTraitementAdd: number;
}

export interface Piece {
	id              : number;
	libelle         : string;
	parent			: number;
	file			: string | null;
	fileName		: string;
}
