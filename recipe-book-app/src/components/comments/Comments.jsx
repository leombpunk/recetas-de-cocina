import { useEffect, useState } from "react"
import {
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { RoutesAPI } from "../../utils/RoutesAPI"
import useComments from "../../hooks/useComments"
import { useContextUser } from "../../providers/UserProvider"
import { useContextNotification } from "../../providers/NotificationProvider"
import Loader from "../loader/Loader"
import CustomModal from "../modals/CustomModal"
import Comment from "./Comment"

const Comments = ({ recipeId, onNotLogin }) => {
  const { loading, comments, createComment, deleteComment } =
    useComments(recipeId)
  const { user } = useContextUser()
  const { addNotification } = useContextNotification()
  const [comment, setComment] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [commentId, setCommentId] = useState(0)
  const [replyId, setReplyId] = useState(0)

  const handleClickDeleteComment = (event, commentId) => {
    event.preventDefault()
    setOpenModal(true)
    setCommentId(commentId)
  }

  // const handleClickDeleteReply = (event, replyId) => {
  //   event.preventDefault()
  //   setOpenModal(true)
  //   setReplyId(replyId)
  // }

  const checkComment = (event) => {
    event.preventDefault()
    if (user) {
      //llamar a createComent
      console.log({ usuario: user })
      // addNotification({ message: "ola k ase!", type: "info" })
      if (comment.length) {
        createComment({ comentario: comment })
      } else {
        addNotification({
          message: "Escribe algo en el cuadro de comentario!",
          type: "info",
        })
      }
    } else {
      onNotLogin(true)
    }
  }
  // const checkReply = () => {
  //   if (user) {
  //     //llamar a createReply
  //     addNotification({ message: "ola k ase!", type: "info" })
  //   } else {
  //     onNotLogin(true)
  //   }
  // }

  useEffect(() => {
    if (confirm) {
      if (commentId) {
        deleteComment(commentId)
        setConfirm(false)
      }
      if (replyId) {
        setConfirm(false)
      }
    }

    if (cancel) {
      setCommentId(0)
      setReplyId(0)
      setCancel(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm, cancel])

  return (
    <div className='px-2 flex flex-col gap-3 mt-10'>
      <h2 className='text-3xl font-semibold'>Comentarios</h2>
      <div className='w-full bg-orange-400 rounded-2xl shadow-sm shadow-black/30 p-1 md:p-5'>
        <form className='w-full mt-3 pt-3 pb-5 px-1 md:pl-8 md:pr-3 border-b-2 border-black/40'>
          <div className='flex flex-row gap-2'>
            {comment.usuario?.imagen ? (
              <img
                src={`${RoutesAPI.public}/${comment.usuario?.usuario}/${comment.usuario?.imagen}`}
                alt='imagen de perfil'
                className='w-11 h-11 rounded-full'
              />
            ) : (
              <UserCircleIcon className='w-11 h-11 rounded-full text-gray-900 bg-gray-300' />
            )}
            <textarea
              className='w-full bg-orange-200 rounded-2xl'
              placeholder='Deja un comentario al autor de esta receta'
              rows={5}
              onChange={(event) => setComment(event.target.value)}
            ></textarea>
          </div>
          <div className='flex flex-row justify-end items-center mt-2'>
            <button
              onClick={(e) => checkComment(e)}
              type='submit'
              className='flex flex-row items-center gap-1 bg-orange-500 py-2 px-3 rounded-2xl font-semibold shadow-sm hover:shadow-black/40 hover:bg-orange-300'
            >
              <ChatBubbleOvalLeftEllipsisIcon className='w-5 h-5' />
              Comentar
            </button>
          </div>
        </form>
        <div className='mt-8'>
          {loading ? (
            <Loader />
          ) : comments.length ? (
            comments.map((comment, index) => (
              <Comment
                comment={comment}
                key={index}
                user={user}
                onNotLogin={onNotLogin}
                handleClickDeleteComment={handleClickDeleteComment}
              />
            ))
          ) : (
            <div className='flex flex-row items-center justify-center py-3'>
              <p className='text-gray-800/70 text-center italic text-3xl font-medium'>
                Aún no hay comentarios! <span className='not-italic'>😢</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <CustomModal
        open={openModal}
        setOpen={setOpenModal}
        confirm={true}
        setConfirm={setConfirm}
        setCancel={setCancel}
      >
        <div className='pt-12 pb-6'>
          <p className='font-semibold text-2xl text-center'>
            ¿Deseas borrar tu comentario?
          </p>
        </div>
      </CustomModal>
    </div>
  )
}

export default Comments
