import React from 'react'
import Attachments from '../Attachments/Attachments'
import { formatDate, getText } from '../../helpers'

const ForwardedFrom = ({forwardedFrom,forwardedMailAttachments}) => {
  return (
          <div className="forwarded-from-section">
          <div>
            {" "}
            <span>----- Şu mesaj iletildi -----</span>
          </div>
          <div>
            <span>Gönderen: </span>
            <p>{forwardedFrom.senderEmail}</p>{" "}
          </div>
          <div>
            {" "}
            <span>Tarih: </span>
            <p> {formatDate(forwardedFrom.sentDateTime)}</p>
          </div>
          <div>
            <span>Konu: </span>
            <p> {forwardedFrom.emailSubject}</p>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: getText(forwardedFrom.sentEmailBody)
            }}
          />
          {/* FORWARDED FROMS ATTACHMENT SECTION */}
          {forwardedMailAttachments?.map((attachments) => (
            <div className="inbox-mail-attachment">
            <Attachments attachments={attachments}

/>
              {}{" "}
            </div>
          ))}
        </div>
  )
}

export default ForwardedFrom