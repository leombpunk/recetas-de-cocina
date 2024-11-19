import movilDesign from '../../assets/images/captura.png'
import creaIdea from '../../assets/images/crea-cocina-2.svg'
import compartir from '../../assets/images/compartir-6-1.svg'
import disfrutar from '../../assets/images/disfrutar.svg'

const BentoGrid = () => {
  return (
    <section className='bg-orange-500 py-24 sm:py-32 w-full'>
      <div className='mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-center text-xl font-semibold text-gray-900'>
          Que la cocina sea divertida
        </h2>
        <p className='mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl'>
          Descubre lo que puedes hacer con la app
        </p>
        <div className='mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2'>
          <div className='relative lg:row-span-2'>
            <div className='absolute inset-px rounded-lg bg-orange-200 lg:rounded-l-[2rem] shadow-md shadow-black/50'></div>
            <div className='relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]'>
              <div className='px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10'>
                <p className='mt-2 text-xl font-medium tracking-tight text-gray-950 max-lg:text-center'>
                  Adaptado a smartphones
                </p>
                <p className='mt-2 max-w-lg text-lg/6 text-gray-600 max-lg:text-center'>
                  Diseño pensado para dispositivos móviles, se adapta a tus necesidades. También para otros dispositivos.
                </p>
              </div>
              <div className='relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm'>
                <div className='absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl'>
                  <img
                    className='size-full object-cover object-top'
                    src={movilDesign}
                    alt='diseño movil adpatable'
                  />
                </div>
              </div>
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]'></div>
          </div>
          <div className='relative max-lg:row-start-1'>
            <div className='absolute inset-px rounded-lg bg-orange-200 max-lg:rounded-t-[2rem] shadow-md shadow-black/50'></div>
            <div className='relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]'>
              <div className='px-8 pt-8 sm:px-10 sm:pt-10'>
                <p className='mt-2 text-xl font-medium tracking-tight text-gray-950 max-lg:text-center'>
                  Crea
                </p>
                <p className='mt-2 max-w-lg text-lg/6 text-gray-600 max-lg:text-center'>
                  No limites tu pasión por la cocina, también puedes mantener tus creaciones en privado.
                </p>
              </div>
              <div className='flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2'>
                <img
                  className='w-full max-lg:max-w-xs'
                  src={creaIdea}
                  alt='crea-idea'
                />
              </div>
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]'></div>
          </div>
          <div className='relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2'>
            <div className='absolute inset-px rounded-lg bg-orange-200 shadow-md shadow-black/50'></div>
            <div className='relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]'>
              <div className='px-8 pt-8 sm:px-10 sm:pt-10'>
                <p className='mt-2 text-xl font-medium tracking-tight text-gray-950 max-lg:text-center'>
                  Comparte
                </p>
                <p className='mt-2 max-w-lg text-lg/6 text-gray-600 max-lg:text-center'>
                  Da a conocer tus recetas, comparte con amigos, falimiares, vecinos otros usuarios, o inspirate con las recetas de cientos de entusiastas como tú.
                </p>
              </div>
              <div className='flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2'>
                <img
                  className='w-full max-lg:max-w-xs'
                  src={compartir}
                  alt='comparte tus creaciones'
                />
              </div>
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5'></div>
          </div>
          <div className='relative lg:row-span-2'>
            <div className='absolute inset-px rounded-lg bg-orange-200 shadow-md shadow-black/50 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]'></div>
            <div className='relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]'>
              <div className='px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10'>
                <p className='mt-2 text-xl font-medium tracking-tight text-gray-950 max-lg:text-center'>
                  Disfruta
                </p>
                <p className='mt-2 max-w-lg text-lg/6 text-gray-600 max-lg:text-center'>
                  Tanto cocinar, como aprender a hacerlo son experiencias únicas, no las dejes pasar!
                </p>
              </div>
              <div className='relative min-h-[30rem] w-full grow'>
                <div className='absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl'>
                  {/* <div className='flex bg-gray-800/40 ring-1 ring-white/5'>
                    <div className='-mb-px flex text-sm/6 font-medium text-gray-400'>
                      <div className='border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white'>
                        NotificationSetting.jsx
                      </div>
                      <div className='border-r border-gray-600/10 px-4 py-2'>
                        App.jsx
                      </div>
                    </div>
                  </div>
                  <div className='px-6 pb-14 pt-6'>
                    Your code example 
                  </div> */}
                  <img
                    className='size-full h-full w-auto object-cover object-top'
                    src={disfrutar}
                    alt='diseño movil adpatable'
                  />
                </div>
              </div>
              {/* <div className='relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm'>
                <div className='absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl'>
                  <img
                    className='size-full object-cover object-top'
                    src={disfrutar}
                    alt='diseño movil adpatable'
                  />
                </div>
              </div> */}
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
