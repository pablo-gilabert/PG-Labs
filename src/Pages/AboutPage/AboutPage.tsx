import { GithubIcon } from '../../Components/BrandIcons/BrandIcons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Target, CodeXml, MessageCircle, MapPin, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import { ContactDetails, ProfessionalStack } from '../../Data/PortfolioData';
import styles from './aboutPage.module.css';
export function AboutPage() {
    const { text } = useContext(SiteContext);
    const Values = [
        { icon: <Target size={23}/>, title: text.about.strength1, desc: text.about.strength1d },
        { icon: <CodeXml size={23}/>, title: text.about.strength2, desc: text.about.strength2d },
        { icon: <MessageCircle size={23}/>, title: text.about.strength3, desc: text.about.strength3d },
    ];
    return <><div className="container"><header className="pageHero"><span className="eyebrow">{text.about.eyebrow}</span><h1 className="displayTitle">{text.about.title}</h1><p className="muted pageLead">{text.about.desc}</p></header><div className={styles.profile}><div className={styles.identity}><div className={styles.avatar}><span>P<span>G</span></span><i>FRONTEND DEVELOPER</i></div><div className={styles.identityBottom}><span><MapPin size={16}/>Buenos Aires, Argentina</span><a href={ContactDetails.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a></div></div><div className={styles.summary}><span className="eyebrow">{text.about.profile}</span><h2>Pablo Gilabert<span>.</span></h2><p>{text.about.profileText}</p><div className={styles.infoPair}><BriefcaseBusiness size={22}/><div><strong>{text.about.experience}</strong><span>{text.about.since}</span></div></div><div className={styles.infoPair}><GraduationCap size={22}/><div><strong>{text.about.languages}</strong><span>{text.about.languageEs} · {text.about.languageEn}</span></div></div><a className={styles.githubLink} href={ContactDetails.github} target="_blank" rel="noreferrer"><GithubIcon size={17}/>GitHub <ArrowUpRight size={15}/></a></div></div></div>
    <section className={`section ${styles.experience}`}><div className="container"><span className="eyebrow">EXPERIENCE / 2022 — NOW</span><h2 className="sectionTitle">{text.about.resume}</h2><div className={styles.timeline}><div><span>2022 — ∞</span><span className={styles.timelineDot}/></div><div><h3>{text.about.experience}</h3><span>{text.about.since}</span><p>{text.about.experienceDesc}</p></div></div></div></section>
    <section className="section"><div className="container"><span className="eyebrow">PHILOSOPHY / VALUES</span><h2 className="sectionTitle" style={{ margin: '17px 0 31px' }}>{text.about.strengths}</h2><div className={styles.valueGrid}>{Values.map((value) => <article key={value.title} className={styles.value}><span>{value.icon}</span><h3>{value.title}</h3><p>{value.desc}</p></article>)}</div></div></section>
    <section className={`section ${styles.stackSection}`}><div className="container"><span className="eyebrow">TECH STACK / SKILLS</span><h2 className="sectionTitle">{text.about.stack}</h2><div className={styles.stack}>{ProfessionalStack.map((item) => <span key={item}>{item}</span>)}</div><div className={styles.languages}><strong>{text.about.languages}</strong><span>{text.about.languageEs}</span><span>{text.about.languageEn}</span><small>{text.about.languagePt}</small></div></div></section>
    <section className="section"><div className="container"><div className="ctaSection"><div><span className="eyebrow">LET'S BUILD SOMETHING</span><h2>{text.home.callTitle}</h2></div><Link to="/contact" className="primaryButton">{text.common.talk}<ArrowUpRight size={18}/></Link></div></div></section></>;
}

