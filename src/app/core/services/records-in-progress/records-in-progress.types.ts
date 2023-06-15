export interface DemandeCredit {
    beneficiare?        : string;
    mtProjet?           : number;
    initiateur          : string | null;
    dateCreation?       : Date;
    statut?             : string;
    dateStatut?         : Date;
    phase               : string | null;
    nprojet?            : number;
    ndossier?           : string;
}

export interface CreditEnCours {
    id              : number;
    montant         : number;
    mensuaite       : number;
    crd             : number;
    dureeRestante   : number;
    duree           : number;
    impayes         : number;
    statut          : string;
    dateCredit      : Date;
    statutAS        : number;

    existeImpaye?   : boolean;
    estCTX?         : boolean;
    estEchu?        : boolean;
}


export enum TypeDocument {
    // « 0WFSTABL » : Tableau d’amortissement.
    // « 0WFIARRSIT » : Arrête de situation.
    // « 0WFSFICHE » : Attestation d’intérêt.
    // « MLV » : Main levée  
    TableauAmortissement,
    ArreteSituation,
    AttestationInteret,
    MainLevee,
}