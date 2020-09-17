import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import './Button.css';
import './NavButton.css';

class NavButton extends PureComponent {
    render() {
        var classNames = "btn nav-btn"

        if (this.props.to === this.props.currPage)
            classNames += " clicked"

        return (
           <Link to={this.props.to} className={classNames}>{this.props.text}</Link>
        )
    }
}

export default NavButton;