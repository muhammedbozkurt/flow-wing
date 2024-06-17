import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import "./styles.css"
const DownloadButton = ({attachments}) => {
  return (
          <button
          className="attachment-download-btn"
          onClick={() => {
            const link = document.createElement("a")
            link.href = `data:${attachments.contentType};base64,${attachments.data}`
            link.download = attachments.fileName
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }}
        >
          <Icon
            icon="material-symbols:download"
            width="30"
            height="30"
            style={{ color: "#546e7a " }}
          />
        </button>
  )
}

export default DownloadButton