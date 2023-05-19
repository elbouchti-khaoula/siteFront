export interface User
{
    id              : string;
    userName        : string;
    firstName       : string; // prénom
    lastName        : string;
    email           : string;
    clientAWB?      : boolean;
    telephone?      : string;
    cin?            : string
    dateNaissance?  : string;
    statut?         : string; // abonne ou client

    avatar?         : string;
    status?         : string;
}
