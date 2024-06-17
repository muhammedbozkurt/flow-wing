import React from 'react'
import "./styles.css"
const MailSubject = ({mail}) => {
  return (
          <div className="mail-title">
          <p>{mail.emailSubject}</p>
        </div>
  )
}

export default MailSubject