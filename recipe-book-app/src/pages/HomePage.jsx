import BentoGrid from "../components/landing/BentoGrid"
import Feedback from "../components/landing/Feedback"
// import HeroMain from "../components/landing/HeroMain"
import HeroSection from "../components/landing/HeroSection"
// import Section2 from "../components/landing/Section2"
// import Section3 from "../components/landing/Section3"
import Stats from "../components/landing/Stats"

const HomePage = () => {
  return (
    <>
      <main className="w-full bg-orange-300 flex flex-col justify-center items-center">
        <HeroSection />
        <BentoGrid />
        {/* <HeroMain /> */}
        <Stats />
        <Feedback />
        {/* <Section2 /> */}
        {/* <Section3 /> */}
      </main>
    </>
  )
}

export default HomePage
