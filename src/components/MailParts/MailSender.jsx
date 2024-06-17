import { Avatar } from 'antd'
import React from 'react'
import "./styles.css"
const MailSender = ({mail,user}) => {
  return (
          <div className="mail-sender">
          <div className="user-icon-inbox">
            <Avatar
              size={64}
              style={{ backgroundColor: "#191970 ", color: "#add8e6 " }}
            >
              <span>{user.charAt(0)}</span>
            </Avatar>
          </div>
          <div>
            <div className="mail-sender-email">{mail.senderEmail}</div>
          </div>
        </div>
  )
}

export default MailSender