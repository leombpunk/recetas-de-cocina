import { useRef, useState } from "react"

const useDropzone = ({isMultiple}) => {
  const validData = ["image/png","image/jpeg", "image/webp"]
  const [inputFile, setInputFile] = useState(null)
  const fileRef = useRef(null)

  const handleClickDropzone = () => {
    fileRef.current.click()
  }
  const handleChangeInputFiles = (event) => {
    validFile(event.target.files[0])
    isMultiple
      ? setInputFile([...inputFile, event.target.files[0]])
      : setInputFile(event.target.files[0])
  }
  const handleDropInDropzone = (event) => {
    event.preventDefault()
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      // console.log(event.dataTransfer.items[0]) //kind:"file", type:"image/png"
      [...event.dataTransfer.items].forEach((item, i) => {
        validFile(item)
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile()
          // Create a data transfer object. Similar to what you get from a `drop` event as `event.dataTransfer`
          const dataTransfer = new DataTransfer();
          // Add your file to the file list of the object
          dataTransfer.items.add(file);
          // Set your input `files` to the file list
          fileRef.files = dataTransfer.files;
          setInputFile(file)
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }
  const handlerDragOver = (event) => {
    event.preventDefault();
  }
  const handleClickDeleteFile = () => {
    //modal de confirmacion de borrar la wea
    setInputFile(null)
    fileRef.current.value = null
  }
  const validFile = (file) => {
    console.log(file)
    console.log(validData)
  }

  return {
    files:  inputFile,
    ref: fileRef,
    dragover: handlerDragOver,
    dropInDropzone: handleDropInDropzone,
    deleteFile: handleClickDeleteFile,
    changeInputFile: handleChangeInputFiles,
    openDropzone: handleClickDropzone
  }
}

export default useDropzone
