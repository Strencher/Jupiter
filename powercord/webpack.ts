const modules = {
    "messages": [
        "sendMessage",
        "editMessage",
        "deleteMessage"
    ],
    "typing": [
        "startTyping"
    ],
    "http": [
        "getAPIBaseURL",
        "get",
        "put",
        "post"
    ],
    "constants": [
        "Endpoints",
        "AuditLogActionTypes",
        "AutoCompleteResultTypes",
        "BITRATE_DEFAULT"
    ],
    "channels": [
        "getChannelId",
        "getLastSelectedChannelId",
        "getVoiceChannelId"
    ],
    "spotify": [
        "play",
        "pause",
        "fetchIsSpotifyProtocolRegistered"
    ],
    "spotifySocket": [
        "getActiveSocketAndDevice",
        "getPlayerState",
        "hasConnectedAccount"
    ],
    "React": [
        "createRef",
        "createElement",
        "Component",
        "PureComponent"
    ],
    "ReactDOM": [
        "render",
        "createPortal"
    ],
    "contextMenu": [
        "openContextMenu",
        "closeContextMenu"
    ],
    "modal": [
        "openModal",
        "openModalLazy",
        "closeAllModals"
    ],
    "Flux": [
        "Store",
        "connectStores"
    ],
    "FluxDispatcher": [
        "_currentDispatchActionType",
        "_processingWaitQueue"
    ],
    "Router": [
        "BrowserRouter",
        "Router"
    ],
    "hljs": [
        "initHighlighting",
        "highlight"
    ]
};

function getModule(filter: string[] | ((m: any) => boolean), async = true) {
    if (Array.isArray(filter)) {
        const props = filter;
        filter = m => m && props.every(p => p in m);
    }

    const result = BdApi.findModule(filter);

    return async ? Promise.resolve(result) : result;
}

function getModuleByDisplayName(name: string, async = true) {
    const result = BdApi.findModuleByDisplayName(name);

    return async ? Promise.resolve(result) : result;
}

function getAllModules(filter: (m: any) => boolean) {
    return BdApi.findAllModules(filter);
}

const exports = {
    getModule,
    getModuleByDisplayName,
    getAllModules
};

for (const moduleId in modules) {
    const cache = {
        loaded: false,
        result: null
    };

    function search() {
        return getModule(modules[moduleId], false);
    }

    Object.defineProperty(exports, moduleId, {
        get() {
            return cache.loaded ? cache.result : (cache.result = search(), cache.loaded = true, cache.result);
        }
    });
}

export default exports;
