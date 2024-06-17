import React from 'react'
import { getText } from '../../helpers'
import "./styles.css"

const MailBody = ({mail}) => {
  return (
          <div
          className="mail-body"
          dangerouslySetInnerHTML={{ __html: getText(mail.sentEmailBody) }}
          style={{ width: "90%" }}
        />
  )
}

export default MailBody