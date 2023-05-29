export interface CategorieSocioProfessionnelle
{
    code?       : string;
    libelle?    : string;
}

export interface Nationalite
{
    code?       : string;
    libelle?    : string;
}

export interface ObjetFinancement
{
    code?       : string;
    libelle?    : string;
}

export interface TypeBien {
    code?       : string;
    libelle?    : string;
}

export interface Ville {
    codeVille?  : number;
    description?: string;
}

export interface Quartier {
    code?       : number;
    codeVille?  : number;
    libelle?    : string;
}

export interface Agence {
    id: number;
    nom: string;
    code: string | null;
    adresse?: string | null;
    telephone?: string | null;
    fax?: string | null;
    gpsLatitude?: number;
    gpsLongitude?: number;
	codeVille?: number | null;
    libelleVille?: string | null;
    image: string | null;
}

export interface DocumentInstitutionnel {
    id?: number;
    periode?: string;
    type: string | null;
    titre?: string | null;
    chemin?: string | null;
    nom?: string | null;
   // dateCreation?: Date | null;
}
