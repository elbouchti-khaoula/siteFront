export interface CriterePersonnalisee
{
    montant             : number;
    duree               : number;
    cspCode             : string;
    nationaliteCode     : string;
    residentMarocain    : boolean;
    [param: string]     : string | number | boolean;
}

export interface SimulationPersonnalisee
{
    montant                     : number;
    duree                       : number;
    nbreAnnee?                  : number;
    nbreMois?                   : number;
    cspCode?                    : string;
    nationaliteCode?            : string;
    residentMarocain?           : boolean;

    // Résultat
    mensualiteMin               : number;
    totalInteretsMin?           : number;
    coutTotalMin?               : number;
    tauxMin?                    : number;

    mensualiteMax               : number;
    totalInteretsMax?           : number;
    coutTotalMax?               : number;
    tauxMax?                    : number;

    expertiseImmobiliere        : number;
    fraisDossier                : number;

    droitsEnregistrement        : number;
    conservationFonciere        : number;
    honorairesNotaire?          : number;
    fraisDivers?                : number;
    totalFrais?                 : number;
}
