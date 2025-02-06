document.addEventListener("DOMContentLoaded", function() {


    var urlArray = window.location.pathname.split('/');
    var urlLang = urlArray[1];
    var filterLang = urlLang;

    const searchClient = algoliasearch('ZUQNGEX563', '23e29710cc4469dec35bd50bc2164b3a');
    const indexName = 'aesseal'

    
    const search = instantsearch({
        searchClient,
        indexName: indexName,
        routing:{
            router: instantsearch.routers.history(),
            stateMapping: instantsearch.stateMappings.simple(),
        },
        searchFunction(helper) {
            if (helper.state.query === '')
            {
                return;
            }
            helper.search();
        }
    });

    const virtualSearchBox = connectSearchBox(() => {});

    search.addWidgets([
        virtualSearchBox({}),
        pagination({
            container: '#pagination',
            totalPages: 3,
            scrollTo: '#searchbox'
        }),
        configure({
            hitsPerPage: 20,
            attributesToSnippet: ['description:80', 'body:80'],
            page: 0,
        }),
        clearRefinements({
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
        stats({
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
        hits({
            container: '#hits',
            templates:{
                    item(data, { html, components }){
                        if(filterLang == 'en'){
                            return html `<div class="search-result" data-insights-object-id="${data.objectID}" data-insights-position="${data.__position}" data-insights-query-id="${data.__queryID}">
                                <small>${data.url}</small>
                                <p class="h3 ${data.title ? '' : 'd-none'}">${data.title}</p>
                                <p class="h3 ${data.name_1 ? '' : 'd-none'}">${data.name_1}</p>
                                <p id="contentCat" class="lead ${data.type ? '' : 'd-none'}">${data.type}</p>
                                <p id="vocabCat" class="lead ${data.vid ? '' : 'd-none'}">${data.vid}</p>
                                <p class=${data.description ? '' : 'd-none'}>${components.Snippet({
                                    attribute: "description",
                                    hit: data,
                                    highlightedTagName: 'strong'
                                })}</p>
                                <p class=${data.body ? '' : 'd-none'}>${components.Snippet({
                                    attribute: "body",
                                    hit: data,
                                    highlightedTagName: 'strong'
                                })}</p>
                                <a class="btn btn-primary view-details align-self-end" href="${data.url}">Read More</a>
                            </div>`
                        }
                    }
            }
        }),
    ]);
    
    search.start();

    function setInstantSearchUiState(indexUiState) {
        search.setUiState(uiState => ({
            ...uiState,
            [indexName]: {
                ...uiState[indexName],
                page: 1,
                ...indexUiState
            },
        }));
    }

    function getInstantSearchUiState () {
        const uiState = instantSearchRouter.read();

        return(uiState && uiState[indexName]) || {};
    }

    const searchPageState = getInstantSearchUiState();

    let skipInstantSearchUiStateUpdate = false;
    const { setQuery } = autocomplete({
        container: '#autocomplete',
        placeholder: 'Enter your keywords',
        detachedMediaQuery: 'none',
        initialState: {
            query: searchPageState.query || '',
        },
        onSubmit({ state }){
            setInstantSearchUiState({ query: state.query });
        },
        onReset() {
            setInstantSearchUiState({ query: '' });
        },
        onStateChange({ prevState, state }) {
            if (!skipInstantSearchUiStateUpdate && prevState.query !== state.query) {
                setInstantSearchUiState({ query:state.query });
            }
            skipInstantSearchUiStateUpdate = false;
        }
    })

    window.addEventListener('popstate', () => {
        skipInstantSearchUiStateUpdate = true;
        setQuery(search.helper?.state.query || '');
    });
    
});