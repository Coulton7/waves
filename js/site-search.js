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

    const langlistPanel = instantsearch.widgets.panel ({
        templates: {
            header: '<h4>Select your Language</h4>'
        }
    })(instantsearch.widgets.refinementList);

    const typelistPanel = instantsearch.widgets.panel ({
        templates: {
            header: '<h4>Filter by Content Type</h4>'
        }
    })(instantsearch.widgets.refinementList);

    search.addWidgets([{
        init: function(options) {
            if(filterLang == "waves")
            {
                options.helper.toggleRefinement('search_api_language', 'en');
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
            sortBy: ['isRefined', 'count:desc', 'name:asc']
        }),

        typelistPanel({
            container: '#type-list',
            attribute: 'type',
            templates: {
                header: 'Filter by Content Type',
                item: '<input type="checkbox" class="ais-refinement-list--checkbox" {{#isRefined}}checked="true"{{/isRefined}}> {{label}} <span class="ais-refinement-list--count">({{count}})</span>',
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
    
        instantsearch.widgets.hits ({
            container: '#hits',
            templates:{
                item: data => `
                <div class="search-result">
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
                    <a href="${data.url}">Read More</a>
                </div>`,
                empty: `<p class="h3">No results found matching {{query}}</p>
                <p>Sorry we couldn’t find a result for your search. Try to search again by, checking your search for spelling mistakes and/or reducing the number of keywords used. You can also try using a broader search phrase.</p>'
                <p class="h3">Are you searching for a Part Number or Serial Number?</p>`,
            }
        })
    ]);
    
    search.start();

    search.on('render', function() {
        var contentType = document.querySelectorAll('#contentCat');
        var vocabName = document.querySelectorAll("#vocabCat");
        var refineType = document.querySelectorAll(".types-item");
        for (var i = 0; i < contentType.length; i++) {

            if(contentType[i].textContent == 'article') {
                contentType[i].textContent = contentType[i].textContent.replace("article", "Article");
            } else if (contentType[i].textContent == 'page') {
                contentType[i].textContent = contentType[i].textContent.replace("page","Web Page");
            } else if (contentType[i].textContent == 'apiplans') {
                contentType[i].textContent = contentType[i].textContent.replace("apiplans","API Plans");
            } else if (contentType[i].textContent == 'cartridgemechanicalseals') {
                contentType[i].textContent = contentType[i].textContent.replace("cartridgemechanicalseals","Cartridge Mechanical Seals");
            } else if (contentType[i].textContent == 'gasseals') {
                contentType[i].textContent = contentType[i].textContent.replace("gasseals","Gas Seals");
            } else if (contentType[i].textContent == 'sealsupportsystems') {
                contentType[i].textContent = contentType[i].textContent.replace("sealsupportsystems","Seal Support Systems");
            } else if (contentType[i].textContent == 'bearingprotection') {
                contentType[i].textContent = contentType[i].textContent.replace("bearingprotection","Bearing Protection");
            } else if (contentType[i].textContent == 'componentseals') {
                contentType[i].textContent = contentType[i].textContent.replace("componentseals","Component Seals");
            } else if (contentType[i].textContent == 'glandpacking') {
                contentType[i].textContent = contentType[i].textContent.replace("glandpacking","Gland Packing");
            } else if (contentType[i].textContent == 'elastomers') {
                contentType[i].textContent = contentType[i].textContent.replace("elastomers","Elastomers");
            } else if (contentType[i].textContent == 'video') {
                contentType[i].textContent = contentType[i].textContent.replace("video","Video");
            } else if (contentType[i].textContent == 'academy') {
                contentType[i].textContent = contentType[i].textContent.replace("academy","Academy");
            } else if (contentType[i].textContent == 'locations') {
                contentType[i].textContent = contentType[i].textContent.replace("locations","Locations");
            } else if (contentType[i].textContent == 'undefined') {
                contentType[i].textContent = contentType[i].textContent.replace("undefined","");
            }
        }

        for (var x = 0; x < refineType.length; x++) {

            if(refineType[x].innerHTML.includes('article')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace('article', 'Article');
            } else if (refineType[x].innerHTML.includes('page')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("page","Web Page");
            } else if (refineType[x].innerHTML.includes('apiplans')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("apiplans","API Plans");
            } else if (refineType[x].innerHTML.includes('cartridgemechanicalseals')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("cartridgemechanicalseals","Cartridge Mechanical Seals");
            } else if (refineType[x].innerHTML.includes('gasseals')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("gasseals","Gas Seals");
            } else if (refineType[x].innerHTML.includes('sealsupportsystems')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("sealsupportsystems","Seal Support Systems");
            } else if (refineType[x].innerHTML.includes('bearingprotection')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("bearingprotection","Bearing Protection");
            } else if (refineType[x].innerHTML.includes('componentseals')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("componentseals","Component Seals");
            } else if (refineType[x].innerHTML.includes('glandpacking')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("glandpacking","Gland Packing");
            } else if (refineType[x].innerHTML.includes('elastomers')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("elastomers","Elastomers");
            } else if (refineType[x].innerHTML.includes('video')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("video","Video");
            } else if (refineType[x].innerHTML.includes('academy')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("academy","Academy");
            } else if (refineType[x].innerHTML.includes('locations')) {
                refineType[x].innerHTML = refineType[x].innerHTML.replace("locations",'Locations');
            }
        }

        for (var y = 0; y < vocabName.length; y++) {
            if(vocabName[y].textContent == 'industry') {
                vocabName[y].textContent = vocabName[y].textContent.replace("industry","Industry")
            } else if (vocabName[y].textContent == 'undefined') {
                vocabName.textContent = ""
            }
        }
    })
});