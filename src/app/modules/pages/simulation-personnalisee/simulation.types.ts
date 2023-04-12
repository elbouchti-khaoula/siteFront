export interface CriterePersonnalisee
{
    montant             : number;
    duree               : number;
    cspCode             : string;
    nationaliteCode     : string;
    residentMarocain    : boolean;
    [param: string]: string | number | boolean;
}

export interface SimulationPersonnalisee
{
    montant             : number;
    duree               : number;
    nbreAnnee?          : number;
    nbreMois?           : number;
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
