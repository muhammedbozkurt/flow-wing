import React, { useEffect, useState } from "react"
import "./sentbox.css"
import { useNavigate, useParams } from "react-router"
import {
  deleteSentEmail,
  forwardEmail,
  getEmailAndAnswersByEmailLogId,
  getEmailById,
  getForwardedMailById,
  replyMail
} from "../../services/emailService"
import Spinner from "../../components/Spinner"
import { Avatar, Button, Divider, Modal, Tooltip } from "antd"
import { Icon } from "@iconify/react"
import ReactQuill from "react-quill"
import { formatDate, getText } from "../../helpers"
import alertify from "alertifyjs"
import { HOME_ROUTE } from "../../routes"
import Attachments from "../../components/Attachments/Attachments"
import ForwardedFrom from "../../components/ForwardedFromSection/ForwardedFrom"
import MailSender from "../../components/MailParts/MailSender"
import MailSubject from "../../components/MailParts/MailSubject"
import MailBody from "../../components/MailParts/MailBody"

const Sentbox = () => {
  const [mail, setMail] = useState(null)
  const [attachments, setAttachments] = useState([])
  const [sender, setSender] = useState(true)
  const [user, setUser] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [forwardMOdalOpen, setForwardModalOpen] = useState(false)
  const [repliedMailBody, setRepliedMailBody] = useState("")
  const [forwardTo, setForwardTo] = useState("")
  const [forwardedEmailMessage, setForwardedEmailMessage] = useState("")
  const [forwardedMailId, setForwardedMailId] = useState("")
  const [forwardedFrom, setForwardedFrom] = useState("")
  const [replyAttachment, setReplyAttachment] = useState("")
  const [answerArray, setAnswerArray] = useState([])
  const [forwardedMailAttachments, setForwardedMailAttachments] = useState([])
  let navigate = useNavigate()
  let { id } = useParams()

  // MODAL
  const showModal = () => {
    setOpen(true)
  }

  const showForwardModal = () => {
    setForwardModalOpen(true)
  }
  const handleOk = () => {
    if (!repliedMailBody) {
      alertify.error("Lütfen geçerli bir mesaj girin")
    } else {
      replyEmail()
      setOpen(false)
    }
  }
  const handleForwardOk = () => {
    if (!forwardTo || !forwardedEmailMessage) {
      alertify.error("Lütfen tüm alanları doldurun")
    } else {
      setForwardModalOpen(false)
      handleForward()
    }
  }
  const handleCancel = () => {
    setOpen(false)
    setForwardModalOpen(false)
  }


  // GET SINGLE MAIL BY ID

  useEffect(() => {
    getEmailById(id).then((res) => {
      setMail(res.data.emailLog)
      //console.log("get mail by id", res.data)

      setAttachments(res.data.attachments)
     // console.log("attachment: ", res.data.attachments)
     // console.log("attachment2: ", attachments)
      setSender(res.data.sender)
      //console.log("mail sender", sender)
      setUser(res.data.emailLog.user.username)
    })

    getEmailAndAnswersByEmailLogId(id).then((response) => {
    //  console.log("info endpoint :", response)

      setForwardedMailAttachments(response.data.forwardedEmailAttacments)
    //  console.log("forwrd atchmnts ", response.data.forwardedEmailAttacments)
    //  console.log("forwrd atchmnts ", forwardedMailAttachments)

    //  console.log("info endpoint answers :", response.data.answers)
      setAnswerArray(response.data.answers)
    //  console.log("setAnswerArray'e gönderilen ", response.data.answers)
    //  console.log("answers attvchmrnt", answerArray.attachmentInfos)
     // console.log("forwarded mail ", response.data.forwardedEmailLog)
      setForwardedFrom(response.data.forwardedEmailLog)
    //  console.log(" answer : ", response.data.emailLog.answer)
      setAnswer(response.data.emailLog.answer)
     // console.log("answer emaillog ", answer?.emailLog?.sentEmailBody)
      setForwardedMailId(response.data.emailLog.forwardedFrom)
     // console.log("forwarded mail id", forwardedMailId)
    })

    getForwardedMailById(forwardedMailId).then((res) => {
     // console.log("forwarded mail ", res.data.forwardedEmailLog)
      setForwardedFrom(res.data.emailLog)
      setForwardedMailId(res.data.emailLog.forwardedFrom)
    })

    return () => {}
  }, [mail?.forwardedFrom])

  // SPINNER
  if (!mail) {
    return <Spinner />
  }
  // DELETE AN EMAIL
  const handleDelete = () => {
    deleteSentEmail(mail.id).then((res) => {
      //console.log(res)
      if (res.status === 200) {
        alertify.success("Mail silindi")
      } else alertify.error(res.message)
      navigate(HOME_ROUTE)
    })
  }

  // REPLY AN EMAIL

  const replyEmail = () => {
    const values = {
      recipientsEmail: mail.recipientsEmail,
      emailSubject: mail.emailSubject,
      emailBody: repliedMailBody,
      RepliedEmailId: mail.answer ? answer : mail.id,
      file: replyAttachment
    }
    const formData = new FormData()
    if (values.file && values.file.length > 0) {
      formData.append("attachment", values.file[0])
    } else {
      formData == []
    }
    replyMail(values, formData).then((res) => {
      if (res.status === 400) {
        alertify.error("Bu mail yalnızca bir kez yanıtlanabilir")
      } else if (res.status === 201) {
        setMail(res.data.emailLog)
        alertify.success("Mail yanıtlandı")
      }
    })

    navigate()
  }
// QUILL TOOLBAR
const toolbarOptions = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"]
  ]
}
  // FORWARD EMAIL

  const handleForward = () => {
    const values = {
      recipientsEmail: forwardTo,
      emailSubject: mail.emailSubject,
      emailBody: forwardedEmailMessage,
      ForwardedEmailId: mail.id,
      file: []
    }
   // console.log("handleForward'ın içindesin")
    forwardEmail(values).then((res) => {
      //console.log("forward mail fonksiyonunun içindesin")
      if (res.status === 201) {
        alertify.success("Mail iletildi")
      } else alertify.error(res.message)
    })

    navigate()
  }

  return (
    <div className="inbox-page-content">
      {/* MAIL ACTIONS  */}

      <div className="mail-actions">
        <Tooltip title="İlet" arrow onClick={showForwardModal}>
          <div className="icons">
            <button className="mail-action-btns">
              <Icon
                icon="solar:multiple-forward-right-bold-duotone"
                width="25"
                height="25"
                color="#feb019 "
              />
            </button>
          </div>
        </Tooltip>

        {/* MODAL FOR FORWARD EMAIL */}
        <Modal
          open={forwardMOdalOpen}
          title="İLET"
          onOk={handleForwardOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Geri
            </Button>,
            <Button key="submit" type="primary" onClick={handleForwardOk}>
              Gönder
            </Button>
          ]}
        >
          <form className="forward-modal-form">
            <label>Kime: </label>{" "}
            <input
              style={{ height: 50, border: "none" }}
              required
              onChange={(e) => {
                setForwardTo(e.target.value)
              }}
            />
            <label>Mesaj: </label>{" "}
            <ReactQuill
              modules={toolbarOptions}
              theme="bubble"
              name="emailBody"
              style={{ height: 150, boxShadow: "rgba(0, 0, 0, 0.1)" }}
              onChange={(value) => {
                setForwardedEmailMessage(value)
              }}
              required
            />
            <br />
            <br />
            <br />
            <br />
            <span>-------Şu mesaj iletilecek-------</span>
            <p>
              {" "}
              <span>Gönderen:</span> {mail.senderEmail}
            </p>
            <p>
              {" "}
              <span>Tarih: </span> {formatDate(mail.sentDateTime)}{" "}
            </p>
            <p>
              {" "}
              <span>Konu:</span> {mail.emailSubject}
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: getText(mail.sentEmailBody) }}
            />
          </form>
        </Modal>

        <Tooltip title="Yanıtla" arrow onClick={showModal}>
          <div className="icons">
            <button className="mail-action-btns">
              <Icon
                icon="ic:round-reply"
                width="30"
                height="30"
                color="#ffa07a "
              />
            </button>
          </div>{" "}
        </Tooltip>
        {/* MODAL FOR REPLY EMAIL */}
        <Modal
          open={open}
          title="YANITLA"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Geri
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Gönder
            </Button>
          ]}
        >
          <form className="reply-modal-form">
            <label type="text">
              <span>Kime: </span>
              {mail.recipientsEmail}
            </label>
            <label type="text">
              <span>Konu: </span>
              {mail.emailSubject}
            </label>
            <span>Mesaj: </span>
            <ReactQuill
              modules={toolbarOptions}
              theme="bubble"
              name="emailBody"
              style={{ height: 150, boxShadow: "rgba(0, 0, 0, 0.1)" }}
              onChange={(value) => setRepliedMailBody(value)}
              required
            />

            <input
              id="attachment"
              name="attachment"
              type="file"
              multiple
              onChange={(event) => {
                const selectedFiles = event.currentTarget.files
                // Tüm dosyaları içeren bir nesne oluşturun
                const filesObject = {}
                for (let i = 0; i < selectedFiles.length; i++) {
                  const file = selectedFiles[i]
                  filesObject[`file[${i}]`] = file
                }
                // Dosyaları bir nesne olarak ayarlayın
                setReplyAttachment(filesObject)
              }}
            />
          </form>
        </Modal>
        <Tooltip title="Sil" arrow>
          <div className="icons">
            <button className="mail-action-btns" onClick={handleDelete}>
              <Icon
                icon="iconoir:trash-solid"
                width="25"
                height="25"
                color="#ff4560 "
              />
            </button>
          </div>
        </Tooltip>
      </div>
      <Divider />
      {/* MAIL SECTION */}
      <MailSender
      user={user}
      mail={mail}
     />

    <MailSubject
      mail={mail}
    />
      <MailBody
        mail={mail}
      />

      {/* MAIL ATTACHMENT SECTION */}
      <div className="mail-attachments">
        {/* ATTACHMENT */}
        <div className="inbox-mail-attachment-content">
          {attachments?.map((attachments) => (
            <div className="inbox-mail-attachment">
             <Attachments attachments={attachments}

             />
              {}{" "}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* MAIL ANSWER SECTION */}
      {answerArray.map((answer) => (
        <div className="mail-answers">
          <div className="mail-answer-content">
            {/* MAIL ANSWER ACTIONS */}
            <div className="mail-actions">
              <Tooltip title="İlet" arrow onClick={showForwardModal}>
                <div className="icons">
                  <button className="mail-action-btns">
                    <Icon
                      icon="solar:multiple-forward-right-bold-duotone"
                      width="25"
                      height="25"
                      color="#feb019 "
                    />
                  </button>
                </div>
              </Tooltip>

              {/* MODAL FOR FORWARD EMAIL */}
              <Modal
          open={forwardMOdalOpen}
          title="İLET"
          onOk={handleForwardOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Geri
            </Button>,
            <Button key="submit" type="primary" onClick={handleForwardOk}>
              Gönder
            </Button>
          ]}
        >
          <form className="forward-modal-form">
            <label>Kime: </label>{" "}
            <input
              style={{ height: 50, border: "none" }}
              required
              onChange={(e) => {
                setForwardTo(e.target.value)
              }}
            />
            <label>Mesaj: </label>{" "}
            <ReactQuill
              modules={toolbarOptions}
              theme="bubble"
              name="emailBody"
              style={{ height: 150, boxShadow: "rgba(0, 0, 0, 0.1)" }}
              onChange={(value) => {
                setForwardedEmailMessage(value)
              }}
              required
            />
            <br />
            <br />
            <br />
            <br />
            <span>-------Şu mesaj iletilecek-------</span>
            <p>
              {" "}
              <span>Gönderen:</span> {mail.senderEmail}
            </p>
            <p>
              {" "}
              <span>Tarih: </span> {formatDate(mail.sentDateTime)}{" "}
            </p>
            <p>
              {" "}
              <span>Konu:</span> {mail.emailSubject}
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: getText(mail.sentEmailBody) }}
            />
          </form>
        </Modal>

              <Tooltip title="Yanıtla" arrow onClick={showModal}>
                <div className="icons">
                  <button className="mail-action-btns">
                    <Icon
                      icon="ic:round-reply"
                      width="30"
                      height="30"
                      color="#ffa07a "
                    />
                  </button>
                </div>{" "}
              </Tooltip>
              {/* MODAL FOR REPLY EMAIL */}
              <Modal
                open={open}
                title="YANITLA"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Geri
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                  >
                    Gönder
                  </Button>
                ]}
              >
                <form className="reply-modal-form">
                  <label type="text">
                    <span>Kime: </span>
                    {mail.recipientsEmail}
                  </label>
                  <label type="text">
                    <span>Konu: </span>
                    {mail.emailSubject}
                  </label>
                  <span>Mesaj: </span>
                  <ReactQuill
                    modules={toolbarOptions}
                    theme="bubble"
                    name="emailBody"
                    style={{ height: 150, boxShadow: "rgba(0, 0, 0, 0.1)" }}
                    onChange={(value) => setRepliedMailBody(value)}
                    required
                  />
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    multiple
                    onChange={(event) => {
                      const selectedFiles = event.currentTarget.files
                      // Tüm dosyaları içeren bir nesne oluşturun
                      const filesObject = {}
                      for (let i = 0; i < selectedFiles.length; i++) {
                        const file = selectedFiles[i]
                        filesObject[`file[${i}]`] = file
                      }
                      // Dosyaları bir nesne olarak ayarlayın
                      setReplyAttachment(filesObject)
                    }}
                  />
                </form>
              </Modal>
              <Tooltip title="Sil" arrow>
                <div className="icons">
                  <button className="mail-action-btns" onClick={handleDelete}>
                    <Icon
                      icon="iconoir:trash-solid"
                      width="25"
                      height="25"
                      color="#ff4560 "
                    />
                  </button>
                </div>
              </Tooltip>
            </div>

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
                <div className="mail-sender-email">
                  from: {answer?.emailLog.senderEmail}
                </div>
                <div className="mail-sender-email">
                  to: {answer?.emailLog.recipientsEmail}
                </div>

                <p className="mail-answer-sent-time">
                  {formatDate(answer?.emailLog.sentDateTime)}
                </p>
              </div>
            </div>

            <div className="mail-answer-title">
              <p>{answer?.emailLog.emailSubject}</p>
            </div>

            <p
              className="mail-answer-mail-body"
              dangerouslySetInnerHTML={{
                __html: getText(answer?.emailLog.sentEmailBody)
              }}
            />
          </div>{" "}
          {/* MAIL ANSWERS ATTACHMENTS */}
          {answer.attachmentInfos?.map((attachments) => (
            <div className="inbox-mail-attachment">
            <Attachments attachments={attachments}

             />
              {}{" "}
            </div>
          ))}
          <Divider />
        </div>
      ))}

      {/* IS FORWARDED SECTION */}

      {forwardedFrom ? (
      <ForwardedFrom
        forwardedFrom={forwardedFrom}
        forwardedMailAttachments={forwardedMailAttachments} 
      />
      ) : null}
    </div>
  )
}

export default Sentbox
