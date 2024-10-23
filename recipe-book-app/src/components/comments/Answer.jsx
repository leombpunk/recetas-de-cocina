import { useState } from "react"
import { Transition } from "@headlessui/react"
import {
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { RoutesAPI } from "../../utils/RoutesAPI"
import { useContextNotification } from "../../providers/NotificationProvider"
import useReplys from "../../hooks/useReplys"

//el cosito para escribir una respuesta
const Answer = ({ commentId, comment, isHidden = true }) => {
  // console.log({ comentario: comment })
  const { addNotification } = useContextNotification()
  const [answerData, setAnswerData] = useState({
    respuesta: "",
    mension: comment?.usuario?.usuario,
  }) //contiene la respuesta del usuario
  //necesito armar a quien le contesto (su nombre de usuario) y el id del comentario principal
  //llamar al hook useReplys para crear la respuesta
  const {loading, reply, errors, createReply} = useReplys()

  const onClickSubmit = (event) => {
    event.preventDefault()
    console.log(answerData)
    if (answerData.respuesta.length && answerData.mension !== "") {
      //llamar al metodo del hook para crear la respuesta
      createReply(commentId, answerData)
    } else {
      //informar con una notificacion que debe escribir algo
      addNotification({
        message: "Debes escribir algo como respuesta!",
        type: "warning",
      })
    }
  }

  return (
    <>
      {isHidden ? (
        ""
      ) : (
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
          <div className='w-full pl-14'>
            <form className='flex flex-col gap-2 w-full p-3 border-2 rounded-2xl shadow-md shadow-black/30'>
              <p className='pl-1 text-lg'>
                Responder al usuario:{" "}
                <span className='font-medium italic bg-gray-300/60 rounded-xl py-0.5 px-2'>
                  {comment.usuario?.usuario}
                </span>
              </p>
              <div className='flex flex-row gap-2 items-start w-full'>
                {comment.usuario?.imagen ? (
                  <img
                    src={`${RoutesAPI.avatarFiles}/${comment.usuario?.imagen}`}
                    alt='imagen de perfil'
                    className='h-8 w-8 rounded-full'
                  />
                ) : (
                  <UserCircleIcon className='h-8 w-8 rounded-full text-gray-900 bg-gray-300' />
                )}
                <textarea
                  className='rounded-2xl border-none bg-orange-300 w-full'
                  placeholder='Escribe tu respuesta'
                  onChange={(e) => setAnswerData({...answerData, respuesta: e.target.value})}
                ></textarea>
              </div>
              <div className='flex flex-row justify-end items-center mt-1'>
                <button
                  onClick={(e) => onClickSubmit(e)}
                  type='submit'
                  className='flex flex-row items-center gap-1 bg-orange-500 py-2 px-3 rounded-2xl font-semibold shadow-sm hover:shadow-black/40 hover:bg-orange-300'
                >
                  <ChatBubbleOvalLeftEllipsisIcon className='w-5 h-5' />
                  Comentar
                </button>
              </div>
            </form>
          </div>
        </Transition>
      )}
    </>
  )
}

export default Answer
