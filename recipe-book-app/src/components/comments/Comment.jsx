import { Link } from "react-router-dom"
import {
  ArrowUturnRightIcon,
  ChatBubbleLeftRightIcon,
  TrashIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { RoutesAPI } from "../../utils/RoutesAPI"
import Replys from "./Replys"
import { useState } from "react"
import { useContextNotification } from "../../providers/NotificationProvider"
import Answer from "./Answer"

//el diseño del comentario
const Comment = ({
  comment,
  onClikReply,
  user,
  onNotLogin,
  handleClickDeleteComment,
  // isAnswer = false,
  // commentId,
}) => {
  const [reply, setReply] = useState(false)
  const [replysHidden, setReplysHidden] = useState(true)
  const { addNotification } = useContextNotification()

  const checkReply = () => {
    if (user) {
      //llamar a createReply
      // addNotification({ message: "ola k ase!", type: "info" })
      setReplysHidden(!replysHidden)
    } else {
      onNotLogin(true)
    }
  }

  const onClickReply = () => {
    setReply(!reply)
  }

  return (
    <>
      <div className='flex flex-col gap-1 my-6 border px-2 py-3 rounded-xl shadow-md shadow-black/25 bg-orange-300/70'>
        <Link
          to={"#"}
          className='flex flex-row items-center gap-2 text-lg font-semibold hover:underline duration-300'
        >
          {comment.usuario?.urlPublica ? (
            <img
              src={`${comment.usuario?.urlPublica}`}
              alt='imagen de perfil'
              className='h-8 w-8 rounded-full'
            />
          ) : (
            <UserCircleIcon className='h-8 w-8 rounded-full text-gray-900 bg-gray-300' />
          )}
          {comment.usuario.usuario}
        </Link>
        <div className='text-gray-600 italic text-sm pl-5 list-item list-disc list-inside'>
          Comentado el {comment.createAt}
        </div>
        <p className='pl-10 pr-28'>{comment.comentario}</p>
        <div className='flex flex-row w-full items-center gap-2 pl-10 pt-2'>
          <button
            type='button'
            className='flex flex-row items-center gap-1 bg-orange-500 py-2 px-3 rounded-2xl font-semibold shadow-sm hover:shadow-black/40 hover:bg-orange-300'
            onClick={(e) => onClickReply()}
          >
            {reply ? (
              <>
                <XMarkIcon className='h-5 w-5' /> Cancelar
              </>
            ) : (
              <>
                <ArrowUturnRightIcon className='h-5 w-5' /> Responder
              </>
            )}
          </button>
          
          <button
            type='button'
            onClick={(e) => checkReply()}
            className='flex flex-row items-center gap-1 bg-orange-500 py-2 px-3 rounded-2xl font-semibold shadow-sm hover:shadow-black/40 hover:bg-orange-300'
          >
            {replysHidden ? (
              <>
                <ChatBubbleLeftRightIcon className='h-5 w-5' />{" "}
                {/* {comment.haveReply} Respuestas */}Mostrar
              </>
            ) : (
              <>
                <XMarkIcon className='h-5 w-5' />
                {/* {comment.haveReply} Respuestas */}Ocultar
              </>
            )}{" "}
            respuestas
          </button>
          

          {user ? (
            user.usuario === comment.usuario.usuario ? (
              <button
                type='button'
                onClick={(e) => handleClickDeleteComment(e, comment.id)}
                className='flex flex-row items-center gap-1 bg-orange-500 py-2 px-3 rounded-2xl font-semibold shadow-sm hover:shadow-black/40 hover:bg-orange-300'
              >
                <TrashIcon className='h-5 w-5' /> Borrar
              </button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <Answer isHidden={!reply} comment={comment} commentId={comment.id} />
      <Replys isHidden={replysHidden} commentId={comment.id} user={user} onNotLogin={onNotLogin} />
    </>
  )
}

export default Comment
