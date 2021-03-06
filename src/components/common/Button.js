import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'

const STYLES  = ['btn--primary', 'btn--outline']
const SIZES = ['btn--medium', 'btn--large']

function Button({
    path,
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) {
    const checkButtonStyles = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSizes = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
    return (
        // 使用template string才能使prop值字串化
        <Link to={`${path}`} className='btn-mobile'>
            <button
                className={`bttn ${checkButtonStyles} ${checkButtonSizes}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
        )

}

export default Button