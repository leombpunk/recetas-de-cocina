import { useContext, createContext } from "react"
import { ToastContainer, toast } from "react-toastify"

const NotificationContext = createContext()

const NotificationProvider = ({children}) => {

  const handleToastPromise = (promise) => {
    console.log('toast-promise')
    toast.promise(
      promise,
      {
        pending:{
          render() {
            return `Iniciando sesión...`
          },
        },
        success:{
          render({data}){
            console.log({'data':data})
            return `Bienvenido fulanito`
          }
        },
        error:{
          render({data}){
            return `algo malio sal`
          }
        }
      }
    )
  }
  
  return (
    <NotificationContext.Provider value={{handleToastPromise}}>
      {children}
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </NotificationContext.Provider>
  )
}

const useContextNotification = () => {
  return useContext(NotificationContext)
}

export { NotificationProvider, useContextNotification }
