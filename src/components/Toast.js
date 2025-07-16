import { useState, useEffect, useRef } from 'react'

const Toast = ({ title, status, time, onSetIsCloseToast }) => {
  const [progress, setProgress] = useState(100)
  const intervalRef = useRef(null)

  useEffect(() => {
    const intervalTime = 50
    const totalSteps = time / intervalTime
    let currentStep = 0

    intervalRef.current = setInterval(() => {
      currentStep++
      const newProgress = Math.max(0, 100 - (currentStep / totalSteps) * 100)
      setProgress(newProgress)

      if (currentStep >= totalSteps) {
        clearInterval(intervalRef.current)
        onSetIsCloseToast(false)
      }
    }, intervalTime)

    return () => clearInterval(intervalRef.current)
  }, [time, onSetIsCloseToast])

  const handleClose = (e) => {
    e.preventDefault()
    clearInterval(intervalRef.current)
    onSetIsCloseToast(false)
  }

  return (
    <div className={`toast_wrapper ${status}`}>
      <div className='toast_icon'>
        <i className='fa-solid fa-circle-check'></i>
      </div>
      <div className='toast_content'>
        <h1>{status}</h1>
        <p>{title}</p>
      </div>

      <div
        className='toast_line'
        style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
      ></div>

      <div className='toast-close' onClick={(e) => handleClose(e)}>
        <span>
          <i className='fa-solid fa-circle-xmark'></i>
        </span>
      </div>
    </div>
  )
}

export default Toast
