export interface CritereDemandeSAV {
    codeOperation: string;
    dossierId: number;
    mode: string;
    cin: string;
    mail: string;
    motifRemboursement: string;
    origineFonds: string;
}

export interface DemandeSAV {
    demandeSavId: number;
    codeOperation: string;
    dossierId: number;
    dateCreation: Date;
    statut: string;
    cin: string;
    mail: string;
    mode: string;
    userId: number;
    motifRemboursement: string;
    origineFonds: string;
}