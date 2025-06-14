import Copyright from "./components/Copyright"
import Download from "./components/Download"
import Feature from "./components/Feature"
import FooterLink from "./components/FooterLink"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import HowWork from "./components/HowWork"
import Testimonials from "./components/Testimonials"
import "./index.css"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className="flex-1">
        <HeroSection/>
        <Feature/>
        <HowWork/>
        <Testimonials/>
        <Download/>
      </main>
      <footer className="border-t bg-slate-50">
        <FooterLink/>
        <Copyright/>
      </footer>
    </div>
  )
}

export default App
