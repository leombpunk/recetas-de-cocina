const Section2 = () => {
  return (
    <section className='about w-full h-[80vh] bg-orange-500 flex items-center flex-wrap gap-8'>
      <div className='image flex-[1_1_42rem]'>
        <img src='image/about.png' className='w-full' alt='' />
      </div>
      <div className='content flex-[1_1_42rem]'>
        <h3 className='text-orange-900 text-7xl'>the future is today</h3>
        <p className='text-2xl text-gray-700 leading-10 px-0 py-4'>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit, amet provident! Nobis veritatis placeat quos!{" "}
        </p>
        <a
          className='btn inline-block mt-4 px-12 py-4 bg-orange-300 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50'
          href='#a'
        >
          learn more
        </a>
      </div>
    </section>
  )
}

export default Section2
