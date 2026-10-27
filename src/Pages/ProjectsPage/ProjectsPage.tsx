import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers3, Globe2 } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import { PortfolioProjects, type ProjectCategory } from '../../Data/PortfolioData';
import { ProjectCard } from '../../Components/ProjectCard/ProjectCard';
import styles from './projectsPage.module.css';

type Filter = ProjectCategory | 'all';

export function ProjectsPage() {
  const { text } = useContext(SiteContext);
  const [filter, setFilter] = useState<Filter>('all');
  const filters: Filter[] = ['all', 'gastronomy', 'education', 'beauty', 'creative', 'commerce'];
  const filteredProjects = PortfolioProjects.filter((project) => filter === 'all' || project.category === filter);
  const industryCount = new Set(PortfolioProjects.map((project) => project.category)).size;

  return (
    <>
      <div className="container">
        <header className="pageHero">
          <span className="eyebrow">{text.projects.eyebrow}</span>
          <h1 className="displayTitle">{text.projects.title}</h1>
          <p className="muted pageLead">{text.projects.desc}</p>
        </header>
        <div className={styles.overview}>
          <div><Layers3 size={19} /><strong>{PortfolioProjects.length}</strong><span>{text.projects.projectCounter}</span></div>
          <div><Globe2 size={19} /><strong>{industryCount}</strong><span>{text.projects.industryCounter}</span></div>
          <p>{text.projects.featureDesc}</p>
        </div>
        <fieldset className={styles.filters}>
          <legend className="srOnly">{text.projects.allLabel}</legend>
          {filters.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setFilter(category)}
              className={`${styles.filter} ${category === filter ? styles.selected : ''}`}
              aria-pressed={category === filter}
            >
              {category === 'all' ? text.projects.allLabel : text.projects[category]}
              <span>{category === 'all' ? PortfolioProjects.length : PortfolioProjects.filter((project) => project.category === category).length}</span>
            </button>
          ))}
        </fieldset>
        <p className={styles.results} aria-live="polite">{filteredProjects.length} {text.projects.resultsWord}</p>
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} index={PortfolioProjects.indexOf(project)} />
          ))}
        </div>
        <p className={`subtleNote ${styles.note}`}>{text.projects.note}</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="ctaSection">
            <div><span className="eyebrow">{text.projects.ready}</span><h2>{text.projects.readyDesc}</h2></div>
            <Link to="/contact" className="primaryButton">{text.common.talk}<ArrowUpRight size={18}/></Link>
          </div>
        </div>
      </section>
    </>
  );
}
