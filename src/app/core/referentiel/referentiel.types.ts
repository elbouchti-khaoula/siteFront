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
    dagAgence: string | null;
}

export interface EnvoiMail {
    id?: number;
    type: string;
    destination: string | null;
    titre?: string | null;
    message: string | null;
    dateEnvoi?: Date | null;
    flagEnvoi?: number;
    erreur?: string | null;
}

export interface OperationSAVRef {
    operationId?: number;
    nomOperation?: string;
    codeOperation: string | null;
}
export interface EmployeursConventionnes
{
    code?       : string;
    libelle?    : string;
}
export interface PromoteursConventionnes
{
    code?       : string;
    libelle?    : string;
}

