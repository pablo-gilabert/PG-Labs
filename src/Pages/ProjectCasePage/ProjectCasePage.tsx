import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink, Lightbulb, Target, Users } from 'lucide-react';
import { GithubIcon } from '../../Components/BrandIcons/BrandIcons';
import { ProjectArtwork } from '../../Components/ProjectArtwork/ProjectArtwork';
import { SiteContext } from '../../Contexts/SiteContext';
import { PortfolioProjects } from '../../Data/PortfolioData';
import { ProjectStories } from '../../Data/ProjectStories';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import styles from './projectCasePage.module.css';

export function ProjectCasePage() {
  const { id } = useParams();
  const { text, language } = useContext(SiteContext);
  const project = PortfolioProjects.find((item) => item.id === id);

  if (!project) {
    return <NotFoundPage />;
  }

  const story = ProjectStories[language][project.id];

  return (
    <>
      <div className="container">
        <div className={styles.backLine}>
          <Link to="/projects"><ArrowLeft size={17} />{text.projects.detailBack}</Link>
          <span>{text.projects[project.category]} / {project.title}</span>
        </div>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className="eyebrow">{text.common.demo} / {story.typeLabel}</span>
            <h1>{project.title}<span>.</span></h1>
            <h2>{story.headline}</h2>
            <p>{story.summary}</p>
            <div className={styles.actions}>
              <a className="primaryButton" href={project.live} target="_blank" rel="noopener noreferrer">
                {text.common.live}<ArrowUpRight size={18} />
              </a>
              {project.repo && (
                <a className="secondaryButton" href={project.repo} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={18} />{text.common.source}<ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
          <div className={styles.heroVisual}>
            <ProjectArtwork variant={project.visual} />
            <span>{text.projects.previewLabel}</span>
          </div>
        </header>
        <div className={styles.storyGrid}>
          <section className={styles.storyCard}>
            <div className={styles.storyIcon}><Target size={23}/></div>
            <span className="eyebrow">01 / {text.projects.problemLabel}</span>
            <h2>{story.challenge}</h2>
          </section>
          <section className={styles.storyCard}>
            <div className={styles.storyIcon}><Lightbulb size={23}/></div>
            <span className="eyebrow">02 / {text.projects.solutionLabel}</span>
            <h2>{story.solution}</h2>
          </section>
        </div>
        <div className={styles.lowerGrid}>
          <section className={styles.features}>
            <span className="eyebrow">{text.projects.highlightsLabel}</span>
            <h2 className="sectionTitle">{text.projects.featureIntro}</h2>
            <ul>
              {story.features.map((feature) => <li key={feature}><CheckCircle2 size={20}/>{feature}</li>)}
            </ul>
            <div className={styles.tags}>{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </section>
          <aside className={styles.sideNotes}>
            <div><Users size={22}/><h3>{text.projects.audienceLabel}</h3><p>{story.audience}</p></div>
            <div><ExternalLink size={22}/><h3>{text.projects.tryLabel}</h3><p>{story.tryIt}</p><a href={project.live} target="_blank" rel="noopener noreferrer">{text.projects.liveNote}<ArrowUpRight size={15}/></a></div>
          </aside>
        </div>
        <p className={styles.disclaimer}>{text.projects.detailDisclaimer}</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="ctaSection">
            <div><span className="eyebrow">{text.projects.detailNext}</span><h2>{text.projects.detailNextDesc}</h2></div>
            <Link to="/contact" className="primaryButton">{text.common.talk}<ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>
    </>
  );
}
