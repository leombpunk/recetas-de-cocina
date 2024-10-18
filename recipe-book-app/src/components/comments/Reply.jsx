import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowUturnRightIcon,
  TrashIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { RoutesAPI } from "../../utils/RoutesAPI"
import { useContextNotification } from "../../providers/NotificationProvider"
import Answer from "./Answer"

//el diseño del comentario
const Reply = ({
  replyData,
  onClikReply,
  user,
  onNotLogin,
  handleClickDeleteReply,
  isOwn = false
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
      <div className={`flex flex-col gap-1 my-3 ${isOwn ? 'border-2 border-black/50' : 'border'} px-2 py-3 rounded-xl shadow-md shadow-black/25 bg-orange-300/70`}>
        <div className='w-full flex flex-row items-center gap-2'>
          <Link
            to={"#"}
            className='flex flex-row items-center gap-2 text-lg font-semibold hover:underline duration-300'
          >
            {replyData.usuario?.imagen ? (
              <img
                src={`${RoutesAPI.staticFiles}/avatars/${replyData.usuario?.imagen}`}
                alt='imagen de perfil'
                className='h-8 w-8 rounded-full'
              />
            ) : (
              <UserCircleIcon className='h-8 w-8 rounded-full text-gray-900 bg-gray-300' />
            )}
            {replyData.usuario.usuario}
          </Link>
          <span className="text-gray-600 text-base italic"> respondió a <span className="font-medium text-gray-900 italic bg-gray-300/60 rounded-xl py-0.5 px-2">{replyData.mension.usuario}</span></span>
        </div>
        <div className='text-gray-600 italic text-sm pl-5 list-item list-disc list-inside'>
          Comentado el {replyData.createAt}
        </div>
        <p className='pl-10 pr-28'>{replyData.respuesta}</p>
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
          {user ? (
            user.usuario === replyData.usuario.usuario ? (
              <button
                type='button'
                onClick={(e) => handleClickDeleteReply(e, replyData.id)}
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
      <Answer isHidden={!reply} comment={replyData} commentId={replyData.id} />
    </>
  )
}

export default Reply
