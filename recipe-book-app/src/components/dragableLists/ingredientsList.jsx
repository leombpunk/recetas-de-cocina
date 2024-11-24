import { useState } from "react"
import { useFieldArray } from "react-hook-form"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import {
  Bars4Icon,
  ExclamationCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"

const IngredientsList = ({
  ingredients = [],
  control,
  register,
  errors,
  editMode,
}) => {
  const { fields, append, remove, move } = useFieldArray({
    name: "ingredientes",
    control: control,
  })

  // console.log({ ingredientes: fields })

  const [ingredientsArray, setIngredientsArray] = useState(
    ingredients.length ? ingredients : [{ order: 1, content: "", cantidad: "" }]
  )
  const addItem = () => {
    append({ name: "" })
    setIngredientsArray([
      ...ingredientsArray,
      { order: ingredientsArray.length + 1, content: "", cantidad: "" },
    ])
  }
  const deleteItem = (list, index) => {
    remove(index)
    console.log("quiero borrar el indice " + index)
    const result = Array.from(list)
    result.splice(index, 1)
    setIngredientsArray(result)
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
      ingredientsArray,
      result.source.index,
      result.destination.index
    )
    setIngredientsArray(quotes)
  }
  // console.log({datos: ingredientsArray})
  // console.log({ errors: errors })
  // console.log({ control: control })
  return (
    <div className='flex flex-col items-start w-full gap-2'>
      <h3 className='text-lg font-semibold'>Ingredientes:</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='ingredientsList'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='flex flex-col gap-2 w-full'
            >
              {fields.map((item, index) => (
                <Draggable
                  draggableId={`draggable-${index}`}
                  index={index}
                  key={`draggable-${index}`}
                  isDragDisabled={!editMode}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='flex flex-col gap-2'
                    >
                      <div
                        className={`${
                          !editMode ? "" : "shadow-black/50 shadow-sm"
                        } border-gray-500 border flex flex-row items-center rounded-lg w-full p-1 ${
                          errors.ingredientes?.[index] &&
                          "border border-red-600"
                        }`}
                      >
                        <Bars4Icon className='h-6 w-6' />
                        <input
                          key={`inputIngrediente-${index}`}
                          {...register(`ingredientes.${index}.name`)}
                          type='text'
                          placeholder='Ingresa un ingrediente'
                          onBlur={(event) => {
                            console.log(event.target.value)
                          }}
                          className={`${
                            !editMode
                              ? "bg-orange-200 text-gray-600 hover:cursor-not-allowed"
                              : "bg-orange-100"
                          } rounded-lg placeholder:font-semibold placeholder:text-lg text-lg w-full border-transparent `}
                          disabled={!editMode}
                        />
                        <button
                          type='button'
                          title='Eliminar ingrediente'
                          onClick={() => deleteItem(ingredientsArray, index)}
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
                      {errors.ingredientes?.[index] && (
                        <span className='flex flex-row gap-1 items-center italic text-left text-red-600 font-semibold w-full pl-1'>
                          <ExclamationCircleIcon className='h-6 w-6' />
                          {errors.ingredientes[index].name.message}
                        </span>
                      )}
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
          } rounded-lg p-1.5 `}
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

export default IngredientsList
