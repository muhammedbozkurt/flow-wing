import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import DownloadButton from '../Buttons/DownloadButton'

const Attachments = ({attachments}) => {
  return (
          <div>
          {" "}
          <Icon icon="et:attachments" width="16" height="16" />
          {attachments.contentType === "text/plain" && (
            <div>
              <a
                href={`data:text/plain;base64,${attachments.data}`}
                download={attachments.fileName}
              >
                {attachments.fileName}
              </a>
            </div>
          )}
          {attachments.contentType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
            <a
              href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${attachments.data}`}
              target="_blank"
              download={attachments.fileName}
            >
              {attachments.fileName}
            </a>
          )}
          {attachments.contentType === "application/pdf" && (
            <a
              href={`data:application/pdf;base64,${attachments.data}`}
              target="_blank"
            >
              {attachments.fileName}{" "}
            </a>
          )}
          {["image/jpeg", "image/png", "image/gif"].includes(
            attachments.contentType
          ) && (
            <a
              href={`data:${attachments.contentType};base64,${attachments.data}`}
              target="_blank"
            >
              {attachments.fileName}{" "}
            </a>
          )}
          {["application/octet-stream", "application/zip"].includes(
            attachments.contentType
          ) && (
            <div>
              <a
                href={`data:application/octet-stream;base64,${attachments.data}`}
                download={attachments.fileName}
              >
                {attachments.fileName}
              </a>
            </div>
          )}{" "}
          {/* İndirme Düğmesi */}
         <DownloadButton
          attachments={attachments}
         />
        </div>
  )
}

export default Attachments