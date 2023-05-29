import { Piece } from "app/core/upload-document/upload-document.types";

export interface Reclamation {
	id?              	: number;
	nom?             	: string;
	prenom?          	: string;
	cin?            	: string;
    // numeroDossier?  	: string;
    email?          	: string;
    telephone?      	: string | null;
	motif?          	: number;
	motifLibelle?      	: string;
	text	           	: string | null;
    statut?         	: string;
	canal?          	: number;
	initiateur?      	: string;
    dateReception  		: Date | null;
	// adresse?     	: string;
    // codeVille?   	: number | null;
	// ville?       	: string;
    // adressePostale?		: string;
    // telephoneDomicile?   : string | null;
	// telephoneBureau?     : string;
    // telephoneAutre?     	: string;
	pieces?				: Piece[];
	type				: string; // 'Reclamation' ou 'AlerteEthique'
}

export interface Motif {
	id					: number;
	libelle				: string;
	libelleselfcare		: string;
	username?			: string;
	entite?				: number;
	delaiRecevabilite?	: number;
	delaiTraitement?	: number;
	delaiTraitementAdd?	: number;
}

