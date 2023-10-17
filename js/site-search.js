document.addEventListener("DOMContentLoaded", function() {

    var urlArray = window.location.pathname.split('/');
    var urlLang = urlArray[1];
    var filterLang = urlLang;

    console.log(filterLang);

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
    
    search.addWidgets([
        instantsearch.widgets.configure({
            hitsPerPage: 20,
            attributesToSnippet: ['description:80', 'body:80'],
            page: 0,
        }),

        instantsearch.widgets.clearRefinements({
            container: '#clear-refinements',
            cssClasses:{
                button: [
                    'btn btn-primary text-white'
                ]
            }
        }),

        instantsearch.widgets.refinementList({
            container: '#lang-list',
            attribute: 'search_api_language',
            templates: {
                item: '<input type="checkbox" class="ais-refinement-list--checkbox" value="&nbsp; {{label}}" {{#isRefined}}checked="true"{{/isRefined}}> {{label}} <span class="ais-refinement-list--count">({{count}})</span>',
                header: '<h4>Select your Language</h4>'
            },
            transformItems(items) {
                items.forEach(function(arrayItem){
                    if (filterLang == "en"){
                        if(arrayItem.highlighted === "en") {
                            arrayItem.isRefined = true
                        }
                    }
                    else if (filterLang === "fr") {
                        if(arrayItem.highlighted === "fr") {
                            arrayItem.isRefined = true;
                        }
                    }
                });
                return items;
            },
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
    
        instantsearch.widgets.hits ({
            container: '#hits',
            templates:{
                item: data => `
                <div class="search-result">
                    <p class="h3 ${data.title ? '' : 'd-none'}">${data.title}</p>
                    <p class="h3 ${data.name_1 ? '' : 'd-none'}">${data.name_1}</p>
                    <p class="lead ${data.type ? '' : 'd-none'}">${data.type}</p>
                    <p class="lead ${data.vid ? '' : 'd-none'}">${data.vid}</p>
                    <p class=${data.description ? '' : 'd-none'}>${instantsearch.snippet({
                        attribute: "description",
                        hit: data
                    })}</p>
                    <p class=${data.body ? '' : 'd-none'}>${instantsearch.snippet({
                        attribute: "body",
                        hit: data
                    })}</p>
                    <a href="${data.url}">Read More</a>
                </div>`,
                empty: `<p class="h3">No results found matching {{query}}</p>
                <p>Sorry we couldn’t find a result for your search. Try to search again by, checking your search for spelling mistakes and/or reducing the number of keywords used. You can also try using a broader search phrase.</p>'
                <p class="h3">Are you searching for a Part Number or Serial Number?</p>`,
            }
        })
    ]);
    
    search.start();
});