const Section3 = () => {
  return (
    <section className='services w-full bg-orange-600 text-center text-white h-[80vh]'>
      <h2 className='text-gray-50 text-6xl uppercase mt-12'>
        VR's Surprising Benefits
      </h2>
      <p className='text-xl my-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, facere!
      </p>
      <div className='services-box flex gap-2 p-5'>
        <div className='box text-black w-1/3 shadow-lg shadow-black/30 ml-2.5 px-8 py-5 rounded-xl bg-orange-400'>
          <h3 className='text-gray-100 text-4xl'>Mental health</h3>
          <p className='text-xl mt-2.5'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            rerum illum sit! Accusamus laborum possimus non ipsam, debitis
            cumque id?
          </p>
          <a
            className='btn inline-block mt-4 px-12 py-4 bg-orange-300 border-2 border-orange-800 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50'
            href='#d'
          >
            More
          </a>
        </div>
        <div className='box text-black w-1/3 shadow-lg shadow-black/30 ml-2.5 px-8 py-5 rounded-xl bg-orange-400'>
          <h3 className='text-gray-100 text-4xl'>Relax</h3>
          <p className='text-xl mt-2.5'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            rerum illum sit! Accusamus laborum possimus non ipsam, debitis
            cumque id?
          </p>
          <a
            className='btn inline-block mt-4 px-12 py-4 bg-orange-300 border-2 border-orange-800 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50'
            href='#s'
          >
            More
          </a>
        </div>
        <div className='box text-black w-1/3 shadow-lg shadow-black/30 ml-2.5 px-8 py-5 rounded-xl bg-orange-400'>
          <h3 className='text-gray-100 text-4xl'>Realistic Experience</h3>
          <p className='text-xl mt-2.5'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            rerum illum sit! Accusamus laborum possimus non ipsam, debitis
            cumque id?
          </p>
          <a
            className='btn inline-block mt-4 px-12 py-4 bg-orange-300 border-2 border-orange-800 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50'
            href='#f'
          >
            More
          </a>
        </div>
      </div>
    </section>
  )
}

export default Section3
