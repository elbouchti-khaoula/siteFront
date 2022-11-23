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
        // @ Projets - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/projets/all')
            .reply(() => {

                // Clone the projets
                const projets = cloneDeep(this._projets);

                // Sort the projets by the nom field by default
                projets.sort((a, b) => a.nom.localeCompare(b.nom));

                // Return the response
                return [200, projets];
            });

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

        // -----------------------------------------------------------------------------------------------------
        // @ Projet - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/projets/projet')
            .reply(() => {

                // Generate a new projet
                const newProjet = {
                    id          : FuseMockApiUtils.guid(),
                    // avatar      : null,
                    nom        : 'New Projet',
                    // emails      : [],
                    // phoneNumbers: [],
                    // job         : {
                    //     title  : '',
                    //     company: ''
                    // },
                    // birthday    : null,
                    adresse     : null,
                    // notes       : null,
                    // tags        : []
                };

                // Unshift the new projet
                this._projets.unshift(newProjet);

                // Return the response
                return [200, newProjet];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Projet - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/projets/projet')
            .reply(({request}) => {

                // Get the id and projet
                const id = request.body.id;
                const projet = cloneDeep(request.body.projet);

                // Prepare the updated projet
                let updatedProjet = null;

                // Find the projet and update it
                this._projets.forEach((item, index, projets) => {

                    if ( item.id === id )
                    {
                        // Update the projet
                        projets[index] = assign({}, projets[index], projet);

                        // Store the updated projet
                        updatedProjet = projets[index];
                    }
                });

                // Return the response
                return [200, updatedProjet];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Projet - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/projets/projet')
            .reply(({request}) => {

                // Get the id
                const id = request.params.get('id');

                // Find the projet and delete it
                this._projets.forEach((item, index) => {

                    if ( item.id === id )
                    {
                        this._projets.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Avatar - POST
        // -----------------------------------------------------------------------------------------------------
        /**
         * Read the given file as mock-api url
         *
         * @param file
         */
        const readAsDataURL = (file: File): Promise<any> =>

            // Return a new promise
            new Promise((resolve, reject) => {

                // Create a new reader
                const reader = new FileReader();

                // Resolve the promise on success
                reader.onload = (): void => {
                    resolve(reader.result);
                };

                // Reject the promise on error
                reader.onerror = (e): void => {
                    reject(e);
                };

                // Read the file as the
                reader.readAsDataURL(file);
            })
        ;

        this._fuseMockApiService
            .onPost('api/projets/avatar')
            .reply(({request}) => {

                // Get the id and avatar
                const id = request.body.id;
                const avatar = request.body.avatar;

                // Prepare the updated projet
                let updatedProjet: any = null;

                // In a real world application, this would return the path
                // of the saved image file (from host, S3 bucket, etc.) but,
                // for the sake of the demo, we encode the image to base64
                // and return it as the new path of the uploaded image since
                // the src attribute of the img tag works with both image urls
                // and encoded images.
                return from(readAsDataURL(avatar)).pipe(
                    map((path) => {

                        // Find the projet and update it
                        this._projets.forEach((item, index, projets) => {

                            if ( item.id === id )
                            {
                                // Update the avatar
                                projets[index].avatar = path;

                                // Store the updated projet
                                updatedProjet = projets[index];
                            }
                        });

                        // Return the response
                        return [200, updatedProjet];
                    })
                );
            });
    }
}
