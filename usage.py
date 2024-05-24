import dash_websocket_component
from dash import Dash, callback, html, Input, Output
import json

app = Dash(__name__)

app.layout = html.Div([
    dash_websocket_component.DashWebsocketComponent(
        id='input',
        maxReconnectAttempts=10,
        reconnectIntervalMs=5_000,
    ),
    html.Div(id='output'),
    html.Button("Send msg", id='test-send'),
    html.Button("set url", id='set-url')
])


@callback(Output('output', 'children'), Input('input', 'message'))
def display_output(value):
    return 'You have entered {}'.format(value)

@callback(Output('input', 'send'), Input('test-send', 'n_clicks'))
def send_message(value):
    if value is not None:
        return json.dumps({"test": "message", "n_clicks": value})
    return None

@callback(Output('input', 'url'), Input('set-url', 'n_clicks'))
def set_url(value):
    if value is not None:
        return "ws://127.0.0.1:5000/sensor"
    return None
    

if __name__ == '__main__':
    app.run_server(debug=True)
