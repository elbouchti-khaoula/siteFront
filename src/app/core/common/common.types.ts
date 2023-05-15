export interface Piece {
	id              : number;
	libelle         : string;
	parent			: number;
	files			: Fichier[];
}

export interface Fichier {
	fileIndex		: number;
	fileName		: string | null;
	fileExtension	: string | null;
	fileContent		: string | null;
	isImage			: boolean;
	size			: number;
}
