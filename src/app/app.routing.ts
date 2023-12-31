import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver, NavigationResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/landing'
    { path: '', pathMatch: 'full', redirectTo: 'landing' },

    // Redirect signed in user to the '/landing'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'espace-connecte' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) },
        ]
    },

    // home routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/pages/home/home.module').then(m => m.HomeModule),
            },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            navigation: NavigationResolver,
            initialData: InitialDataResolver,
        },
        children: [

            // espace connecté
            {
                path: 'espace-connecte',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('app/modules/admin/espace-connected-client/espace-connected-client.module').then(m => m.EspaceConnectedClientModule),
                    },
                    {
                        path: 'simulation-detaillee',
                        loadChildren: () => import('app/modules/admin/simulation-detaillee/simulation-detaillee.module').then(m => m.SimulationDetailleeModule)
                    },
                    {
                        path: 'demande-credit',
                        loadChildren: () => import('app/modules/admin/demande-credit/demande-credit.module').then(m => m.DemandeCreditModule)
                    },
                    {
                        path: 'mes-simulations',
                        loadChildren: () => import('app/modules/admin/mes-simulations/mes-simulations.module').then(m => m.MesSimulationsModule)
                    },
                    {
                        path: 'consulter-simulation',
                        loadChildren: () => import('app/modules/admin/consulter-simulation/consulter-simulation.module').then(m => m.ConsulterSimulationModule)
                    },
                    {
                        path: 'mes-demandes-credit',
                        loadChildren: () => import('app/modules/admin/mes-demandes-credit/mes-demandes-credit.module').then(m => m.MesDemandesCreditModule)
                    },
                    {
                        path: 'mes-credits',
                        loadChildren: () => import('app/modules/admin/mes-credits/mes-credits.module').then(m => m.MesCreditsModule)
                    },
                    {
                        path: 'mes-projets-favoris',
                        loadChildren: () => import('app/modules/admin/mes-projets-favoris/mes-projets-favoris.module').then(m => m.MesProjetsFavorisModule)
                    },
                    {
                        path: 'demande-sav',
                        loadChildren: () => import('app/modules/admin/demande-sav/demande-sav.module').then(m => m.DemandeSAVModule)
                    },
                    {
                        path: 'mes-operations-sav',
                        loadChildren: () => import('app/modules/admin/mes-operations-sav/mes-operations-sav.module').then(m => m.MesOperationsSavModule)
                    }
                ]
            }
        ]
    },

    // Pages routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            navigation: NavigationResolver,
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'landing',
                loadChildren: () => import('app/modules/pages/landing/landing.module').then(m => m.LandingModule),
            },
            {
                path: 'landing1',
                loadChildren: () => import('app/modules/pages/landing1/landing1.module').then(m => m.Landing1Module),
            },
            {
                path: 'landing2',
                loadChildren: () => import('app/modules/pages/landing2/landing2.module').then(m => m.Landing2Module),
            },
            {
                path: 'landing3',
                loadChildren: () => import('app/modules/pages/landing3/landing3.module').then(m => m.Landing3Module),
            },
            {
                path: 'darrahetbal',
                loadChildren: () => import('app/modules/pages/darrahetbal/darrahetbal.module').then(m => m.DarrahetbalModule),
            },
            {
                path: 'projets-search',
                loadChildren: () => import('app/modules/pages/projets-search/projets-search.module').then(m => m.ProjetsSearchModule),
            },
            {
                path: 'projet-details',
                loadChildren: () => import('app/modules/pages/projet/projet.module').then(m => m.ProjetModule),
            },
            {
                path: 'simulation-personnalisee',
                loadChildren: () => import('app/modules/pages/simulation-personnalisee/simulation-personnalisee.module').then(m => m.SimulationPersonaliseeModule),
            },
            {
                path: 'nous-connaitre',
                loadChildren: () => import('app/modules/pages/nous-connaitre/nous-connaite.module').then(m => m.NousConnaitreModule),
            },

            {
                path: 'nos-offres-miftah',
                loadChildren: () => import('app/modules/pages/nos-offres-miftah/nos-offres-miftah.module').then(m => m.NosOffresMiftahModule),
            },

            {
                path: 'nos-conventions',
                loadChildren: () => import('app/modules/pages/nos-conventions/nos-conventions.module').then(m => m.NosConventionsModule),
            },

            {
                path: 'nos-etats-financiers',
                loadChildren: () => import('app/modules/pages/nos-etats-financiers/nos-etats-financiers.module').then(m => m.NosEtatsFinanciersModule),
            },

            {
                path: 'nos-lettres-wi',
                loadChildren: () => import('app/modules/pages/nos-lettres-wi/nos-lettres-wi.module').then(m => m.NosLettresWiModule),
            },

            {
                path: 'nos-guides-conseils',
                loadChildren: () => import('app/modules/pages/nos-guides-conseils/nos-guides-conseils.module').then(m => m.NosGidesConseilsModule),
            },
            {
                path: 'conseil-detail-1',
                loadChildren: () => import('app/modules/pages/nos-guides-conseils/conseil-detail-1/conseil-detail-1.module').then(m => m.Detail1Module),
            },
            {
                path: 'conseil-detail-2',
                loadChildren: () => import('app/modules/pages/nos-guides-conseils/conseil-detail-2/conseil-detail-2.module').then(m => m.Detail2Module),
            },
            {
                path: 'conseil-detail-3',
                loadChildren: () => import('app/modules/pages/nos-guides-conseils/conseil-detail-3/conseil-detail-3.module').then(m => m.Detail3Module),
            },
            {
                path: 'conseil-detail-4',
                loadChildren: () => import('app/modules/pages/nos-guides-conseils/conseil-detail-4/conseil-detail-4.module').then(m => m.Detail4Module),
            },

            {
                path: 'espace-multimedia',
                loadChildren: () => import('app/modules/pages/espace-multimedia/espace-multimedia.module').then(m => m.EspaceMultiMediaModule),
            },

            {
                path: 'notre-politique-rse',
                loadChildren: () => import('app/modules/pages/notre-politique-rse/notre-politique-rse.module').then(m => m.NotrePolitiqueRseModule),
            },

            {
                path: 'nous-contacter',
                loadChildren: () => import('app/modules/pages/support/support.module').then(m => m.SupportModule),
            },
            {
                path: 'agences',
                loadChildren: () => import('app/modules/pages/agences/agences.module').then(m => m.AgencesModule),
            },
            {
                path: 'reclamation',
                loadChildren: () => import('app/modules/pages/reclamation/reclamation.module').then(m => m.ReclamationModule),
            },

            // Maintenance
            {
                path: 'maintenance',
                loadChildren: () => import('app/modules/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule),
            },
            // 404 & 500 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () => import('app/modules/pages/error/error-404/error-404.module').then(m => m.Error404Module)
            },
            {
                path: '500-server-error',
                loadChildren: () => import('app/modules/pages/error/error-500/error-500.module').then(m => m.Error500Module)
            },
            {
                path: '**',
                redirectTo: '404-not-found'
            }
        ]
    }
];
