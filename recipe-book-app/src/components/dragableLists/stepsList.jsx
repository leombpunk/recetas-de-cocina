import { useState } from "react"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import {
  Bars4Icon,
  PlusIcon,
  TrashIcon,
  CameraIcon,
} from "@heroicons/react/24/outline"

const StepsList = ({ steps = [] }) => {
  const [stepsArray, setStepesArray] = useState(
    steps.length ? steps : [{ order: "", content: "", image: "" }]
  )

  const addItem = () => {
    setStepesArray([
      ...stepsArray,
      { order: stepsArray.length + 1, content: "", image: "" },
    ])
  }
  const deleteItem = (list, index) => {
    console.log("quiero borrar el indice "+index)
    const result = Array.from(list)
    result.splice(index, 1)
    setStepesArray(result)
  }
  const reorder = (list, startIndex, endIndex) => {
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
  console.log({ datos: stepsArray })

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
              {stepsArray.map((item, index) => (
                <Draggable
                  draggableId={`draggable-step-${item.order}`}
                  index={index}
                  key={`draggable-step-${item.order}`}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='border-gray-500 border flex flex-col items-start rounded-lg w-full p-1 gap-2'
                    >
                      <div className='flex flex-row items-start rounded-lg w-full p-1'>
                        <Bars4Icon className='h-6 w-6' />
                        <textarea
                          type='text'
                          placeholder='Describe el proceso de preparación en pasos'
                          // value={item.content}
                          onBlur={(event) => {
                            console.log(event.target.value)
                          }}
                          className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full border-transparent'
                        ></textarea>
                        <button
                          type='button'
                          title='Eliminar paso'
                          onClick={() => deleteItem(stepsArray, index)}
                        >
                          <TrashIcon className='w-6 h-6' />
                        </button>
                      </div>
                      <figure className="w-full">
                        {item.image ? (
                          <img
                            alt='imagen descriptiva del paso'
                            title='Imagen descriptiva del paso'
                            src={item.image}
                          />
                        ) : (
                          <div className="flex flex-row items-center justify-center w-full">
                            <div className="border border-gray-500 p-6 rounded-lg border-dashed hover:cursor-pointer">
                              <CameraIcon className="h-24 w-24 text-gray-500 m-auto" />
                              <p className="italic text-gray-500 font-semibold text-sm">Agrega una imagen (opcional)</p>
                            </div>
                          </div>
                        )}
                      </figure>
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
          className='bg-orange-500 rounded-lg p-1.5 hover:scale-105 duration-500 '
          title='Agregar Ingrediente'
          onClick={() => addItem()}
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
