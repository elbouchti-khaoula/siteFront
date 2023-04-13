import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

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
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'espace-connected' },

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

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'simulation-detaillee',
                loadChildren: () => import('app/modules/admin/simulation-detaillee/simulation-detaillee.module').then(m => m.SimulationDetailleeModule)
            },
            {
                path: 'tableau-amortissement',
                loadChildren: () => import('app/modules/admin/tableau-amortissement/tableau-amortissement.module').then(m => m.TableauAmortissementModule),
            },
        ]
    },

    // home routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {
                path: 'home',
                loadChildren: () => import('app/modules/pages/home/home.module').then(m => m.HomeModule),
            },
        ]
    },

    // Pages routes
    {
        path       : '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {
                path: 'landing',
                loadChildren: () => import('app/modules/pages/landing/landing.module').then(m => m.LandingModule),
            },
            {
                path: 'landingBis',
                loadChildren: () => import('app/modules/pages/landingBis/landingBis.module').then(m => m.LandingBisModule),
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
                path: 'simulation-personnalisee',
                loadChildren: () => import('app/modules/pages/simulation-personnalisee/simulation-personnalisee.module').then(m => m.SimulationPersonaliseeModule),
            },
            {
                path: 'nous-connaitre',
                loadChildren: () => import('app/modules/pages/nous-connaitre/nous-connaite.module').then(m => m.NousConnaitreModule),
            },
            {
                path: 'nos-conventions',
                loadChildren: () => import('app/modules/pages/nos-conventions/nos-conventions.module').then(m => m.NosConventionsModule),
            },


            {
                path: 'espace-connected',
                loadChildren: () => import('app/modules/admin/espace-connected/espace-connected.module').then(m => m.EspaceConnectedModule),
            },

            {
                path: 'espace-connected-client',
                loadChildren: () => import('app/modules/admin/espace-connected-client/espace-connected-client.module').then(m => m.EspaceConnectedClientModule),
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
