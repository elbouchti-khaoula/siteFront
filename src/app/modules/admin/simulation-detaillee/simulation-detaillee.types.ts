export interface CritereDetaillee {
    provenance: string; //"provenance": "SITE"
    type: string; //"type": "personnePhysique"
    codeApporteur: string; //"codeApporteur": "100"
    codeUtilisateur: string; //"codeUtilisateur": "WEB"
    objetFinancement: string;
    montant: number;
    montantProposition: number;
    duree: number;
    typeTaux: string;
    nomPromoteur: string;
    // statutProjet: string;
    tiers: {
        nom: string;
        prenom: string;
        categorieSocioProfessionnelle: string;
        numIdentite?: string;
        residantMaroc: boolean;
        nationalite: string;
        segment: string; //"segment": "NV";
        dateNaissance: string;
        salaire: string;
        autresRevenus: string;
        creditsEnCours: string;
        telephone: string;
        email: string;
        nomEmployeur: string;
    }
}

export interface SimulationDetaillee {
    id: number;
    montant?: number;
    montantProposition: number;
    duree: number;
    nbreAnnee?: number;
    nbreMois?: number;
    statut?: string;

    dossierId?: number;
    dossierMontant?: number;
    dossierDuree?: number;

    mensualite: number;
    tauxNominal?: number;
    tauxEffectifGlobal: number;
    tauxParticipation: number;
    assurances: number;
    totalInterets: number;
    coutTotal: number;
    fraisDossier: number;
    expertiseImmobiliere: number;

    // frais
    droitsEnregistrement: number;
    conservationFonciere: number;
    honorairesNotaire   : number;
    fraisDivers         : number;
    totalFrais?         : number;
}
