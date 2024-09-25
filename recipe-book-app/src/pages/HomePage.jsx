const HomePage = () => {
  return (
    <>
      <main className="w-full bg-orange-300 flex flex-col justify-center items-center">
        <section className='home relative w-full bg-orange-400 pt-32 bg-cover bg-center'>
          <div className='container mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <div className='landing flex flex-wrap items-center gap-6'>
              <div className='content'>
                <span className="text-white text-4xl">Recipe App</span>
                <h3 className="text-gray-50 text-8xl uppercase py-2">
                  {" "}
                  be part <br /> of the new <br /> technologies{" "}
                </h3>
                <a className='btn inline-block mt-4 px-12 py-4 bg-orange-300 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50' href='#asd'>
                  Learn More
                </a>
              </div>
              <div className='image flex-[1_1_40rem] ml-0 mr-12 mt-12 mb-0'>
                <img src='image/home.png' className="w-full" alt='' />
              </div>
            </div>
          </div>
        </section>
        <section className='about w-full h-[80vh] bg-orange-500 flex items-center flex-wrap gap-8'>
          <div className='image flex-[1_1_42rem]'>
            <img src='image/about.png' className="w-full" alt='' />
          </div>
          <div className='content flex-[1_1_42rem]'>
            <h3 className="text-orange-900 text-7xl">the future is today</h3>
            <p className="text-2xl text-gray-700 leading-10 px-0 py-4">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit, amet provident! Nobis veritatis placeat quos!{" "}
            </p>
            <a className='btn inline-block mt-4 px-12 py-4 bg-orange-300 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50' href='#a'>
              learn more
            </a>
          </div>
        </section>
        <section className='services w-full bg-orange-600 text-center text-white h-[80vh]'>
          <h2 className="text-gray-50 text-6xl uppercase mt-12">VR's Surprising Benefits</h2>
          <p className="text-xl my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
            facere!
          </p>
          <div className='services-box flex gap-2 p-5'>
            <div className='box text-black w-1/3 shadow-lg shadow-black/30 ml-2.5 px-8 py-5 rounded-xl bg-orange-400'>
              <h3 className="text-gray-100 text-4xl">Mental health</h3>
              <p className="text-xl mt-2.5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
                rerum illum sit! Accusamus laborum possimus non ipsam, debitis
                cumque id?
              </p>
              <a className='btn inline-block mt-4 px-12 py-4 bg-orange-300 border-2 border-orange-800 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50' href='#d'>
                More
              </a>
            </div>
            <div className='box text-black w-1/3 shadow-lg shadow-black/30 ml-2.5 px-8 py-5 rounded-xl bg-orange-400'>
              <h3 className="text-gray-100 text-4xl">Relax</h3>
              <p className="text-xl mt-2.5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
                rerum illum sit! Accusamus laborum possimus non ipsam, debitis
                cumque id?
              </p>
              <a className='btn inline-block mt-4 px-12 py-4 bg-orange-300 border-2 border-orange-800 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50' href='#s'>
                More
              </a>
            </div>
            <div className='box text-black w-1/3 shadow-lg shadow-black/30 ml-2.5 px-8 py-5 rounded-xl bg-orange-400'>
              <h3 className="text-gray-100 text-4xl">Realistic Experience</h3>
              <p className="text-xl mt-2.5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
                rerum illum sit! Accusamus laborum possimus non ipsam, debitis
                cumque id?
              </p>
              <a className='btn inline-block mt-4 px-12 py-4 bg-orange-300 border-2 border-orange-800 text-black text-xl cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50' href='#f'>
                More
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage
