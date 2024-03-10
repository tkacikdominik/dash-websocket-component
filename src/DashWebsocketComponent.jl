
module DashWebsocketComponent
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.3"

include("jl/'dwc'_dashwebsocketcomponent.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_websocket_component",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "async-DashWebsocketComponent.js",
    external_url = "https://unpkg.com/dash_websocket_component@0.0.3/dash_websocket_component/async-DashWebsocketComponent.js",
    dynamic = nothing,
    async = :true,
    type = :js
),
DashBase.Resource(
    relative_package_path = "async-DashWebsocketComponent.js.map",
    external_url = "https://unpkg.com/dash_websocket_component@0.0.3/dash_websocket_component/async-DashWebsocketComponent.js.map",
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_websocket_component.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_websocket_component.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
