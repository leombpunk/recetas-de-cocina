import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline"

const ProfileAccount = ({
  profile,
  handleDeleteAccount,
  syncSocialAccount,
}) => {
  return (
    <>
      <section className='border-b border-gray-900/10 pb-6'>
        <div className='px-4 pt-5 pb-7'>
          <h2 className='flex gap-1.5 items-center text-3xl font-medium'>
            <LinkIcon className='w-9 h-9' /> Vincular redes
          </h2>
          <div>
            <button>google</button>
          </div>
        </div>
      </section>
      <section className='border-b border-gray-900/10 pb-6'>
        <div className='px-4 pt-5 pb-7'>
          <h2 className='flex gap-1.5 items-center text-3xl font-medium'>
            <TrashIcon className='w-9 h-9' /> Eliminar cuenta
          </h2>
          
        </div>
        <div className="flex flex-row items-center justify-center w-full h-[7rem]">
          <button className='bg-red-500 hover:bg-red-600 shadow-md hover:shadow-black/50 duration-300 py-5 px-8 rounded-xl text-2xl font-medium'>
            Eliminar cuenta
          </button>
        </div>
      </section>
    </>
  )
}

export default ProfileAccount
