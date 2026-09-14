import NavBar from './components/NavBar.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import Hero from './sections/Hero.jsx';
import Expertise from './sections/Expertise.jsx';
import Approach from './sections/Approach.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  return (
    <div id="top">
      <NavBar />
      <main className="pt-20">
        <Hero />
        <Expertise />
        <Approach />
        <Contact />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
