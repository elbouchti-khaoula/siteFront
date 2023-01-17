export interface Projet {
    id: string;
    nom: string;
    images?: {
        chemin: string | null;
        classement?: number;
        typePhoto?: number;
    }[];
    promoteur?: {
        nom: string | null;
        logoPath: string | null;
    }
    typeBien?: string | null;
    contact?: string | null;
    telephone?: string | null;
    email?: string | null;
    statut?: string | null;
    prixMin?: string | null;
    prixMax?: string | null;
    devise?: string | null;
    quartier?: string | null;
    ville?: string | null;
    villeLibelle?: string | null;
    adresse?: string | null;
    descriptionSmall?: string | null;
    standing?: string | null;
    superficieMin?: string | null;
    superficieMax?: string | null;
    disponibilites?: string | null;
    description?: string | null;
    dateCreation?: Date | null;
    dateModification?: Date | null;
    agent?: string | null;
    classement?: number;
    gpsLatitude?: number;
    gpsLongitude?: number;
}

//"superficies": "De 285mÃ‚Â² ÃƒÂ  614mÃ‚Â²",
//"etat": 1, ?? aziz
