import { useEffect, useReducer } from "react"
import CommentsServices from "../services/Comments"
import { useContextUser } from "../providers/UserProvider"

const struct = {
  data: [],
  errors: [],
  response: {
    status: 0,
    type: "", //"none" || "fetch" || "get" || "post" || "delete", //finish para actualizar el loading a false //init para loading true //error
    loading: true,
    result: {},
  },
}

// action: { type: "" }
// state === struct
function reducerComments(state, action) {
  if (action.type === "init") {
    return {
      ...state,
      response: {
        loading: true,
        type: action.mode, //mode reemplaza a type solo aquí
      },
    }
  } else if (action.type === "finish") {
    return {
      ...state,
      response: {
        loading: false,
        type: action.mode, //mode reemplaza a type solo aquí
      },
    }
  } else if (action.type === "fetch") {
    // console.log({
    //   ...state,
    //   data: action.result.data,
    //   response: {
    //     status: action.result.status,
    //     type: action.type,
    //     result: action.result, //para debugs
    //   },
    // })
    return {
      ...state,
      data: action.result.data,
      response: {
        status: action.result.status,
        type: action.type,
        result: action.result, //para debugs
      },
    }
  } else if (action.type === "get") {
    return {
      ...state,
      data: [action.result.data, ...state.data], //agrega lo nuevo del paginado, ponele
      response: {
        status: action.result.status,
        type: action.type,
        result: action.result, //para debugs
      },
    }
  } else if (action.type === "post") {
    return {
      ...state,
      data: [action.result.data, ...state.data], //agrega el resultado del post
      response: {
        status: action.result.status,
        type: action.type,
        result: action.result, //para debugs
      },
    }
  } else if (action.type === "delete") {
    return {} //lo haré después
  } else if (action.type === "error") {
    return {
      ...state,
      errors: [action.result.data], //agrega el resultado del post
      response: {
        status: action.result.status,
        type: action.type,
        result: action.result, //para debugs
      },
    }
  }
  throw Error("Unknown action: " + action.type)
}
function reducerReplys(state, action) {}

const useCommentsV2 = (recipeId) => {
  const [comments, dispatchComments] = useReducer(reducerComments, struct)
  const [replys, dispatchReplys] = useReducer(reducerReplys, struct)
  console.log(comments)

  const fetchComments = async () => {
    try {
      dispatchComments({ type: "init", mode: "fetch" })
      const result = await CommentsServices.getComments(recipeId)
      console.log(result)
      if (result.status === 200) {
        dispatchComments({ type: "fetch", result: result.data })
      } else {
        dispatchComments({ type: "error", result: result })
      }
    } catch (error) {
      dispatchComments({ type: "error", result: error })
      dispatchComments({ type: "finish", mode: "fetch" })
    } finally {
      dispatchComments({ type: "finish", mode: "fetch" })
    }
  }

  useEffect(() => {
    fetchComments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId])

  return {
    comments,
    replys,
  }
}

export default useCommentsV2
