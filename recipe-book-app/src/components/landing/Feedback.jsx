import { useState } from "react"
import feedback from "../../assets/images/feedback.svg"
import CustomModal from '../modals/CustomModal'

const Feedback = () => {
  const [openModal, setOpenModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [cancel, setCancel] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setOpenModal(true)
  }

  return (
    <section className='relative w-full bg-orange-400 bg-cover bg-center min-h-[90svh]'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8 h-max'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
            Retroalimentación
          </h2>
          <p className='mt-2 text-xl/8 text-gray-800'>
            Tu opinión y comentarios me ayudan a crecer y mejorar el producto!
          </p>
        </div>
        <div className='flex flex-col lg:flex-row items-center gap-10 w-full mt-6'>
          <div className='w-full lg:w-1/2'>
            <img
              src={feedback}
              className='w-full rounded-3xl shadow-md shadow-black/50'
              alt='imagen de feedback'
            />
          </div>
          <div className='flex flex-col gap-4 w-full lg:w-1/2'>
            <form className=''>
              <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='first-name'
                    className='block text-xl/6 font-medium text-gray-900'
                  >
                    Nombre (opcional)
                  </label>
                  <div className='mt-2.5'>
                    <input
                      id='first-name'
                      name='first-name'
                      type='text'
                      autoComplete='given-name'
                      className='bg-orange-100 shadow-black/50 shadow-sm rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full'
                      placeholder='Tu nombre (si quieres)'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-xl/6 font-medium text-gray-900'
                  >
                    Correo electrónico
                  </label>
                  <div className='mt-2.5'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      className='bg-orange-100 shadow-black/50 shadow-sm rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full'
                      placeholder='ejemplo@correo.com'
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='message'
                    className='block text-xl/6 font-medium text-gray-900'
                  >
                    Comentario
                  </label>
                  <div className='mt-2.5'>
                    <textarea
                      id='message'
                      name='message'
                      rows={4}
                      className='bg-orange-100 shadow-black/50 shadow-sm rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full'
                      defaultValue={""}
                      placeholder='Deja tu comentario u opinión aquí...'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-10'>
                <button
                  type='submit'
                  className='bg-orange-500 rounded-lg py-4 px-6 shadow-md hover:shadow-black/50 hover:scale-105 duration-500 text-xl font-medium w-full'
                  onClick={(e) => handleClick(e)}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
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
            El formulario de contacto es solo a modo de ejemplo
          </p>
        </div>
      </CustomModal>
    </section>
  )
}

export default Feedback
