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
                link      : '/espace-connected-client',
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
            },
            {
                id   : 'espace-connecte.mes-demandes-credit',
                title: 'Mes demandes',
                type : 'basic',
                link : '/espace-connecte/mes-demandes-credit'
            },
            {
                id   : 'espace-connecte.mes-credits',
                title: 'Mes crédits',
                type : 'basic',
                link : '/espace-connecte/mes-credits'
            }

        ]
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
        id   : 'nos-offres-de-financement-miftah',
        title: 'Nos offres de financement « MIFTAH »   ',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nos-offres-miftah'
    },

    {
        id   : 'nos-conventions',
        title: 'Nos conventions',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : '/nos-conventions'
    },

    {
        id   : 'nous-connaitre',
        title: 'Nous connaitre',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nous-connaitre'
    },

    {
        id   : 'notre-politique-RSE',
        title: 'Notre politique RSE',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },
    

    

    {
        id   : 'Nos-etats-financiers',
        title: 'Nos états financiers',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },

    {
        id   : 'nos-guides-conseils',
        title: 'Nos Guides & Conseils',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },

    
   
    
    {
        id   : 'support',
        title: 'Nous contacter',
        type : 'basic',
        icon : 'heroicons_outline:support',
        link : '/nous-contacter'
    },
    
    {
        id   : 'agences',
        title: 'Nos agences',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/agences'
    },
    {
        id   : 'reclamation',
        title: 'Réclamation ',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        link : '/reclamation'
    },
    {
        id   : 'darrahetbal',
        title: 'Espace multimédia',
        type : 'basic',
        icon : 'heroicons_outline:film',
        link : '/darrahetbal'
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
                link      : '/espace-connected-client',
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
            },
            {
                id   : 'espace-connecte.mes-demandes-credit',
                title: 'Mes demandes',
                type : 'basic',
                link : '/espace-connecte/mes-demandes-credit'
            },
            {
                id   : 'espace-connecte.mes-credits',
                title: 'Mes crédits',
                type : 'basic',
                link : '/espace-connecte/mes-credits'
            }

        ]
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
        id   : 'nos-offres-de-financement-miftah',
        title: 'Nos offres de financement « MIFTAH »   ',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nos-offres-miftah'
    },

    {
        id   : 'nos-conventions',
        title: 'Nos conventions',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : '/nos-conventions'
    },

    {
        id   : 'nous-connaitre',
        title: 'Nous connaitre',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nous-connaitre'
    },

    {
        id   : 'notre-politique-RSE',
        title: 'Notre politique RSE',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },
    

    

    {
        id   : 'Nos-etats-financiers',
        title: 'Nos états financiers',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },

    {
        id   : 'nos-guides-conseils',
        title: 'Nos Guides & Conseils',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },

    
   
    
    {
        id   : 'support',
        title: 'Nous contacter',
        type : 'basic',
        icon : 'heroicons_outline:support',
        link : '/nous-contacter'
    },
    
    {
        id   : 'agences',
        title: 'Nos agences',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/agences'
    },
    {
        id   : 'reclamation',
        title: 'Réclamation ',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        link : '/reclamation'
    },
    {
        id   : 'darrahetbal',
        title: 'Espace multimédia',
        type : 'basic',
        icon : 'heroicons_outline:film',
        link : '/darrahetbal'
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
                link      : '/espace-connected-client',
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
            },
            {
                id   : 'espace-connecte.mes-demandes-credit',
                title: 'Mes demandes',
                type : 'basic',
                link : '/espace-connecte/mes-demandes-credit'
            },
            {
                id   : 'espace-connecte.mes-credits',
                title: 'Mes crédits',
                type : 'basic',
                link : '/espace-connecte/mes-credits'
            }

        ]
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
        id   : 'nos-offres-de-financement-miftah',
        title: 'Nos offres de financement « MIFTAH »   ',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nos-offres-miftah'
    },

    {
        id   : 'nos-conventions',
        title: 'Nos conventions',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : '/nos-conventions'
    },

    {
        id   : 'nous-connaitre',
        title: 'Nous connaitre',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nous-connaitre'
    },

    {
        id   : 'notre-politique-RSE',
        title: 'Notre politique RSE',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },
    

    

    {
        id   : 'Nos-etats-financiers',
        title: 'Nos états financiers',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },

    {
        id   : 'nos-guides-conseils',
        title: 'Nos Guides & Conseils',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },

    
   
    
    {
        id   : 'support',
        title: 'Nous contacter',
        type : 'basic',
        icon : 'heroicons_outline:support',
        link : '/nous-contacter'
    },
    
    {
        id   : 'agences',
        title: 'Nos agences',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/agences'
    },
    {
        id   : 'reclamation',
        title: 'Réclamation ',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        link : '/reclamation'
    },
    {
        id   : 'darrahetbal',
        title: 'Espace multimédia',
        type : 'basic',
        icon : 'heroicons_outline:film',
        link : '/darrahetbal'
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
                link      : '/espace-connected-client',
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
            },
            {
                id   : 'espace-connecte.mes-demandes-credit',
                title: 'Mes demandes',
                type : 'basic',
                link : '/espace-connecte/mes-demandes-credit'
            },
            {
                id   : 'espace-connecte.mes-credits',
                title: 'Mes crédits',
                type : 'basic',
                link : '/espace-connecte/mes-credits'
            }

        ]
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
        id   : 'nos-offres-de-financement-miftah',
        title: 'Nos offres de financement « MIFTAH »   ',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nos-offres-miftah'
    },

    {
        id   : 'nos-conventions',
        title: 'Nos conventions',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : '/nos-conventions'
    },

    {
        id   : 'nous-connaitre',
        title: 'Nous connaitre',
        type : 'basic',
        icon : 'heroicons_outline:globe-alt',
        link : '/nous-connaitre'
    },

    {
        id   : 'notre-politique-RSE',
        title: 'Notre politique RSE',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },
    

    

    {
        id   : 'Nos-etats-financiers',
        title: 'Nos états financiers',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },

    {
        id   : 'nos-guides-conseils',
        title: 'Nos Guides & Conseils',
        type : 'basic',
        icon : 'heroicons_outline:collection',
        link : ''
    },

    
    {
        id   : 'support',
        title: 'Nous contacter',
        type : 'basic',
        icon : 'heroicons_outline:support',
        link : '/nous-contacter'
    },
    
    {
        id   : 'agences',
        title: 'Nos agences',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/agences'
    },
    {
        id   : 'reclamation',
        title: 'Réclamation ',
        type : 'basic',
        icon : 'heroicons_outline:information-circle',
        link : '/reclamation'
    },
    {
        id   : 'darrahetbal',
        title: 'Espace multimédia',
        type : 'basic',
        icon : 'heroicons_outline:film',
        link : '/darrahetbal'
    }
];
