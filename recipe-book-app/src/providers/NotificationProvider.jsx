import { useContext, createContext } from "react"
import { Bounce, ToastContainer, toast } from "react-toastify"

const NotificationContext = createContext()

const NotificationProvider = ({children}) => {

  const addNotification = ({message, type}) => {
    toast(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      type: type
    })
  }

  // const handleToastPromise = (promise) => {
  //   console.log('toast-promise')
  //   toast.promise(
  //     promise,
  //     {
  //       pending:{
  //         render() {
  //           return `Iniciando sesión...`
  //         },
  //       },
  //       success:{
  //         render({data}){
  //           console.log({'data':data})
  //           return `Bienvenido fulanito`
  //         }
  //       },
  //       error:{
  //         render({data}){
  //           return `algo malio sal`
  //         }
  //       }
  //     }
  //   )
  // }
  
  return (
    <NotificationContext.Provider value={{addNotification}}>
      {children}
      <ToastContainer
        // position='bottom-right'
        // autoClose={5000}
        // hideProgressBar={false}
        // closeOnClick
        // draggable
        // pauseOnHover
        // theme='light'
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
      />
    </NotificationContext.Provider>
  )
}

const useContextNotification = () => {
  return useContext(NotificationContext)
}

export { NotificationProvider, useContextNotification }
