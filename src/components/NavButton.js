import React, { PureComponent } from 'react';
import './NavButton.scss';

class NavButton extends PureComponent {
    render() {
        var classNames = "btn nav-btn"

        if (this.props.to === this.props.currPage)
            classNames += " clicked"

        return (
            <a href={this.props.to} className={classNames}>
                <div className="btn-bg"></div>
                <div className="btn-text">{this.props.text}</div>
            </a>
        )
    }
}

export default NavButton;