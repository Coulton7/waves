document.addEventListener("DOMContentLoaded", function() {


    var urlArray = window.location.pathname.split('/');
    var urlLang = urlArray[1];
    var filterLang = urlLang;

    const searchClient = algoliasearch('ZUQNGEX563', '23e29710cc4469dec35bd50bc2164b3a');
    const indexName = 'aesseal'

    const renderSearchBox = (renderOptions, isFirstRender) => {
        const { query, refine, clear, isSearchStalled, widgetParams } = renderOptions;

        if (isFirstRender) {
            const input = document.createElement('input');
            input.classList.add('ais-SearchBox-input');
            input.classList.add('form-control');

            const searchButton = document.createElement('button');
            searchButton.classList.add('ais-SearchBox-submit');
            searchButton.classList.add('btn');
            searchButton.classList.add('btn-danger');
            searchButton.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

            const loadingIndicator = document.createElement('span');
            loadingIndicator.textContent = 'Loading...';

            searchButton.addEventListener('click', event => {
                refine(input.value);
            });

            input.addEventListener('keydown', function(e){
                if(e.code === "Enter") {
                    refine(input.value);
                }
            });

            widgetParams.container.appendChild(input);
            widgetParams.container.appendChild(searchButton);
            widgetParams.container.appendChild(loadingIndicator);
        }

        widgetParams.container.querySelector('input').value = query;
        widgetParams.container.querySelector('span').hidden = !isSearchStalled;
    };

    const langlistPanel = instantsearch.widgets.panel ({
        hidden(options) {
            return options.results.nbHits === 0;
        },
        templates: {
            header( options, { html }) {
                if (filterLang == 'en'){
                    return html `<h4>Select your Language</h4>`
                } else if (filterLang == ''){
                    return html `<h4>Select your Language</h4>`
                } else if (filterLang == 'es'){
                    return html `<h4>Seleccione su idioma</h4>`
                } else if (filterLang == 'fr'){
                    return html `<h4>Sélectionnez votre langue</h4>`
                } else if (filterLang == 'de'){
                    return html `<h4>Wählen Sie Ihre Sprache</h4>`
                } else if (filterLang == 'it'){
                    return html `<h4>Selezionare la lingua</h4>`
                } else if (filterLang == 'pl'){
                    return html `<h4>Wybierz język</h4>`
                } else if (filterLang == 'ru'){
                    return html `<h4>Выберите язык</h4>`
                } else if (filterLang == 'zh-hans'){
                    return html `<h4>选择语言</h4>`
                } else if (filterLang == 'ar'){
                    return html `<h4>اختر لغتك</h4>`
                } else if (filterLang == 'nb'){
                    return html `<h4>Velg språk</h4>`
                } else if (filterLang == 'pt-br'){
                    return html `<h4>Selecione seu idioma</h4>`
                } else if (filterLang == 'pt'){
                    return html `<h4>Selecione o seu idioma</h4>`
                } else if (filterLang == 'cz'){
                    return html `<h4>Vyberte jazyk</h4>`
                } else if (filterLang == 'nl'){
                    return html `<h4>Selecteer uw taal</h4>`
                }
            },
        },cssClasses: {
            root: 'pt-5'
        }
    })(instantsearch.widgets.refinementList);

    const pagination = instantsearch.widgets.panel ({
        hidden: ({ results }) => results.nbPages === 1,
    })(instantsearch.widgets.pagination)

    
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

    const customAutocomplete = instantsearch.connectors.connectAutocomplete(
        renderSearchBox
    );

    search.addWidgets([
        customAutocomplete({}),
        pagination({
            container: '#pagination',
            totalPages: 3,
            scrollTo: '#autocomplete'
        }),
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
        instantsearch.widgets.hits({
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