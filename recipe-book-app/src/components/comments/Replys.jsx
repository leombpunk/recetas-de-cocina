import { useState, useEffect } from "react"
import { Transition } from "@headlessui/react"
import LoaderMini from "../loader/LoaderMini"
import useReplys from "../../hooks/useReplys"
import CustomModal from "../modals/CustomModal"
import Reply from "./Reply"

//el listado de respuestas a un comentario
const Replys = ({ isHidden = true, commentId, user, onNotLogin }) => {
  const [openModal, setOpenModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [replyId, setReplyId] = useState(0)
  //cargar las respuestas
  const { errors, getReplys, loading, replys, deleteReply } = useReplys()
  const [replyData, setReplyData] = useState({})
  const [show, setShow] = useState(true)

  const handleClickReply = (data) => {
    setShow(!show)
    setReplyData(data)
    // console.log({ datito: data })
  }

  const handleClickDeleteReply = (event, replyId) => {
    event.preventDefault()
    setOpenModal(true)
    setReplyId(replyId)
  }

  useEffect(() => {
    if (!isHidden) {
      getReplys(commentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHidden])

  useEffect(() => {
    if (confirm) {
      if (replyId) {
        deleteReply(replyId)
        setConfirm(false)
      }
      if (replyId) {
        setConfirm(false)
      }
    }

    if (cancel) {
      setReplyId(0)
      setReplyId(0)
      setCancel(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm, cancel])

  return (
    <>
      {isHidden ? (
        ""
      ) : loading ? (
        <div className='flex flex-row items-center justify-center w-full pb-8'>
          <LoaderMini />
        </div>
      ) : replys.length ? (
        <>
          <Transition
            appear={true}
            show={!isHidden}
            enter='transition duration-700 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-300 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            {replys.map((reply, index) => (
              <div
                key={index}
                className={`flex flex-col gap-0 my-0 ml-14`}
              >
                <Reply 
                  onNotLogin={onNotLogin}
                  handleClickDeleteReply={handleClickDeleteReply}
                  replyData={reply}
                  user={user}
                  />
              </div>
            ))}
          </Transition>
        </>
      ) : (
        <div className='text-center text-xl italic text-gray-600/60 font-medium border-b border-gray-500/60 py-5'>
          <p>Aun no hay respuestas!</p>
        </div>
      )}
      <CustomModal
        open={openModal}
        setOpen={setOpenModal}
        confirm={true}
        setConfirm={setConfirm}
        setCancel={setCancel}
      >
        <div className='pt-12 pb-6'>
          <p className='font-semibold text-2xl text-center'>
            ¿Deseas borrar tu respuesta?
          </p>
        </div>
      </CustomModal>
    </>
  )
}

export default Replys
