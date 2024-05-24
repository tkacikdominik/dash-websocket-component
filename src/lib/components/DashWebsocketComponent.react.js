import React from 'react';
import PropTypes from 'prop-types';
import {DashWebsocketComponent as RealComponent} from '../LazyLoader';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
const DashWebsocketComponent = (props) => {
    return (
        <React.Suspense fallback={null}>
            <RealComponent {...props} />
        </React.Suspense>
    );
};

DashWebsocketComponent.defaultProps = {};

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

export default DashWebsocketComponent;

export const defaultProps = DashWebsocketComponent.defaultProps;
export const propTypes = DashWebsocketComponent.propTypes;
