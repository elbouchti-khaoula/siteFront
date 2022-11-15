export interface Projet {
    id: string;
    name: string;
    images?: {
        chemin: string;
    }[];
    promoteur: {
        name: string;
        logo: string;
    }
    statut?: string;
    prixMin?: string;
    prixMax?: string;
    devise?: string;
    ville?: string | null;
    address?: string | null;
    descriptionSmall?: string | null;

    standing?: string | null;
    superficieMin?: string | null;
    superficieMax?: string | null;
    disponibilite?: string | null;
    descriptionLong: string | null;
}
