import dash_websocket_component
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

app.layout = html.Div([
    dash_websocket_component.DashWebsocketComponent(
        id='input',
        url="ws://127.0.0.1:5000/sensor"
    ),
    html.Div(id='output')
])


@callback(Output('output', 'children'), Input('input', 'message'))
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
