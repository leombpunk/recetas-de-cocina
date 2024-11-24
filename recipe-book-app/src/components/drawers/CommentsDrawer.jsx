import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Loader from "../loader/Loader"
import Comment from "../comments/Comment"
import { useContextUser } from "../../providers/UserProvider"
import CustomModal from "../modals/CustomModal"

const CommentsDrawer = ({ open, setOpen, loading, errors, comments, deleteComment }) => {
  const { user } = useContextUser()
  const [commentId, setCommentId] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [cancel, setCancel] = useState(false)

  const handleClickDeleteComment = (event, commentId) => {
    event.preventDefault()
    setOpenModal(true)
    setCommentId(commentId)
  }
  const onNotLogin = (bool) => {}

  useEffect(() => {
    if (confirm) {
      if (commentId) {
        deleteComment(commentId)
        setConfirm(false)
      }
      // if (replyId) {
      //   setConfirm(false)
      // }
    }

    if (cancel) {
      setCommentId(0)
      // setReplyId(0)
      setCancel(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm, cancel])

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto relative w-screen max-w-4xl'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-300'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                        <button
                          type='button'
                          className='relative rounded-md bg-orange-400 text-gray-900 hover:text-black focus-visible:ring-0'
                          onClick={() => setOpen(false)}
                        >
                          <span className='absolute -inset-2.5' />
                          <span className='sr-only'>Cerrar panel</span>
                          <XMarkIcon className='h-7 w-7' aria-hidden='true' />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className='flex h-full flex-col overflow-y-scroll bg-orange-400 border-l-2 border-orange-300 py-6 shadow-xl'>
                      <div className='flex flex-row flex-wrap gap-2 px-4 sm:px-6'>
                        <Dialog.Title className='text-3xl font-semibold leading-6 text-black text-balance'>
                          Comentarios de otros usuarios
                        </Dialog.Title>
                      </div>
                      <div className='flex flex-col gap-2 py-10 px-4 sm:px-6'>
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            <ul className=''>
                              {comments.length ? (
                                comments.map((comment, index) => (
                                  <li className='w-full'>
                                    <Comment
                                      comment={comment}
                                      key={index}
                                      user={user}
                                      onNotLogin={onNotLogin}
                                      handleClickDeleteComment={
                                        handleClickDeleteComment
                                      }
                                    />
                                  </li>
                                ))
                              ) : (
                                <li className='flex flex-row items-center gap-4 text-xl font-medium w-full border-2 border-orange-600 rounded-xl px-2 py-1 shadow-md shadow-black/50'>
                                  Aún no hay comentarios!
                                </li>
                              )}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
    </>
  )
}

export default CommentsDrawer
