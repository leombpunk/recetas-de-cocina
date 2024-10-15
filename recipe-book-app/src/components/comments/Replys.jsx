import { useEffect } from "react"
import useReplys from "../../hooks/useReplys"
import LoaderMini from "../loader/LoaderMini"
import { Link } from "react-router-dom"
import { RoutesAPI } from "../../utils/RoutesAPI"
import {
  ArrowUturnRightIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { Transition } from "@headlessui/react"

//el listado de respuestas a un comentario
const Replys = ({ isHidden = true, commentId, user }) => {
  //cargar las respuestas
  const { errors, getReplys, loading, replys } = useReplys()

  useEffect(() => {
    if (!isHidden) {
      getReplys(commentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHidden])

  console.log({ respuestas: replys })

  return (
    <>
      {isHidden ? (
        ""
      ) : loading ? (
        <div className='flex flex-row items-center justify-center w-full pb-8'>
          <LoaderMini />
        </div>
      ) : replys.length ? (
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
              className={`flex flex-col gap-1 my-6 ml-14 border px-2 py-3 rounded-xl shadow-md shadow-black/25 bg-orange-300/70`}
            >
              <Link
                to={"#"}
                className='flex flex-row items-center gap-2 text-lg font-semibold hover:underline duration-300'
              >
                {reply.usuario?.imagen ? (
                  <img
                    src={`${RoutesAPI.staticFiles}/avatars/${reply.usuario?.imagen}`}
                    alt='imagen de perfil'
                    className='h-8 w-8 rounded-full'
                  />
                ) : (
                  <UserCircleIcon className='h-8 w-8 rounded-full text-gray-900 bg-gray-300' />
                )}
                {reply.usuario.usuario}
              </Link>
              <div className='text-gray-600 italic text-sm pl-5 list-item list-disc list-inside'>
                Comentado el {reply.createAt}
              </div>
              <p className='pl-10 pr-28'>{reply.respuesta}</p>
              <div className='flex flex-row w-full items-center gap-2 pl-10'>
                <button
                  type='button'
                  className='flex flex-row items-center gap-1 bg-orange-500 py-2 px-3 rounded-2xl font-semibold shadow-sm hover:shadow-black/40 hover:bg-orange-300'
                >
                  <ArrowUturnRightIcon className='h-5 w-5' /> Responder
                </button>
                {user ? (
                  user.usuario === reply.usuario.usuario ? (
                    <button
                      type='button'
                      onClick={(e) => null}
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
          ))}
        </Transition>
      ) : (
        <div className="text-center text-xl italic text-gray-600/60 font-medium border-b border-gray-500/60 py-5"><p>Aun no hay respuestas!</p></div>
      )}
    </>
  )
}

export default Replys
