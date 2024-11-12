import home from "../../assets/images/vecteezy_ai-generated-cartoon-chef-with-thumbs-up-suitable-for-food_41642037.webp"
// import bring from "../../assets/images/sparkles.webp"
import bgHome from "../../assets/images/bg-home.webp"

const HeroMain = () => {
  return (
    <section className='home relative w-full bg-orange-400 bg-cover bg-center lg:max-h-[90svh]'>
      <div className='container mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 h-max'>
        <div className='landing flex flex-col lg:flex-row flex-wrap items-center gap-6'>
          <div className='content'>
            <span className='pacifico-regular text-black text-5xl'>
              Recipe App
            </span>
            <h3 className='text-black text-7xl uppercase py-2'>
              {/* <span className="flex flex-row">
                {" "}
                crea
                <picture>
                  <source srcset={bring} type='image/webp' />
                  <img src={bring} alt='✨' width='72' height='72' />
                </picture>
              </span> */}
              Crea ✨<br /> Comparte 🤝 <br /> Disfruta 😋
            </h3>
            <a
              className='btn inline-block mt-4 px-12 py-4 bg-orange-300 text-black text-xl font-medium cursor-pointer hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50'
              href='#asd'
            >
              Registrate
            </a>
          </div>
          <div
            className='image flex-[1_1_40rem] rounded-3xl shadow-md shadow-black/50'
            style={{ backgroundImage: `url(${bgHome})`, backgroundPosition:'center', backgroundSize:"cover" }}
          >
            {" "}
            <img src={home} className='w-full' alt='imagen de chefsito' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroMain
