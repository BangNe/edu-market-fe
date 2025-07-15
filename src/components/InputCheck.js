import React from 'react'

const InputCheck = ({type, isChecked, text}) => {
  return (
    <div className={`input-check-box ${isChecked ? 'checked' : ''}`}>
        <div className={`input-check-box-input ${type}`}>
            <span>
                <i className="fa-solid fa-lightbulb"></i>
            </span>
        </div>
        <span className='input-check-box-name'>
            {text}
        </span>
    </div>
  )
}

export default InputCheck
