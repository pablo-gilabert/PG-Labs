import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../BrandIcons/BrandIcons';
import { SiteContext } from '../../Contexts/SiteContext';
import { ProjectStories } from '../../Data/ProjectStories';
import type { PortfolioProject } from '../../Data/PortfolioData';
import { ProjectArtwork } from '../ProjectArtwork/ProjectArtwork';
import styles from './projectCard.module.css';

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { text, language } = useContext(SiteContext);
  const story = ProjectStories[language][project.id];
  const category = text.projects[project.category];

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <ProjectArtwork variant={project.visual} />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{String(index + 1).padStart(2, '0')} / {category}</span>
          <span className={styles.demo}>{text.common.demo}</span>
        </div>
        <p className={styles.typeLabel}>{story.typeLabel}</p>
        <h3>{project.title}</h3>
        <p className={styles.headline}>{story.headline}</p>
        <div className={styles.problem}>
          <strong>{text.projects.problemLabel}</strong>
          <p>{story.challenge}</p>
        </div>
        <div className={styles.stack}>
          {project.stack.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}
        </div>
        <div className={styles.links}>
          <Link className={styles.caseLink} to={`/projects/${project.id}`} aria-label={`${text.projects.caseLink}: ${project.title} — ${story.typeLabel}`}>
            {text.projects.caseLink} <ArrowRight size={16} />
          </Link>
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            {text.common.live}<ArrowUpRight size={15} />
          </a>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${text.common.source}: ${project.title}`}>
              <GithubIcon size={16} />
              <span className="srOnly">{text.common.source}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
