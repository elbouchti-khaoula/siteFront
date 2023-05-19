export interface TableauAmortissement
{
    numEcheance?: number;
    amortissement: number;
    interet: number;
    assurance: number;
    cotisation: number;
    echeanceClient: number;
    echeanceParticipant: number;
    crd?: number;
}
