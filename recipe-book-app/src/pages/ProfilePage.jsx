// import { useEffect, useState } from "react"
import { Fragment, useEffect } from "react"
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
import { useContextNotification } from "../providers/NotificationProvider"

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
  const { addNotification } = useContextNotification()
  const {
    loading,
    profile,
    uploadPhoto,
    deletePhoto,
    updateProfile,
    deleteProfile,
    updatePassword,
    linkGoogleAccount,
    unlinkGoogleAccount,
    notifyUpload,
    errors,
    loadPhoto,
    photo,
  } = useProfile(user?.usuario)

  useEffect(() => {
    if (notifyUpload) {
      addNotification(notifyUpload)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifyUpload])
  console.log(profile)
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
                <div className='flex flex-col gap-1 lg:gap-0.5 lg:flex-row items-start divide-x-2 mt-5'>
                  <Tab.List className='flex flex-row lg:flex-col w-full justify-between min-w-[15vw] lg:max-w-[15vw]'>
                    {tabs.map((tab, index) => (
                      <Fragment key={index}>
                        <Tab
                          key={index}
                          className={({ selected }) =>
                            classNames(
                              "flex gap-1.5 w-full items-center justify-center md:justify-start text-lg font-semibold col-span-3 text-left rounded-xl duration-500 px-5 py-2 hover:shadow-md hover:bg-orange-500",
                              selected ? "bg-orange-600" : ""
                            )
                          }
                          title={tab.name}
                        >
                          <tab.icon className='w-6 h-6 text-gray-900' />
                          <span className='hidden md:inline'>{tab.name}</span>
                        </Tab>
                        <hr />
                      </Fragment>
                    ))}
                  </Tab.List>
                  <Tab.Panels className='flex flex-row md:flex-col w-full min-h-[75vh] rounded-xl bg-orange-200 overflow-y-auto shadow-black/20 shadow-md'>
                    <Tab.Panel className='w-full px-5 pt-4'>
                      <div className='divide-y-2 divide-gray-900/10'>
                        <div className='mb-4'>
                          <ProfileAvatar
                            profile={profile}
                            resources={{
                              loadPhoto,
                              notifyUpload,
                              uploadPhoto,
                              deletePhoto,
                            }}
                          />
                        </div>
                        <div className='pt-4'>
                          <ProfileMainData
                            profile={profile}
                            handleUpdate={updateProfile}
                          />
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className='w-full px-5 pt-4'>
                      <ProfileSecurity
                        profile={profile}
                        handleUpdatePassword={updatePassword}
                      />
                    </Tab.Panel>
                    <Tab.Panel className='w-full px-5 pt-4'>
                      <ProfileAccount
                        profile={profile}
                        handleDeleteAccount={deleteProfile}
                        syncSocialAccount={{link: linkGoogleAccount, unlink: unlinkGoogleAccount}}
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfilePage
