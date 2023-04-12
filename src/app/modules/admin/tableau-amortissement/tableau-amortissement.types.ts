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

export interface TableauAmortissementPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}
