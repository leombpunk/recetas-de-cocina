import feedback from "../../assets/images/feedback.svg"

const Feedback = () => {
  return (
    // <section className="isolate bg-orange-400 px-6 py-24 sm:py-32 lg:px-8 w-full">
    //   <div className='mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8'>
    //     <div className="mx-auto max-w-2xl text-center">
    //       <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Retroalimentación</h2>
    //       <p className="mt-2 text-lg/8 text-gray-600">Tu opinión y comentarios me ayudan a crecer y mejorar el producto!</p>
    //     </div>
    //     <div className='flex flex-col lg:flex-row items-center gap-2 px-3 w-full'>
    //       <div className='w-full'>
    //         imagen
    //       </div>
    //       <form className="mx-auto mt-16 max-w-xl sm:mt-20">
    //         <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
    //           <div>
    //             <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
    //               Nombre (opcional)
    //             </label>
    //             <div className="mt-2.5">
    //               <input
    //                 id="first-name"
    //                 name="first-name"
    //                 type="text"
    //                 autoComplete="given-name"
    //                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
    //               />
    //             </div>
    //           </div>
    //           <div>
    //             <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
    //               Correo electrónico
    //             </label>
    //             <div className="mt-2.5">
    //               <input
    //                 id="email"
    //                 name="email"
    //                 type="email"
    //                 autoComplete="email"
    //                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
    //               />
    //             </div>
    //           </div>
    //           {/* <div className="sm:col-span-2">
    //             <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900">
    //               Company
    //             </label>
    //             <div className="mt-2.5">
    //               <input
    //                 id="company"
    //                 name="company"
    //                 type="text"
    //                 autoComplete="organization"
    //                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
    //               />
    //             </div>
    //           </div> */}
    //           {/* <div className="sm:col-span-2">
    //             <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
    //               Email
    //             </label>
    //             <div className="mt-2.5">
    //               <input
    //                 id="email"
    //                 name="email"
    //                 type="email"
    //                 autoComplete="email"
    //                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
    //               />
    //             </div>
    //           </div> */}
    //           {/* <div className="sm:col-span-2">
    //             <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
    //               Phone number
    //             </label>
    //             <div className="relative mt-2.5">
    //               <div className="absolute inset-y-0 left-0 flex items-center">
    //                 <label htmlFor="country" className="sr-only">
    //                   Country
    //                 </label>
    //                 <select
    //                   id="country"
    //                   name="country"
    //                   className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
    //                 >
    //                   <option>US</option>
    //                   <option>CA</option>
    //                   <option>EU</option>
    //                 </select>
    //                 <ChevronDownIcon
    //                   aria-hidden="true"
    //                   className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
    //                 />
    //               </div>
    //               <input
    //                 id="phone-number"
    //                 name="phone-number"
    //                 type="tel"
    //                 autoComplete="tel"
    //                 className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
    //               />
    //             </div>
    //           </div> */}
    //           <div className="sm:col-span-2">
    //             <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
    //               Comentario
    //             </label>
    //             <div className="mt-2.5">
    //               <textarea
    //                 id="message"
    //                 name="message"
    //                 rows={4}
    //                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
    //                 defaultValue={''}
    //                 placeholder='Deja tu comentario u opinión aquí...'
    //               />
    //             </div>
    //           </div>
    //           {/* <Field className="flex gap-x-4 sm:col-span-2">
    //             <div className="flex h-6 items-center">
    //               <Switch
    //                 checked={agreed}
    //                 onChange={setAgreed}
    //                 className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
    //               >
    //                 <span className="sr-only">Agree to policies</span>
    //                 <span
    //                   aria-hidden="true"
    //                   className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
    //                 />
    //               </Switch>
    //             </div>
    //             <Label className="text-sm/6 text-gray-600">
    //               By selecting this, you agree to our{' '}
    //               <a href="#asd" className="font-semibold text-indigo-600">
    //                 privacy&nbsp;policy
    //               </a>
    //               .
    //             </Label>
    //           </Field> */}
    //         </div>
    //         <div className="mt-10">
    //           <button
    //             type="submit"
    //             className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //           >
    //             Enviar
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </section>
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
                    htmlFor='last-name'
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
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feedback
