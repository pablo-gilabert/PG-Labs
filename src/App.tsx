import { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SiteContext } from './Contexts/SiteContext';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { HomePage } from './Pages/HomePage/HomePage';
import { ProjectsPage } from './Pages/ProjectsPage/ProjectsPage';
import { ServicesPage } from './Pages/ServicesPage/ServicesPage';
import { LabPage } from './Pages/LabPage/LabPage';
import { AboutPage } from './Pages/AboutPage/AboutPage';
import { ContactPage } from './Pages/ContactPage/ContactPage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { ProjectCasePage } from './Pages/ProjectCasePage/ProjectCasePage';
import { PortfolioProjects } from './Data/PortfolioData';
function RouteEffects() {
    const { pathname } = useLocation();
    const { language, text } = useContext(SiteContext);
    useEffect(() => {
        if (!pathname) return;
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);
    useEffect(() => {
        const Labels: Record<string, string> = {
            '/': text.nav.home, '/projects': text.nav.projects,
            '/services': text.nav.services, '/lab': text.nav.lab,
            '/about': text.nav.about, '/contact': text.nav.contact,
        };
        const project = PortfolioProjects.find((item) => pathname === `/projects/${item.id}`);
        document.title = `${project?.title ?? Labels[pathname] ?? '404'} | PG Labs`;
        document.documentElement.lang = language;
    }, [pathname, language, text]);
    return null;
}
export function App() {
    return (<>
      <RouteEffects />
      <a href="#main" className="skipLink">Skip to content / Saltar al contenido</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/projects" element={<ProjectsPage />}/>
          <Route path="/projects/:id" element={<ProjectCasePage />}/>
          <Route path="/services" element={<ServicesPage />}/>
          <Route path="/lab" element={<LabPage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </main>
      <Footer />
    </>);
}

