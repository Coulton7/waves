document.addEventListener("DOMContentLoaded", function() {

    var urlArray = window.location.pathname.split('/');
    var urlLang = urlArray[1];
    var filterLang = urlLang;

    const searchClient = algoliasearch('ZUQNGEX563', '23e29710cc4469dec35bd50bc2164b3a');
    
    const search = instantsearch({
        indexName: 'aesseal',
        searchClient,
        routing: true,
        searchFunction(helper) {
            if (helper.state.query === '')
            {
                return;
            }
            helper.search();
        }
    });

    let typeMapping;

    if (filterLang == "en") {
         typeMapping = {
            '3dmodels': '3D Models',
            'academy': 'Academy',
            'apiplans': 'API Plans',
            'article': 'Article',
            'bearingprotection': 'Bearing Protection',
            'cartridgemechanicalseals': 'Cartridge Mechanical Seals',
            'casestudies': 'Case Studies',
            'componentseals': 'Component Seals',
            'elastomers': 'Elastomers',
            'gasseals': 'Gas Seals',
            'glandpacking': 'Gland Packing',
            'locations': 'Locations',
            'page': 'Web Page',
            'productbrochure': 'Product Brochure',
            'sealsupportsystems': 'Seal Support Systems',
            'video': 'Video',
            'whitepaper': 'Whitepaper',
        }
    } else if (filterLang == "waves") {
         typeMapping = {
            '3dmodels': 'Modèles 3D',
            'academy': 'Académie',
            'apiplans': 'API Plans',
            'article': 'Article',
            'bearingprotection': 'Protections de Paliers',
            'cartridgemechanicalseals': 'Garnitures cartouches',
            'casestudies': 'Études de cas',
            'componentseals': 'Garnitures mécaniques bi-composants',
            'elastomers': 'Elastomers',
            'gasseals': 'Garnitures gaz',
            'glandpacking': 'Tresses d’étanchéité',
            'locations': 'Emplacement',
            'page': 'Web Page',
            'productbrochure': 'Brochures des produits',
            'sealsupportsystems': 'Seal Support Systems',
            'video': 'Vidéos',
            'whitepaper': 'Whitepaper',
        }
    }

    const vidMapping ={
        'industry': 'Industry',
        'glandpacking': 'Gland Packing Category',
        'sealsupportsystems': 'Seal Support Systems Category',
        'bearingprotectioncategories': 'Bearing Protection Category',
        'cartridgemechanicalseals': 'Cartridge Mechanical Seals Category',
        'gasseals': 'Gas Seals Category',
        'componentseals': 'Component Seals Category',
    }

    const langlistPanel = instantsearch.widgets.panel ({
        templates: {
            header: '<h4>Select your Language</h4>'
        },cssClasses: {
            root: 'pt-5'
        }
    })(instantsearch.widgets.refinementList);

    const typelistPanel = instantsearch.widgets.panel ({
        templates: {
            header: '<h4>Filter by Content Type</h4>'
        },
        cssClasses: {
            root: 'pt-3'
        }
    })(instantsearch.widgets.refinementList);

    search.addWidgets([{
        init: function(options) {
            if(filterLang == "en")
            {
                options.helper.toggleRefinement('search_api_language', 'waves');
            }
            else if(filterLang == "es")
            {
                options.helper.toggleRefinement('search_api_language', 'es');
            }
            else if (filterLang === "fr") {
                options.helper.toggleRefinement('search_api_language', 'fr');
            }
            else if (filterLang === "de") {
                options.helper.toggleRefinement('search_api_language', 'de');
            }
            else if(filterLang == "it")
            {
                options.helper.toggleRefinement('search_api_language', 'iy');
            }
            else if(filterLang == "pl")
            {
                options.helper.toggleRefinement('search_api_language', 'pl');
            }
            else if(filterLang == "ru")
            {
                options.helper.toggleRefinement('search_api_language', 'ru');
            }
            else if(filterLang == "tr")
            {
                options.helper.toggleRefinement('search_api_language', 'tr');
            }
            else if(filterLang == "zh-hans")
            {
                options.helper.toggleRefinement('search_api_language', 'zh-hans');
            }
        }
      }]);
    
    search.addWidgets([
        instantsearch.widgets.configure({
            hitsPerPage: 20,
            attributesToSnippet: ['description:80', 'body:80'],
            page: 0,
        }),

        instantsearch.widgets.clearRefinements({
            container: '#clear-refinements',
            cssClasses:{
                root: 'pt-5',
                button: [
                    'btn btn-primary text-white'
                ]
            }
        }),

        langlistPanel({
            container: '#lang-list',
            attribute: 'search_api_language',
            templates: {
                header: 'Select your Language',
                item: '<input type="checkbox" class="ais-refinement-list--checkbox lang-item" value="{{label}}" {{#isRefined}}checked="true"{{/isRefined}}> {{label}} <span class="ais-refinement-list--count">({{count}})</span>',
            },
            transformItems(items){
                return items.map(item => ({
                    ...item,
                    label: item.label.toUpperCase(),
                }));
            },
            sortBy: ['isRefined', 'count:desc', 'name:asc']
        }),

        typelistPanel({
            container: '#type-list',
            attribute: 'type',
            templates: {
                header: 'Filter by Content Type',
                item: '<input type="checkbox" class="ais-refinement-list--checkbox" {{#isRefined}}checked="true"{{/isRefined}}> {{label}} <span class="ais-refinement-list--count">({{count}})</span>',
            },
            transformItems(items){
                return items.map(item => ({
                    ...item,
                    label: typeMapping[item.label],
                }));
            },
            cssClasses: {
                item: ['types-item']
            },
            sortBy: ['isRefined', 'count:desc', 'name:asc']
        }),
    
        instantsearch.widgets.pagination({
            container: '#pagination',
            totalPages: 3,
            scrollTo: '#searchbox'
        }),
    
        instantsearch.widgets.searchBox({
            container: '#searchbox',
            placeholder: 'Enter Your Keywords',
            searchAsYouType: false,
            cssClasses: {
                form : 'search-block',
                input: 'form-control',
                submit: 'btn btn-primary',
                submitIcon: 'text-white'
            }
        }),

        instantsearch.widgets.stats({
            container: '#stats',
            templates: {
                text(data, { html }) {
                    let count = '';
                    if (data.hasManyResults) {
                        count += `${data.nbHits} results`
                    } else if (data.hasOneResult) {
                        count += `1 result`
                    } else {
                        count += `no result`;
                    }

                    return html`<span class="stat-text">${count} found in ${data.processingTimeMS}ms</span>`;
                }
            }
        }),
    
        instantsearch.widgets.hits ({
            container: '#hits',
            templates:{
                item: data => `
                <div class="search-result">
                    <small>${data.url}</small>
                    <p class="h3 ${data.title ? '' : 'display-none'}">${data.title}</p>
                    <p class="h3 ${data.name_1 ? '' : 'display-none'}">${data.name_1}</p>
                    <p id="contentCat" class="lead ${data.type ? '' : 'display-none'}">${data.type}</p>
                    <p id="vocabCat" class="lead ${data.vid ? '' : 'display-none'}">${data.vid}</p>
                    <p class=${data.description ? '' : 'display-none'}>${instantsearch.snippet({
                        attribute: "description",
                        hit: data
                    })}</p>
                    <p class=${data.body ? '' : 'display-none'}>${instantsearch.snippet({
                        attribute: "body",
                        hit: data
                    })}</p>
                    <a class="btn btn-primary align-self-end" href="${data.url}">Read More</a>
                </div>`,
                empty: `<p class="h3">No results found matching {{query}}</p>
                <p>Sorry we couldn’t find a result for your search. Try to search again by, checking your search for spelling mistakes and/or reducing the number of keywords used. You can also try using a broader search phrase.</p>'
                <p class="h3">Are you searching for a Part Number or Serial Number?</p>`,
            },
            transformItems(items){
                return items.map(item => ({
                    ...item,
                    type: typeMapping[item.type],
                    vid: vidMapping[item.vid]
                }))
            }
        })
    ]);
    
    search.start();
});