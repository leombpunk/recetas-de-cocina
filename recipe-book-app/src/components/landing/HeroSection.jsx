import home from "../../assets/images/vecteezy_ai-generated-cartoon-chef-with-thumbs-up-suitable-for-food_41642037.webp"
import bgHome from "../../assets/images/bg-home.webp"
import { Link } from "react-router-dom"
import NavigationRoutes from "../../utils/NavigationRoutes"

const HeroSection = () => {
  return (
    <section className='relative w-full bg-orange-400 bg-cover bg-center min-h-[90svh]'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8 h-max'>
        <div className='flex flex-col lg:flex-row items-center gap-6 w-full'>
          <div className='flex flex-col gap-4 lg:w-1/2'>
            <h1 className='pacifico-regular text-black text-4xl md:text-6xl'>
              Recipe App
            </h1>
            <h3 className='text-black text-5xl md:text-7xl uppercase py-2'>
              Crea ✨<br /> Comparte 🤝 <br /> Disfruta 😋
            </h3>
            <Link
              className='bg-orange-300 max-w-min mt-4 px-12 py-4 text-black text-2xl font-medium hover:bg-orange-500 rounded-xl shadow-md hover:shadow-black/50 duration-300'
              to={NavigationRoutes.Register}
            >
              Registrate
            </Link>
          </div>
          <div
            className='lg:w-1/2 rounded-3xl shadow-md shadow-black/50'
            style={{ backgroundImage: `url(${bgHome})`, backgroundPosition:'center', backgroundSize:"cover" }}
          >
            <img src={home} className='w-full' alt='imagen de chefsito' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
