import { useState } from "react"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import { Bars4Icon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"

const IngredientsList = ({ ingredients = [] }) => {
  const [ingredientsArray, setIngredientsArray] = useState(
    ingredients.length ? ingredients : [{ order: 1, content: "", cantidad: "" }]
  )
  const addItem = () => {
    setIngredientsArray([
      ...ingredientsArray,
      { order: ingredientsArray.length + 1, content: "", cantidad: "" },
    ])
  }
  const deleteItem = (list, index) => {
    console.log("quiero borrar el indice "+index)
    const result = Array.from(list)
    result.splice(index, 1)
    setIngredientsArray(result)
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
      ingredientsArray,
      result.source.index,
      result.destination.index
    )
    setIngredientsArray(quotes)
  }
  console.log({datos: ingredientsArray})
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
              {ingredientsArray.map((item, index) => (
                <Draggable
                  draggableId={`draggable-${item.order}`}
                  index={index}
                  key={`draggable-${item.order}`}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='border-gray-500 border flex flex-row items-center rounded-lg w-full p-1'
                    >
                      <Bars4Icon className='h-6 w-6' />
                      <input
                        type='text'
                        placeholder='Ingresa un ingrediente'
                        // value={index}
                        onBlur={(event) => { console.log(event.target.value) }}
                        className='rounded-lg placeholder:font-semibold placeholder:text-lg text-lg bg-orange-100 w-full border-transparent'
                      />
                      <button type='button' title="Eliminar ingrediente" onClick={() => deleteItem(ingredientsArray, index)}>
                        <TrashIcon className='w-6 h-6' />
                      </button>
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

export default IngredientsList
