import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const Pagination = ({ page, totalPages, totalRows, setPage }) => {
  console.log({ page, totalPages, totalRows })

  const handleClick = (page) => {
    setPage(page)
  }

  const hasPrev = () => {
    return page > 1
  }
  const hasNext = () => {
    return page < totalPages
  }

  return (
    <div className='flex items-center justify-between bg-orange-300 border-t border-gray-700 px-4 py-3 sm:px-6 mt-10'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          disabled={!hasPrev()}
          onClick={() => handleClick(page - 1)}
          className='relative inline-flex items-center rounded-md border border-gray-700 bg-orange-500 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-600'
        >
          <ChevronLeftIcon className='h-6 w-6' aria-hidden='true' />
          Anterior
        </button>
        <button
          disabled={!hasNext()}
          onClick={() => handleClick(page + 1)}
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-700 bg-orange-500 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-600'
        >
          <ChevronRightIcon className='h-6 w-6' aria-hidden='true' />
          Siguiente
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Mostrando <span className='font-medium'>{page}</span> de{" "}
            <span className='font-medium'>{totalPages}</span> páginas, con{" "}
            <span className='font-medium'>{totalRows}</span> resultados
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <button
              disabled={!hasPrev()}
              onClick={() => handleClick(page - 1)}
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-700 hover:bg-orange-600 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Anterior</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            {hasPrev() & (page - 3 > 1) ? (
              <button
                onClick={() => handleClick(page - 3)}
                aria-current='page'
                className='relative z-10 inline-flex items-center bg-orange-600 px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {page - 3}
              </button>
            ) : (
              ""
            )}
            {hasPrev() & (page - 2 > 1) ? (
              <button
                onClick={() => handleClick(page - 2)}
                className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-700 hover:bg-orange-600 focus:z-20 focus:outline-offset-0'
              >
                {page - 2}
              </button>
            ) : (
              ""
            )}
            {hasPrev() ? (
              <button
                onClick={() => handleClick(page - 1)}
                className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-700 hover:bg-orange-600 focus:z-20 focus:outline-offset-0 md:inline-flex'
              >
                {page - 1}
              </button>
            ) : (
              ""
            )}

            <span
              title='Página actual'
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-black focus:outline-offset-0 bg-orange-600'
            >
              {page}
            </span>
            {hasNext() ? (
              <button
                onClick={() => handleClick(page + 1)}
                className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-700 hover:bg-orange-600 focus:z-20 focus:outline-offset-0 md:inline-flex'
              >
                {page + 1}
              </button>
            ) : (
              ""
            )}
            {hasNext() & (page + 1 < totalPages) ? (
              <button
                onClick={() => handleClick(page + 2)}
                className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-700 hover:bg-orange-600 focus:z-20 focus:outline-offset-0'
              >
                {page + 2}
              </button>
            ) : (
              ""
            )}

            {hasNext() & (page + 2 < totalPages) ? (
              <button
                onClick={() => handleClick(page + 3)}
                className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-700 hover:bg-orange-600 focus:z-20 focus:outline-offset-0'
              >
                {page + 3}
              </button>
            ) : (
              ""
            )}
            <button
              disabled={!hasNext()}
              onClick={() => handleClick(page + 1)}
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-700 hover:bg-orange-600 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Siguiente</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
