export interface CritereSimulation
{
    montant             : number;
    cspCode             : string;
    residentMarocain    : boolean;
    duree               : number;
}

export interface SimulationPersonnalisee
{
    montant             : number;
    cspCode?            : string;
    residentMarocain?   : boolean;
    duree               : number;
    mensualite          : number;
    tauxMoyen?          : number;
    totalInterets       : number;
    coutTotal           : number;
    expertiseImmobiliere: number;
    fraisDossier        : number;
    droitsEnregistrement: number;
    conservationFonciere: number;
    honorairesNotaire   : number;
    fraisDivers         : number;
    totalFrais          : number;


}
