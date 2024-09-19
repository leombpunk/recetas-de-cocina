/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useFieldArray, useWatch } from "react-hook-form"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import {
  Bars4Icon,
  PlusIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline"
import Dropzone from "../dropzone/Dropzone"

const StepsList = ({
  steps = [],
  fileUpload,
  fileDelete,
  handleErrorFile,
  setPasosImg,
  control,
  register,
  errors,
  editMode,
}) => {
  const { fields, append, remove, move } = useFieldArray({
    name: "pasos",
    control: control,
  })

  const pasos = useWatch({ control:control, name: "pasos"})

  // console.log({ pasos: fields })
  // console.log({guach: pasos})

  const [stepsArray, setStepesArray] = useState(
    steps.length ? steps : [{ order: "", content: "", image: "" }]
  )

  const addItem = () => {
    append({ paso: "", imagen: "" })
    setStepesArray([
      ...stepsArray,
      { order: stepsArray.length + 1, content: "", image: "" },
    ])
  }
  const deleteItem = (list, index) => {
    remove(index)
    // console.log("quiero borrar el indice " + index)
    const result = Array.from(list)
    result.splice(index, 1)
    setStepesArray(result)
  }
  const reorder = (list, startIndex, endIndex) => {
    move(startIndex, endIndex)
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }
  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    if (result.destination.index === result.source.index) {
      return
    }
    const quotes = reorder(
      stepsArray,
      result.source.index,
      result.destination.index
    )
    setStepesArray(quotes)
  }
  // console.log({ datos: stepsArray })

  return (
    <div className='flex flex-col items-start w-full gap-2'>
      <h3 className='text-lg font-semibold'>Pasos:</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='stepsList'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='flex flex-col gap-2 w-full'
            >
              {fields.map((item, index) => (
                <Draggable
                  draggableId={`draggable-step-${index}`}
                  index={index}
                  key={`draggable-step-${index}`}
                  isDragDisabled={!editMode}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${
                        !editMode ? "" : "shadow-black/50 shadow-sm"
                      } border-gray-500 border flex flex-col items-start rounded-lg w-full p-1 pb-2 gap-2 ${
                        errors.pasos?.[index] && "border border-red-600"
                      }`}
                    >
                      <div className='flex flex-row items-start rounded-lg w-full p-1'>
                        <Bars4Icon className='h-6 w-6' />
                        <textarea
                          {...register(`pasos.${index}.paso`)}
                          type='text'
                          rows={4}
                          placeholder='Describe el proceso de preparación en pasos'
                          onBlur={(event) => {
                            console.log(event.target.value)
                          }}
                          className={`${
                            !editMode
                              ? "bg-orange-200 text-gray-600 hover:cursor-not-allowed"
                              : "bg-orange-100"
                          } rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full border-transparent`}
                          disabled={!editMode}
                        ></textarea>
                        <button
                          type='button'
                          title='Eliminar paso'
                          onClick={() => deleteItem(stepsArray, index)}
                          disabled={!editMode}
                          className={`${
                            !editMode
                              ? "text-gray-500 hover:cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <TrashIcon className='w-6 h-6' />
                        </button>
                      </div>
                      {errors.pasos?.[index] && (
                        <span className='flex flex-row gap-1 items-center italic text-left text-red-600 font-semibold w-full pl-1'>
                          <ExclamationCircleIcon className='h-6 w-6' />
                          {errors.pasos[index].paso.message}
                        </span>
                      )}
                      <Dropzone
                        title="(Opcional) Agrega una imagen descriptiva del paso"
                        isMultiple={false}
                        maxFiles={1}
                        handleFiles={setPasosImg}
                        handleUpload={fileUpload}
                        handleDelete={fileDelete}
                        handleError={handleErrorFile}
                        disabled={!editMode}
                        filePreload={fields[index].imagen}
                        index={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className=''>
        <button
          type='button'
          className={`${
            !editMode
              ? "bg-orange-400 text-gray-600 hover:cursor-not-allowed"
              : "bg-orange-500 shadow-black/50 shadow-sm hover:scale-105 duration-500"
          } rounded-lg p-1.5`}
          title='Agregar Ingrediente'
          onClick={() => addItem()}
          disabled={!editMode}
        >
          <span className='flex flex-row'>
            <PlusIcon className='w-6 h-6' />
            Agregar
          </span>
        </button>
      </div>
    </div>
  )
}

export default StepsList
