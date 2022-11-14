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
    devise?: string;
    ville?: string | null;
    address?: string | null;
    descriptionSmall?: string | null;

    standing?: string | null;
    descriptionLong: string | null;
}
