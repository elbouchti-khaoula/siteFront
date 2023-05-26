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
