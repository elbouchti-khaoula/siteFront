/* eslint-disable */
export const projetDescription = `
<p class="lead">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam lab et fugiat id magnam minus nemo quam
    voluptatem. Culpa deleniti explica nisi quod soluta.
</p>
<p>
    Alias animi labque, deserunt distinctio eum excepturi fuga iure labore magni molestias mollitia natus, officia pofro
    quis sunt temporibus veritatis voluptatem, voluptatum. Aut blanditiis esse et illum maxim, obcaecati possimus
    voluptate! Accusamus <em>adipisci</em> amet aperiam, assumenda consequuntur fugiat inventore iusto magnam molestias
    natus necessitatibus, nulla pariatur.
</p>
<p>
    Amet distinctio enim itaque minima minus nesciunt recusandae soluta voluptatibus:
</p>
<blockquote>
    <p>
        Ad aliquid amet asperiores lab distinctio doloremque <code>eaque</code>, exercitationem explicabo, minus mollitia
        natus necessitatibus odio omnis pofro rem.
    </p>
</blockquote>
<p>
    Alias architecto asperiores, dignissimos illum ipsam ipsum itaque, natus necessitatibus officiis, perferendis quae
    sed ullam veniam vitae voluptas! Magni, nisi, quis! A <code>accusamus</code> animi commodi, consectetur distinctio
    eaque, eos excepturi illum laboriosam maiores nam natus nulla officiis perspiciatis rem <em>reprehenderit</em> sed
    tenetur veritatis.
</p>
<p>
    Consectetur <code>dicta enim</code> error eveniet expedita, facere in itaque labore <em>natus</em> quasi? Ad consectetur
    eligendi facilis magni quae quis, quo temporibus voluptas voluptate voluptatem!
</p>
<p>
    Adipisci alias animi <code>debitis</code> eos et impedit maiores, modi nam nobis officia optio perspiciatis, rerum.
    Accusantium esse nostrum odit quis quo:
</p>
<p>
    Accusantium aut autem, lab deleniti eaque fugiat fugit id ipsa iste molestiae,
    <a>necessitatibus nemo quasi</a>
    .
</p>
<p>
    Debitis deserunt doloremque labore laboriosam magni minus odit:
</p>
<ol>
    <li>Asperiores dicta esse maiores nobis officiis.</li>
    <li>Accusamus aliquid debitis dolore illo ipsam molettiae possimus.</li>
    <li>Magnam mollitia pariatur perspiciatis quasi quidem tenetur voluptatem! Adipisci aspernatur assumenda dicta.</li>
</ol>
<p>
    Animi fugit incidunt iure magni maiores molestias.
</p>
`;


export const projets = [
    {
        id          : 'cd5fa417-b667-482d-b208-798d9da3213c',
        images      : [
            {
                chemin    : 'assets/images/pages/marketplace/projet1/princ.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet1/salon.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet1/kitchen.jpeg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet1/bedroom.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet1/childroom.jpg'
            }
        ],
        nom         : 'NEXT HOUSE CASA ANFA',
        statut      : 'En cours de construction',
        promoteur   : {
            nom         : 'nom',
            logoPath    : 'assets/images/pages/marketplace/projet1/promoteur.png',
        },
        prixMin             : '4 525 000,00',
        devise              : 'MAD',
        codeVille               : '640',
        libelleVille        : 'Tanger',
        adresse             : 'Quartier Casa Anfa boulevard des clubs',

        standing            : 'Moyen standing',
        superficieMin       : '248 m²',
        superficieMax       : '370 m²',
        // disponibilites      : 'En construction. 2ème tranche',
        description         : "<p>Idéalement situé sur le site historique de l'ancien aéroport d'Anfa, Next House Casa Anfa est le ...</p>" + `${projetDescription}`,
    },
    {
        id          : 'beec5287-ed50-4504-858a-5dc3f8ce6935',
        images      : [
            {
                chemin    : 'assets/images/pages/marketplace/projet2/princ.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet2/salon.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet2/kitchen.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet2/bedroom.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet2/childroom.jpg'
            }
        ],
        nom         : 'LA CITE DES ARTS',
        statut      : 'En cours de construction',
        promoteur   : {
            nom         : 'nom',
            logoPath    : 'assets/images/pages/marketplace/projet2/promoteur.jpeg',
        },
        prixMin             : '1 000 000,00',
        devise              : 'MAD',
        codeVille               : '810',
        libelleVille        : 'Rabat',
        adresse             : 'Angle Bd Tan tan et Bd ben Barka. Bourgogne',

        standing            : 'Moyen standing',
        superficieMin       : '25 m²',
        superficieMax       : '151 m²',
        // disponibilites      : '34 livrables',
        description         : "<p>Au cœur de Rabat, La Cité Des Arts est une résidence qui offre un espace de vie unique. ...</p>" + `${projetDescription}`,
    },
    {
        id          : '9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf',
        images      : [
            {
                chemin    : 'assets/images/pages/marketplace/projet3/princ.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet3/salon.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet3/kitchen.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet3/bedroom.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet3/childroom.jpg'
            }
        ],
        nom         : 'LA CITADELLE',
        statut      : 'En cours de construction',
        promoteur   : {
            nom         : 'nom',
            logoPath    : 'assets/images/pages/marketplace/projet3/promoteur.png',
        },
        prixMin             : '1 070 000,00',
        devise              : 'MAD',
        codeVille               : '450',
        libelleVille        : 'Marrackech',
        adresse             : '21, rue Hafid Ibrahim. Quartier Gauthier',

        standing            : 'Moyen standing',
        superficieMin       : '41 m²',
        superficieMax       : '198 m²',
        // disponibilites      : 'En construction',
        description         : "<p>La Citadelle est un complexe immobilier de haut standing offrant des studios, des appartements, des ...</p>" + `${projetDescription}`,
    },
    {
        id          : '42a5da95-5e6d-42fd-a09d-de755d123a47',
        images      : [
            {
                chemin    : 'assets/images/pages/marketplace/projet4/princ.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet4/salon.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet4/kitchen.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet4/bedroom.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet4/childroom.jpg'
            }
        ],
        nom         : 'AERIA PARK',
        statut      : 'En cours de construction',
        promoteur   : {
            nom         : 'nom',
            logoPath    : 'assets/images/pages/marketplace/projet4/promoteur.png',
        },
        prixMin             : '1 400 000,00',
        devise              : 'MAD',
        codeVille               : '780',
        libelleVille        : 'Casablanca',
        adresse             : 'CFC CASA ANFA, Lot 37, Bd Abdellah Cherif',

        standing            : 'Moyen standing',
        superficieMin       : '63 m²',
        superficieMax       : '374 m²',
        // disponibilites      : null,
        description         : "<p>Aeria Park, c'est une expérience unique au cœur de Casablanca : un monde de sérénité, ...</p>" + `${projetDescription}`,
    },
    {
        id          : 'a7806ced-03f1-4197-8b30-00bdd463366b',
        images      : [
            {
                chemin    : 'assets/images/pages/marketplace/projet5/princ.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet5/salon.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet5/kitchen.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet5/bedroom.jpg'
            },
            {
                chemin    : 'assets/images/pages/marketplace/projet5/childroom.jfif'
            }
        ],
        nom        : 'ROSE GARDEN',
        statut      : 'En cours de construction',
        promoteur   : {
            nom         : 'nom',
            logoPath    : 'assets/images/pages/marketplace/projet5/promoteur.png',
        },
        prixMin             : '1 250 000,00',
        devise              : 'MAD',
        codeVille               : '10',
        libelleVille        : 'Agadir',
        adresse             : 'Quartier Victoria Bouskoura',

        standing            : 'Moyen standing',
        superficieMin       : '250 m²',
        superficieMax       : '375 m²',
        // disponibilites      : 'Lots en Bande - Lots jumelés',
        description         : "<p>Lots de terrains pour villas: Vous rêvez de vivre à  la campagne mais n'êtes pas prêts à ...</p>" + `${projetDescription}`,
    },

];
