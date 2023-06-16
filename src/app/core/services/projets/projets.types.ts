export interface Projet {
    id: number;
    nom?: string;
    description?: string | null;
    descriptionSmall?: string | null;
    adresse?: string | null;
    gpsLatitude?: number;
    gpsLongitude?: number;
    agence?: string | null;
    // contact promoteur
    contact?: string | null;
    telephone?: string | null;
    email?: string | null;

    statut?: string | null;
    standing?: string | null;

    devise?: string | null;
    prixMin?: number;
    prixMax?: number;
    prixMinStr?: string;
    prixMaxStr?: string;
    superficieMin?: number;
    superficieMax?: number;
    nombreChambresMin?: number;
    nombreChambresMax?: number;
    nombreBiens?: number;
    classement?: number;

    codeTypeBien?: string | null;
    codeQuartier?: number | null;
    codeVille?: number | null;
    libelleVille?: string | null;
    libelleTypeBien?: string | null;
    libelleQuartier?: string | null;

    dateLivraison?: Date | null;
    dateCreation?: Date | null;
    dateModification?: Date | null;

    medias?: Media[];
    // medias1?: Media[];

    promoter?: Promoteur;

    estFavoris?: boolean;
}

export interface Media {
    id?: number;
    chemin: string | null;
    classement?: number;
    type?: string;
}

export interface Promoteur {
    id: number;
    code: string | null;
    nom: string | null;
    logo: string | null;
    logoPath: string | null;
    extensionLogo: string | null;
}

export interface ProjetFavori {
    id?: number;
    userName?: string;
    userEmail: string | null;
    statutFavorite?: string;  // 'ENCOURS' ou 'PURGE'
    realEstateProject?: Projet;
    dateCreation?: Date | null;
    datePurge?: Date | null;
}

