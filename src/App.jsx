import NavBar from './components/NavBar.jsx';
import Contact from './sections/Contact.jsx';

// Section components are added incrementally, one per user story:
// Hero (US1), Expertise (US2), Contact (US3). See specs/001-architect-portfolio-site/tasks.md.
export default function App() {
  return (
    <div id="top">
      <NavBar />
      <main className="pt-20">
        {/* Hero and Expertise sections land here */}
        <Contact />
      </main>
    </div>
  );
}
