export interface CritereSimulation
{
    montant             : number;
    duree               : number;
    cspCode             : string;
    nationaliteCode     : string;
    residentMarocain    : boolean;
}

export interface SimulationPersonnalisee
{
    montant             : number;
    duree               : number;
    cspCode?            : string;
    nationaliteCode?    : string;
    residentMarocain?   : boolean;
    mensualite          : number;
    totalInterets       : number;
    coutTotal           : number;
    tauxMoyen?          : number;
    expertiseImmobiliere: number;
    fraisDossier        : number;
    droitsEnregistrement: number;
    conservationFonciere: number;
    honorairesNotaire   : number;
    fraisDivers         : number;
    totalFrais          : number;
}
