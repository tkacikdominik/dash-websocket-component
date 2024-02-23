# AUTO GENERATED FILE - DO NOT EDIT

#' @export
'dwc'DashWebsocketComponent <- function(id=NULL, error=NULL, message=NULL, protocols=NULL, send=NULL, state=NULL, url=NULL) {
    
    props <- list(id=id, error=error, message=message, protocols=protocols, send=send, state=state, url=url)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashWebsocketComponent',
        namespace = 'dash_websocket_component',
        propNames = c('id', 'error', 'message', 'protocols', 'send', 'state', 'url'),
        package = 'dashWebsocketComponent'
        )

    structure(component, class = c('dash_component', 'list'))
}
