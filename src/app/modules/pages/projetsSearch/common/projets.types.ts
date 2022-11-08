export interface Projet
{
    id: string;
    avatar?: string | null;
    background?: string | null;
    name: string;
    emails?: {
        email: string;
        label: string;
    }[];
    phoneNumbers?: {
        country: string;
        phoneNumber: string;
        label: string;
    }[];
    title?: string;
    company?: string;
    birthday?: string | null;
    address?: string | null;
    notes?: string | null;
    tags: string[];
}

