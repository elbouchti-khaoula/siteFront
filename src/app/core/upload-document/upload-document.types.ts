export interface Piece {
	parent?					: number;
	id_projet?				: number;
	// id_dossier?				: number;
	// id_Tiers?				: number;
	idReclamation?          : number;
	libelleDocument         : string;
	listFilesArray			: Fichier[];
}

export interface Fichier {
	ordre			: number;
	nom				: string | null;
	extension		: string | null; // MimeType
	binaire			: any;
	data?			: any;
	isImage?		: boolean;
	size?			: number;
}

export interface PayloadUpload {
	idProjet?		: number;
	idReclamation?	: number;
    libelleDocument	: string | null;
    link			: string | null;
    message			: string | null;
}