export interface UserKeycloak
{
    id?                 : string;
    username?           : string;
    createdTimestamp?   : number;
    enabled?            : boolean;
	emailVerified?      : boolean;
    firstName?          : string; // prénom
    lastName?           : string;
    email?              : string;
    attributes?         : Attributes;
    credentials?        : Credentiel[];
}


export interface Attributes
{
    cin?            : string[];
    telephone?      : string[];
    dateNaissance?  : string[];
    clientAWB?      : string[];
}

export interface Credentiel
{
    type: string;
	value: string;
	temporary: boolean;
}

export interface User
{
    id              : string;
    username        : string;
    createdTimestamp: number;
    enabled         : boolean;
	emailVerified   : boolean;
    firstName       : string; // prénom
    lastName        : string;
    email           : string;
    clientAWB?      : boolean;
    telephone?      : string;
    cin?            : string;
    dateNaissance?  : string;
    avatar?         : string;
    status?         : string;
}
