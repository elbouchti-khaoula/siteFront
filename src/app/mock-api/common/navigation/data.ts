/* eslint-disable */
/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'landing',
        title: 'Accueil',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/landing'
    },
    {
        id   : 'projets-search',
        title: 'Recherche de bien',
        type : 'basic',
        icon : 'heroicons_outline:search-circle',
        link : '/projets-search'
    },
    {
        id   : 'simulation-personnalisee',
        title: 'Simulation personnalisée',
        type : 'basic',
        icon : 'heroicons_outline:calculator',
        link : '/simulation-personnalisee'
    },
    {
        id   : 'nous-connaitre',
        title: 'Nous connaitre',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nous-connaitre'
    },
    {
        id   : 'nos-conventions',
        title: 'Nos conventions',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : '/nos-conventions'
    },
    {
        id   : 'darrahetbal',
        title: 'Multimédia',
        type : 'basic',
        icon : 'heroicons_outline:film',
        link : '/darrahetbal'
    },
    {
        id   : 'support',
        title: 'Contactez-nous',
        type : 'basic',
        icon : 'heroicons_outline:support',
        link : '/nous-contacter'
    },
    {
        id   : 'reclamation',
        title: 'Reclamation en ligne',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        link : '/reclamation'
    },
    {
        id   : 'agences',
        title: 'Localiser une agence',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/agences'
    },
    {
        id   : 'espace-connecte',
        title: 'Espace connecté',
        type : 'collapsable',
        icon : 'heroicons_outline:user-group',
        link : '/espace-connecte',
        children: [
            {
                id        : 'espace-connecte.home',
                title     : 'Home',
                type      : 'basic',
                link      : '/espace-connecte',
                exactMatch: true
            },
            {
                id   : 'espace-connecte.simulation-detaillee',
                title: 'Simulation détaillée',
                type : 'basic',
                link : '/espace-connecte/simulation-detaillee'
            },
            {
                id   : 'espace-connecte.mes-simulations',
                title: 'Mes simulations',
                type : 'basic',
                link : '/espace-connecte/mes-simulations'
            }
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'landing',
        title: 'Accueil',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/landing'
    },
    {
        id   : 'projets-search',
        title: 'Recherche de bien',
        type : 'basic',
        icon : 'heroicons_outline:search-circle',
        link : '/projets-search'
    },
    {
        id   : 'simulation-personnalisee',
        title: 'Simulation personnalisée',
        type : 'basic',
        icon : 'heroicons_outline:calculator',
        link : '/simulation-personnalisee'
    },
    {
        id   : 'nous-connaitre',
        title: 'Nous connaitre',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nous-connaitre'
    },
    {
        id   : 'nos-conventions',
        title: 'Nos conventions',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : '/nos-conventions'
    },
    {
        id   : 'darrahetbal',
        title: 'Multimédia',
        type : 'basic',
        icon : 'heroicons_outline:film',
        link : '/darrahetbal'
    },
    {
        id   : 'support',
        title: 'Contactez-nous',
        type : 'basic',
        icon : 'heroicons_outline:support',
        link : '/nous-contacter'
    },
    {
        id   : 'reclamation',
        title: 'Reclamation en ligne',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        link : '/reclamation'
    },
    {
        id   : 'agences',
        title: 'Localiser une agence',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/agences'
    },
    {
        id   : 'espace-connecte',
        title: 'Espace connecté',
        type : 'collapsable',
        icon : 'heroicons_outline:user-group',
        link : '/espace-connecte',
        children: [
            {
                id        : 'espace-connecte.home',
                title     : 'Home',
                type      : 'basic',
                link      : '/espace-connecte',
                exactMatch: true
            },
            {
                id   : 'espace-connecte.simulation-detaillee',
                title: 'Simulation détaillée',
                type : 'basic',
                link : '/espace-connecte/simulation-detaillee'
            },
            {
                id   : 'espace-connecte.mes-simulations',
                title: 'Mes simulations',
                type : 'basic',
                link : '/espace-connecte/mes-simulations'
            }
        ]
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'landing',
        title: 'Accueil',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/landing'
    },
    {
        id   : 'projets-search',
        title: 'Recherche de bien',
        type : 'basic',
        icon : 'heroicons_outline:search-circle',
        link : '/projets-search'
    },
    {
        id   : 'simulation-personnalisee',
        title: 'Simulation personnalisée',
        type : 'basic',
        icon : 'heroicons_outline:calculator',
        link : '/simulation-personnalisee'
    },
    {
        id   : 'nous-connaitre',
        title: 'Nous connaitre',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nous-connaitre'
    },
    {
        id   : 'nos-conventions',
        title: 'Nos conventions',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : '/nos-conventions'
    },
    {
        id   : 'darrahetbal',
        title: 'Multimédia',
        type : 'basic',
        icon : 'heroicons_outline:film',
        link : '/darrahetbal'
    },
    {
        id   : 'support',
        title: 'Contactez-nous',
        type : 'basic',
        icon : 'heroicons_outline:support',
        link : '/nous-contacter'
    },
    {
        id   : 'reclamation',
        title: 'Reclamation en ligne',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        link : '/reclamation'
    },
    {
        id   : 'agences',
        title: 'Localiser une agence',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/agences'
    },
    {
        id   : 'espace-connecte',
        title: 'Espace connecté',
        type : 'collapsable',
        icon : 'heroicons_outline:user-group',
        link : '/espace-connecte',
        children: [
            {
                id        : 'espace-connecte.home',
                title     : 'Home',
                type      : 'basic',
                link      : '/espace-connecte',
                exactMatch: true
            },
            {
                id   : 'espace-connecte.simulation-detaillee',
                title: 'Simulation détaillée',
                type : 'basic',
                link : '/espace-connecte/simulation-detaillee'
            },
            {
                id   : 'espace-connecte.mes-simulations',
                title: 'Mes simulations',
                type : 'basic',
                link : '/espace-connecte/mes-simulations'
            }
        ]
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'landing',
        title: 'Accueil',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/landing'
    },
    {
        id   : 'projets-search',
        title: 'Recherche de bien',
        type : 'basic',
        icon : 'heroicons_outline:search-circle',
        link : '/projets-search'
    },
    {
        id   : 'simulation-personnalisee',
        title: 'Simulation personnalisée',
        type : 'basic',
        icon : 'heroicons_outline:calculator',
        link : '/simulation-personnalisee'
    },
    {
        id   : 'nous-connaitre',
        title: 'Nous connaitre',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nous-connaitre'
    },
    {
        id   : 'nos-conventions',
        title: 'Nos conventions',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : '/nos-conventions'
    },
    {
        id   : 'darrahetbal',
        title: 'Multimédia',
        type : 'basic',
        icon : 'heroicons_outline:film',
        link : '/darrahetbal'
    },
    {
        id   : 'support',
        title: 'Contactez-nous',
        type : 'basic',
        icon : 'heroicons_outline:support',
        link : '/nous-contacter'
    },
    {
        id   : 'reclamation',
        title: 'Reclamation en ligne',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        link : '/reclamation'
    },
    {
        id   : 'agences',
        title: 'Localiser une agence',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/agences'
    },
    {
        id   : 'espace-connecte',
        title: 'Espace connecté',
        type : 'collapsable',
        icon : 'heroicons_outline:user-group',
        link : '/espace-connecte',
        children: [
            {
                id        : 'espace-connecte.home',
                title     : 'Home',
                type      : 'basic',
                link      : '/espace-connecte',
                exactMatch: true
            },
            {
                id   : 'espace-connecte.simulation-detaillee',
                title: 'Simulation détaillée',
                type : 'basic',
                link : '/espace-connecte/simulation-detaillee'
            },
            {
                id   : 'espace-connecte.mes-simulations',
                title: 'Mes simulations',
                type : 'basic',
                link : '/espace-connecte/mes-simulations'
            }
        ]
    }
];
