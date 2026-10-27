import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Code2, Layers3, RotateCw, Sparkles, MoveUpRight, MousePointer2, Globe2 } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import { PortfolioProjects } from '../../Data/PortfolioData';
import { DashboardVisual } from '../../Components/ShowcaseVisual/ShowcaseVisual';
import { ProjectCard } from '../../Components/ProjectCard/ProjectCard';
import styles from './homePage.module.css';
export function HomePage() {
    const { text } = useContext(SiteContext);
    const Solutions = [
        { icon: <Code2 size={24}/>, number: '01', title: text.home.serviceOne, desc: text.home.serviceOneDesc },
        { icon: <Layers3 size={24}/>, number: '02', title: text.home.serviceTwo, desc: text.home.serviceTwoDesc },
        { icon: <RotateCw size={24}/>, number: '03', title: text.home.serviceThree, desc: text.home.serviceThreeDesc },
    ];
    return <>
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <div className="badge"><span className="badgeDot"/>{text.common.available}</div>
          <p className={`eyebrow ${styles.heroEyebrow}`}>{text.home.eyebrow}</p>
          <h1>{text.home.titleOne}<br /><span>{text.home.titleTwo}</span></h1>
          <p className={styles.heroDescription}>{text.home.desc}</p>
          <div className={styles.heroActions}><Link to="/contact" className="primaryButton">{text.home.primary}<ArrowUpRight size={18}/></Link><Link to="/projects" className="secondaryButton">{text.home.secondary}<ArrowRight size={18}/></Link></div>
          <div className={styles.heroHighlights}><span><Sparkles size={16}/>{text.home.miniOne}</span><span><Code2 size={16}/>{text.home.miniTwo}</span><span><Globe2 size={16}/>{text.home.miniThree}</span></div>
        </div>
        <div className={styles.heroVisual}><div className={styles.glow}/><div className={styles.gridPlane}/><DashboardVisual /></div>
      </div>
      <div className={`container ${styles.trustLine}`}><span className={styles.trustCaption}>REACT / TYPESCRIPT / UI SYSTEMS</span><div className={styles.trustStack}><span>React</span><b>✳</b><span>TypeScript</span><b>✳</b><span>Vite</span><b>✳</b><span>CSS Modules</span><b>✳</b><span>REST APIs</span></div></div>
    </section>

    <section className="section" id="projects"><div className="container"><div className="sectionIntro"><div><span className="eyebrow">{text.home.showcaseEyebrow}</span><h2 className="sectionTitle" style={{ margin: '16px 0 0' }}>{text.home.showcaseTitle}</h2></div><div><p className="muted">{text.home.showcaseDescription}</p><Link to="/projects" className={styles.textLink}>{text.common.viewAll}<ArrowUpRight size={17}/></Link></div></div><div className={styles.projectGrid}>{PortfolioProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index}/>)}</div><p className={styles.demoDisclaimer}>{text.projects.note}</p></div></section>

    <section className={`section ${styles.solutionsSection}`}><div className="container"><div className={styles.solutionsHeader}><span className="eyebrow">{text.home.valueEyebrow}</span><h2 className="sectionTitle">{text.home.valueTitle}</h2><p className="muted">{text.home.valueDesc}</p></div><div className={styles.solutionGrid}>{Solutions.map((solution) => <div key={solution.number} className={styles.solutionCard}><span className={styles.solutionNumber}>{solution.number} /</span><div className={styles.solutionIcon}>{solution.icon}</div><h3>{solution.title}</h3><p>{solution.desc}</p><MoveUpRight size={18} className={styles.solutionArrow}/></div>)}</div></div></section>

    <section className="section"><div className={`container ${styles.labFeature}`}><div className={styles.labVisual}><div className={styles.labVisualTop}><div className={styles.fakeDots}><i /><i /><i /></div><span>interactive-playground / demo</span><span>✦</span></div><div className={styles.labMock}><div className={styles.labMockSide}><span>◫</span><span>▤</span><span>◉</span></div><div className={styles.labMockBody}><div className={styles.labMockTitle}><strong>Manage your workspace</strong><span>+ Add new</span></div><div className={styles.labMockRow}><i className={styles.avatarOne}/> <span>Camila Rodríguez<small>Design Fundamentals</small></span><b>Active</b></div><div className={styles.labMockRow}><i className={styles.avatarTwo}/> <span>Mateo Silva<small>Advanced Workshop</small></span><b>Active</b></div><div className={styles.labMockRow}><i className={styles.avatarThree}/> <span>Valentina Costa<small>Professional Track</small></span><b>Active</b></div></div></div><div className={styles.cursor}><MousePointer2 size={25}/></div></div><div className={styles.labFeatureCopy}><span className="eyebrow">{text.home.labEyebrow}</span><h2 className="sectionTitle">{text.home.labTitle}</h2><p className="muted">{text.home.labDesc}</p><div className={styles.labTags}><span>CRUD</span><span>CMS</span><span>E-COMMERCE</span><span>UX/UI</span></div><Link to="/lab" className="primaryButton">{text.home.labCta}<ArrowUpRight size={18}/></Link></div></div></section>

    <section className={`section ${styles.ctaPadding}`}><div className="container"><div className="ctaSection"><div><div className="eyebrow">{text.home.callEyebrow}</div><h2>{text.home.callTitle}</h2><p className="muted">{text.home.callDesc}</p></div><Link to="/contact" className="primaryButton">{text.common.talk}<ArrowUpRight size={18}/></Link></div></div></section>
  </>;
}

