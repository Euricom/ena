import React, { ReactNode } from 'react';

import './Button.css';

export enum BUTTON_TYPES {
    green = 'green',
    red = 'red',
    blue = 'blue',
    orange = 'orange',
};

interface ButtonProps {
    icon?: string;
    children: ReactNode;
    color?: BUTTON_TYPES;
}

function Button({ icon, color=BUTTON_TYPES.green, children }: ButtonProps) {
    const colorClass = `button--${color}`;

    return (
        <button className={colorClass}>
            <span className="button__content">
                { icon && <i className="button__icon material-icons">{icon}</i> }
                <div className="button__text">
                    {children}
                </div>
            </span>
        </button>
    );
}

export default Button;
