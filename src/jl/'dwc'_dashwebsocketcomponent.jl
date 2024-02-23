# AUTO GENERATED FILE - DO NOT EDIT

export 'dwc'_dashwebsocketcomponent

"""
    'dwc'_dashwebsocketcomponent(;kwargs...)

A DashWebsocketComponent component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `error` (Dict | String; optional): This property is set with the content of the onerror event.
- `message` (Dict | String; optional): When messages are received, this property is updated with the message content.
- `protocols` (Array of Strings; optional): Supported websocket protocols (optional).
- `send` (Dict | String; optional): When this property is set, a message is sent with its content.
- `state` (Dict | String; optional): This websocket state (in the readyState prop) and associated information.
- `url` (String; optional): The websocket endpoint (e.g. wss://echo.websocket.org).
"""
function 'dwc'_dashwebsocketcomponent(; kwargs...)
        available_props = Symbol[:id, :error, :message, :protocols, :send, :state, :url]
        wild_props = Symbol[]
        return Component("'dwc'_dashwebsocketcomponent", "DashWebsocketComponent", "dash_websocket_component", available_props, wild_props; kwargs...)
end

