import {Component} from 'react';
import PropTypes from 'prop-types';

export default class DashWebsocketComponent extends Component {
    _init_client() {
        let {url} = this.props;
        const {protocols} = this.props;
        url = url ? url : 'ws://' + location.host + location.pathname + 'ws';
        this.client = new WebSocket(url, protocols);

        this.client.onopen = (e) => {
            this.props.setProps({
                ...this.props,
                state: {
                    readyState: WebSocket.OPEN,
                    isTrusted: e.isTrusted,
                    timeStamp: e.timeStamp,
                    origin: e.origin,
                    lastConnected: Number(new Date()),
                },
            });
        };
        this.client.onmessage = (e) => {
            this.props.setProps({
                ...this.props,
                state: {
                    lastConnected: Number(new Date()),
                },
                message: {
                    data: e.data,
                    isTrusted: e.isTrusted,
                    origin: e.origin,
                    timeStamp: e.timeStamp,
                },
            });
        };
        this.client.onerror = (e) => {
            this.props.setProps({error: JSON.stringify(e)});
        };
        this.client.onclose = (e) => {
            this.props.setProps({
                ...this.props,
                error: JSON.stringify(e),
                state: {
                    readyState: WebSocket.CLOSED,
                    isTrusted: e.isTrusted,
                    timeStamp: e.timeStamp,
                    code: e.code,
                    reason: e.reason,
                    wasClean: e.wasClean,
                    lastConnected: Number(new Date()),
                },
            });
        };
    }

    componentDidMount() {
        this.props.setProps({
            state: {
                ...this.props.state,
                lastConnected: 0,
            },
        });
        this._init_client();
    }

    componentDidUpdate(prevProps) {
        if (this.client.readyState === WebSocket.CLOSED) {
            this._init_client();
        }

        const {send} = this.props;
        if (send && send !== prevProps.send) {
            if (this.client.readyState === WebSocket.OPEN) {
                this.client.send(send);
            }
            // TODO handle this
        }
    }

    componentWillUnmount() {
        this.client.onopen = null;
        this.client.onclose = null;
        this.client.onerror = null;
        this.client.onmessage = null;
        this.client.close();
    }

    render() {
        return null;
    }
}

DashWebsocketComponent.defaultProps = {
    state: {readyState: WebSocket.CONNECTING},
};

DashWebsocketComponent.propTypes = {
    /**
     * This websocket state (in the readyState prop) and associated information.
     */
    state: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * When messages are received, this property is updated with the message content.
     */
    message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * This property is set with the content of the onerror event.
     */
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * When this property is set, a message is sent with its content.
     */
    send: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * The websocket endpoint (e.g. wss://echo.websocket.org).
     */
    url: PropTypes.string,

    /**
     * Supported websocket protocols (optional).
     */
    protocols: PropTypes.arrayOf(PropTypes.string),

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,
};
