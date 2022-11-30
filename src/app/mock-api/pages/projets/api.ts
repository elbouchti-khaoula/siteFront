import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { projets as projetsData } from 'app/mock-api/pages/projets/data';

@Injectable({
    providedIn: 'root'
})
export class ProjetsMockApi
{
    private _projets: any[] = projetsData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Projets Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/projets/search')
            .reply(({request}) => {

                // Get the search query
                const ville = request.params.get('ville');

                // Clone the projets
                let projets = cloneDeep(this._projets);

                // If the query exists...
                if ( ville )
                {
                    // Filter the projets
                    projets = projets.filter(projet => projet.ville && projet.ville.toLowerCase().includes(ville.toLowerCase()));
                }

                // Sort the projets by the nom field by default
                projets.sort((a, b) => a.nom.localeCompare(b.nom));

                // Return the response
                return [200, projets];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Projet - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/projets/projet')
            .reply(({request}) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the projets
                const projets = cloneDeep(this._projets);

                // Find the projet
                const projet = projets.find(item => item.id === id);

                // Return the response
                return [200, projet];
            });

    }
}
