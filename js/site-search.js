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
                item: '<input type="checkbox" class="ais-refinement-list--checkbox" value="&nbsp; {{label}}" {{#isRefined}}checked="true"{{/isRefined}}> {{label}} <span class="ais-refinement-list--count">({{count}})</span>',
            },
            cssClasses: {
                list: ['language-list'],
                item: ['lang-item']
            }
        }),

        typelistPanel({
            container: '#type-list',
            attribute: 'type',
            templates: {
                header: 'Filter by Content Type',
                item: '<input type="checkbox" class="ais-refinement-list--checkbox" value="&nbsp; {{label}}" {{#isRefined}}checked="true"{{/isRefined}}> {{label}} <span class="ais-refinement-list--count">({{count}})</span>',
            },
            cssClasses: {
                list: ['types-list'],
                item: ['types-item']
            }
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

            if(contentType[i].innerText == 'article') {
                contentType[i].innerText = contentType[i].innerText.replace("article", "Article");
            } else if (contentType[i].innerText == 'page') {
                contentType[i].innerText = contentType[i].innerText.replace("page","Web Page");
            } else if (contentType[i].innerText == 'apiplans') {
                contentType[i].innerText = contentType[i].innerText.replace("apiplans","API Plans");
            } else if (contentType[i].innerText == 'cartridgemechanicalseals') {
                contentType[i].innerText = contentType[i].innerText.replace("cartridgemechanicalseals","Cartridge Mechanical Seals");
            } else if (contentType[i].innerText == 'gasseals') {
                contentType[i].innerText = contentType[i].innerText.replace("gasseals","Gas Seals");
            } else if (contentType[i].innerText == 'sealsupportsystems') {
                contentType[i].innerText = contentType[i].innerText.replace("sealsupportsystems","Seal Support Systems");
            } else if (contentType[i].innerText == 'bearingprotection') {
                contentType[i].innerText = contentType[i].innerText.replace("bearingprotection","Bearing Protection");
            } else if (contentType[i].innerText == 'componentseals') {
                contentType[i].innerText = contentType[i].innerText.replace("componentseals","Component Seals");
            } else if (contentType[i].innerText == 'glandpacking') {
                contentType[i].innerText = contentType[i].innerText.replace("glandpacking","Gland Packing");
            } else if (contentType[i].innerText == 'elastomers') {
                contentType[i].innerText = contentType[i].innerText.replace("elastomers","Elastomers");
            } else if (contentType[i].innerText == 'video') {
                contentType[i].innerText = contentType[i].innerText.replace("video","Video");
            } else if (contentType[i].innerText == 'academy') {
                contentType[i].innerText = contentType[i].innerText.replace("academy","Academy");
            } else if (contentType[i].innerText == 'locations') {
                contentType[i].innerText = contentType[i].innerText.replace("locations","Locations");
            } else if (contentType[i].innerText == 'undefined') {
                contentType[i].innerText = contentType[i].innerText.replace("undefined","");
            }
        }

        for (var x = 0; x < refineType.length; x++) {

            if(refineType[x].innerText.includes('article')) {
                refineType[x].innerText = refineType[x].innerText.replace("article", "Article");
            } else if (refineType[x].innerText.includes('page')) {
                refineType[x].innerText = refineType[x].innerText.replace("page","Web Page");
            } else if (refineType[x].innerText.includes('apiplans')) {
                refineType[x].innerText = refineType[x].innerText.replace("apiplans","API Plans");
            } else if (refineType[x].innerText.includes('cartridgemechanicalseals')) {
                refineType[x].innerText = refineType[x].innerText.replace("cartridgemechanicalseals","Cartridge Mechanical Seals");
            } else if (refineType[x].innerText.includes('gasseals')) {
                refineType[x].innerText = refineType[x].innerText.replace("gasseals","Gas Seals");
            } else if (refineType[x].innerText.includes('sealsupportsystems')) {
                refineType[x].innerText = refineType[x].innerText.replace("sealsupportsystems","Seal Support Systems");
            } else if (refineType[x].innerText.includes('bearingprotection')) {
                refineType[x].innerText = refineType[x].innerText.replace("bearingprotection","Bearing Protection");
            } else if (refineType[x].innerText.includes('componentseals')) {
                refineType[x].innerText = refineType[x].innerText.replace("componentseals","Component Seals");
            } else if (refineType[x].innerText.includes('glandpacking')) {
                refineType[x].innerText = refineType[x].innerText.replace("glandpacking","Gland Packing");
            } else if (refineType[x].innerText.includes('elastomers')) {
                refineType[x].innerText = refineType[x].innerText.replace("elastomers","Elastomers");
            } else if (refineType[x].innerText.includes('video')) {
                refineType[x].innerText = refineType[x].innerText.replace("video","Video");
            } else if (refineType[x].innerText.includes('academy')) {
                refineType[x].innerText = refineType[x].innerText.replace("academy","Academy");
            } else if (refineType[x].innerText.includes('locations')) {
                refineType[x].innerText = refineType[x].innerText.replace("locations","Locations");
            }
        }

        for (var y = 0; y < vocabName.length; y++) {
            if(vocabName[y].textContent == 'industry') {
                vocabName[y].innerText = vocabName[y].innerText.replace("industry","Industry")
            } else if (vocabName[y].textContent == 'undefined') {
                vocabName.innerText = ""
            }
        }
    })
});