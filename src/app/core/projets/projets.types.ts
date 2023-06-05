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

    medias?: {
        id?: number;
        chemin: string | null;
        classement?: number;
        type?: number;
    }[];
    promoter?: {
        id: number;
        code: string | null;
        nom: string | null;
        logo: string | null;
        logoPath: string | null;
        extensionLogo: string | null;
    }

    estFavoris?: boolean;
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

