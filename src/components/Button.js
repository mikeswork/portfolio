import React, { PureComponent } from 'react';
import './Button.scss';

class Button extends PureComponent {
    render() {
        return (
            <button className="btn">{this.props.text}</button>
        )
    }
}

export default Button;