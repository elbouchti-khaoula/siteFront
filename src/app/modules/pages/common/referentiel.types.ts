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

