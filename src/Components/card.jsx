import React from 'react'

function Card(props) {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{props.title}</h4>
                <h6 className="card-subtilte text-muted">{props.subtitle}</h6>
                <p className="card-text">
                    {props.text}
                </p>
            </div>
            <div className="card-footer">
                Skapad: xx:xx
               </div>
        </div>
    )
}

export default Card;