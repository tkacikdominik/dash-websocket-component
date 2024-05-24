import {Component} from 'react';
import PropTypes from 'prop-types';

const UNLIMITED_RECONNECT_ATTEMPTS = -1;
const DEFAULT_RECONNECT_INTERVAL_MS = 2000;
export default class DashWebsocketComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isConnected: false,
          reconnectAttempts: 0
        };
    }

    componentDidMount() {
        if (this.props.url){
            this.connectWebSocket();
        }
    }

    componentDidUpdate(prevProps) {
        const {send, url} = this.props;
        if (this.ws == null){
            if (url != null){
                this.connectWebSocket();
            } else {
                return;
            }
        }

        if (send && send !== prevProps.send) {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(send);
            } else {
                console.error(`Trying to send data -> ${send} over closed websocket connection.`);
            }
        }
    }
    
    componentWillUnmount() {
        this.disconnectWebSocket();
    }

    attemptReconnect() {
        if (
            (this.props.maxReconnectAttempts === UNLIMITED_RECONNECT_ATTEMPTS) ||
            (this.state.reconnectAttempts < this.props.maxReconnectAttempts)
        ) {
          setTimeout(() => {
            this.setState({reconnectAttempts: this.state.reconnectAttempts += 1});
            let maxReconnectAttemptsStr = (
                this.props.maxReconnectAttempts == UNLIMITED_RECONNECT_ATTEMPTS ? 'Unlimited' : this.props.maxReconnectAttempts
            );
            console.log(
                `Attempting to reconnect... Attempt (${this.state.reconnectAttempts}/${maxReconnectAttemptsStr})`
            );
            this.connectWebSocket();
          }, this.props.reconnectIntervalMs);
        } else {
          console.error('Max reconnect attempts reached.');
        }
    };

    connectWebSocket() {
        const { url, protocols } = this.props;

        this.ws = new WebSocket(url, protocols);    

        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.setState({
                isConnected: true,
                reconnectAttempts: 0
            });
        };

        this.ws.onmessage = (msg) => {
            this.props.setProps({
                message: {
                    data: msg.data,
                    isTrusted: msg.isTrusted,
                    origin: msg.origin,
                    timeStamp: msg.timeStamp,
                }
            });
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
            this.setState({ isConnected: false });
            this.disconnectWebSocket();
            this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
            this.props.setProps({error: JSON.stringify(error)});
            if (this.ws?.readyState == WebSocket.OPEN){
                this.ws.close();
            }
        };
    };

    disconnectWebSocket() {
        if (this.ws?.readyState == WebSocket.OPEN || this.ws?.readyState == WebSocket.CONNECTING) {
          this.ws.close();
          delete this.ws;
        }
    };
    
    render() {
        return null;
    }
}

DashWebsocketComponent.defaultProps = {
    state: {},
    maxReconnectAttempts: UNLIMITED_RECONNECT_ATTEMPTS,
    reconnectIntervalMs: DEFAULT_RECONNECT_INTERVAL_MS,
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
     * Supported websocket protocols (optional).
     */
    protocols: PropTypes.arrayOf(PropTypes.string),

    /**
     * Duration between attempts to reconnect. Default = 2000ms -> 2sec.
     */
    reconnectIntervalMs: PropTypes.number,
    
    /**
     * Max count of the reconnect attempts. Default = -1 -> Unlimited. 
     */
    maxReconnectAttempts: PropTypes.number,

    /**
     * The websocket endpoint (e.g. wss://echo.websocket.org).
     */
    url: PropTypes.string,

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