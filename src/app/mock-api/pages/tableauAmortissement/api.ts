import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { tableauAmortissement as tableauAmortissementData } from './data';

@Injectable({
    providedIn: 'root'
})
export class TableauAmortissementMockApi
{
    private _tableauAmortissement: any[] = tableauAmortissementData;

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
        // @ TableauAmortissement - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/products/tableauAmortissement', 300)
            .reply(({request}) => {

                // Get available queries
                const search = request.params.get('search');
                const sort = request.params.get('sort') || 'name';
                const order = request.params.get('order') || 'asc';
                const page = parseInt(request.params.get('page') ?? '1', 10);
                const size = parseInt(request.params.get('size') ?? '10', 10);

                // Clone the tableauAmortissement
                let tableauAmortissement: any[] | null = cloneDeep(this._tableauAmortissement);

                // Sort the tableauAmortissement
                if ( sort === 'echeance' || sort === 'crd' )
                {
                    tableauAmortissement.sort((a, b) => {
                        const fieldA = a[sort].toString().toUpperCase();
                        const fieldB = b[sort].toString().toUpperCase();
                        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                    });
                }
                else
                {
                    tableauAmortissement.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
                }

                // If search exists...
                if ( search )
                {
                    // Filter the tableauAmortissement
                    tableauAmortissement = tableauAmortissement.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
                }

                // Paginate - Start
                const tableauAmortissementLength = tableauAmortissement.length;

                // Calculate pagination details
                const begin = page * size;
                const end = Math.min((size * (page + 1)), tableauAmortissementLength);
                const lastPage = Math.max(Math.ceil(tableauAmortissementLength / size), 1);

                // Prepare the pagination object
                let pagination = {};

                // If the requested page number is bigger than
                // the last possible page number, return null for
                // tableauAmortissement but also send the last possible page so
                // the app can navigate to there
                if ( page > lastPage )
                {
                    tableauAmortissement = null;
                    pagination = {
                        lastPage
                    };
                }
                else
                {
                    // Paginate the results by size
                    tableauAmortissement = tableauAmortissement.slice(begin, end);

                    // Prepare the pagination mock-api
                    pagination = {
                        length    : tableauAmortissementLength,
                        size      : size,
                        page      : page,
                        lastPage  : lastPage,
                        startIndex: begin,
                        endIndex  : end - 1
                    };
                }

                // Return the response
                return [
                    200,
                    {
                        tableauAmortissement,
                        pagination
                    }
                ];
            });

    }
}
