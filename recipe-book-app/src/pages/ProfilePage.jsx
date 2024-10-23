// import { useEffect, useState } from "react"
import { Fragment } from "react"
import { Tab } from "@headlessui/react"
import {
  UsersIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { useContextUser } from "../providers/UserProvider"
import useProfile from "../hooks/useProfile"
import ProfileAvatar from "../components/profile/ProfileAvatar"
import ProfileMainData from "../components/profile/ProfileMainData"
import ProfileSecurity from "../components/profile/ProfileSecurity"
import ProfileAccount from "../components/profile/ProfileAccount"

const tabs = [
  { name: "Personal", icon: IdentificationIcon },
  { name: "Seguridad", icon: ShieldCheckIcon },
  { name: "Cuenta", icon: UsersIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ProfilePage = () => {
  const { user } = useContextUser()
  const {
    loading,
    profile,
    uploadPhoto,
    deletePhoto,
    notifyUpload,
    errors,
    loadPhoto,
    photo,
  } = useProfile(user?.usuario)

  // console.log(profile)
  return (
    <>
      <section className='bg-orange-300'>
        <div className='mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-18 md:px-2 md:max-w-3xl lg:max-w-7xl lg:px-8'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='flex flex-row gap-2 text-2xl font-semibold leading-7 text-gray-900'>
                <Cog6ToothIcon className='w-7 h-7 text-gray-900' />{" "}
                Configuracion de cuenta
              </h2>
              <p className='mt-1 text-base leading-6 text-gray-600'>
                Esta información será mostrada públicamente, tenga cuidado con
                lo que comparte.
              </p>
              <Tab.Group>
                <div className='flex flex-row items-start divide-x-2 mt-5'>
                  <Tab.List className='flex flex-row md:flex-col min-w-[15vw]'>
                    {tabs.map((tab, index) => (
                      <Fragment key={index}>
                        <Tab
                          key={index}
                          className={({ selected }) =>
                            classNames(
                              "flex gap-1.5 items-center text-lg font-semibold col-span-3 text-left rounded-xl duration-500 px-5 py-2 hover:shadow-md hover:bg-orange-500",
                              selected ? "bg-orange-600" : ""
                            )
                          }
                        >
                          <tab.icon className='w-6 h-6 text-gray-900' />
                          {tab.name}
                        </Tab>
                        <hr />
                      </Fragment>
                    ))}
                  </Tab.List>
                  <Tab.Panels className='flex flex-row md:flex-col w-full min-h-[75vh] rounded-xl bg-orange-200 overflow-y-auto shadow-black/20 shadow-md'>
                    <Tab.Panel className='w-full px-5 pt-4'>
                      <div className='divide-y-2 divide-gray-900/10'>
                        <div className='mb-4'>
                          <ProfileAvatar profile={profile} resources={{loadPhoto, notifyUpload, uploadPhoto, deletePhoto}} />
                        </div>
                        <div className='pt-4'>
                          <ProfileMainData profile={profile} />
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className='w-full pl-5 pt-4'>
                      <ProfileSecurity profile={profile} />
                    </Tab.Panel>
                    <Tab.Panel className='w-full pl-5 pt-4'>
                      <ProfileAccount profile={profile} />
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-black shadow-md hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
            >
              Guardar
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfilePage
