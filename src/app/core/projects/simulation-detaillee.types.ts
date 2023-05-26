export interface CritereDetaillee {
    id?: number;
    provenance: string;         // provenance: "SITE"
    type: string;               // type: "personnePhysique"
    codeApporteur: string;      // codeApporteur: "100"
    codeUtilisateur: string;    // codeUtilisateur: "WEB"
    objetFinancement: string;
    montant: number;
    montantProposition: number;
    duree: number;
    typeTaux: string;
    nomPromoteur: string;
    infine?: boolean;
    tiers: {
        nom: string;
        prenom: string;
        categorieSocioProfessionnelle: string;
        // numIdentite?: string;
        residantMaroc: boolean;
        nationalite: string;
        segment: string;        // segment: "NV";
        dateNaissance: string;
        salaire: number;
        autresRevenus: number;
        salaireEtAutresRevenus?: number;
        creditsEnCours: number;
        telephone: string;
        email: string;
        nomEmployeur: string;
        // proprietaireMaroc?: boolean;
        // capital?: number;
    }
}

export interface SimulationDetaillee {

    codeApporteur?                  : string;
    codeUtilisateur?                : string;

    // Mon profil
    nom?                            : string;
    prenom?                         : string;
    telephone?                      : string;
    email?                          : string;
    dateNaissance?                  : string;
    nationalite?                    : string;
    residantMaroc?                  : boolean;
    // ma situation
    categorieSocioProfessionnelle?  : string;
    nomEmployeur?                   : string;
    salaire?                        : number;
    autresRevenus?                  : number;
    creditsEnCours?                 : number;
    // Mon projet
    objetFinancement?               : string;
    nomPromoteur?                   : string;
    statutProjet?                   : string;
    typeTaux?                       : string;

    // résultat
    id                              : number;
    montant?                        : number;
    montantProposition              : number;
    duree                           : number;
    tauxNominalPondere              : number;
    tauxEffectifGlobalPondere       : number;
    tauxAssurancePondere            : number;
    tauxInteretsClientTtc           : number;
    statut?                         : string;
    dossiers                        : Dossier[];

    // frais
    droitsEnregistrement            : number;
    conservationFonciere            : number;
    honorairesNotaire               : number;
    fraisDivers                     : number;
    totalFrais?                     : number;

    newSimulation?                  : boolean;
}

export interface Project
{
    id                          : number;
    montant?                    : number;
    montantProposition          : number;
    duree                       : number;
    statut?                     : string;
    tauxNominalPondere?         : number;
    tauxEffectifGlobalPondere   : number;
    tauxAssurancePondere        : number;
    tauxInteretsClientTtc       : number;
    dossiers                    : Dossier[];
    fraisAnnexes                : FraisAnnexes
}

export interface Dossier {
    id                      : number;
    montant                 : number;
    duree                   : number;
    echeance                : number;
    tauxNominal             : number;
    tauxEffectifGlobal      : number;
    tauxParticipation       : number;
    assurances              : number;
    totalInterets           : number;
    coutTotal               : number;
    fraisDossier            : number;
    expertiseImmobiliere    : number;
    nbreAnnee?              : number;
    nbreMois?               : number;
}

export interface FraisAnnexes {
    enregistrementHypothecaire  : number;
    conservationFonciere        : number;
    honorairesNotaire           : number;
    fraisDossier                : number;
    coutTotal?                  : number;
}