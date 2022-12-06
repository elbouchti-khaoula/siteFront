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
    {path: '', pathMatch : 'full', redirectTo: 'landing'},

    // Redirect signed in user to the '/landing'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'landing'},

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
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
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
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // LandingHome (Fuse) routes
    // {
    //     path: '',
    //     component  : LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children   : [
    //         {
    //             path: 'homeFuse',
    //             loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
    //         },
    //     ]
    // },

    // home routes
    // {
    //     path: '',
    //     component  : LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children   : [
    //         {
    //             path: 'home',
    //             loadChildren: () => import('app/modules/pages/home/home.module').then(m => m.HomeModule),
    //         },
    //     ]
    // },

    // Admin routes
    {
        path       : '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            // {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},

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
                path: 'projetsSearch',
                loadChildren: () => import('app/modules/pages/projetsSearch/projets-search.module').then(m => m.ProjetsSearchModule),
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
