export interface TableauAmortissement
{
    id: number;
    echeance?: number;
    amortissement: number;
    interetTTC: number;
    prestationsTTC: number;
    echeanceClientTTC: number;
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
