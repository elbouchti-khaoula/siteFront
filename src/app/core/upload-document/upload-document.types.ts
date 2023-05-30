export interface Piece {
	parent?					: number;
	id_projet?				: number;
	idReclamation?          : number;
	libelleDocument         : string;
	listFilesArray			: Fichier[];
}

export interface Fichier {
	ordre			: number;
	nom				: string | null;
	extension		: string | null; // MimeType
	binaire			: any;
	isImage?		: boolean;
	size?			: number;
}
