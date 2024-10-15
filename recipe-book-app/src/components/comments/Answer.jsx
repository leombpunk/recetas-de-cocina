import { Transition } from "@headlessui/react"
import { RoutesAPI } from "../../utils/RoutesAPI"
import {
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"

//el cosito para escribir una respuesta
const Answer = ({ commentId, comment, isHidden = true }) => {
  console.log({ comentario: comment })
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
            <form className='flex flex-col gap-2 w-full p-3 border rounded-2xl shadow-md shadow-black/30'>
              <div className='flex flex-row gap-2 items-start w-full'>
                {comment.usuario?.imagen ? (
                  <img
                    src={`${RoutesAPI.staticFiles}/avatars/${comment.usuario?.imagen}`}
                    alt='imagen de perfil'
                    className='h-8 w-8 rounded-full'
                  />
                ) : (
                  <UserCircleIcon className='h-8 w-8 rounded-full text-gray-900 bg-gray-300' />
                )}
                <textarea
                  className='rounded-2xl border-none bg-orange-300 w-full'
                  placeholder='Escribe tu respuesta'
                ></textarea>
              </div>
              <div className='flex flex-row justify-end items-center mt-1'>
                <button
                  onClick={(e) => null}
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
