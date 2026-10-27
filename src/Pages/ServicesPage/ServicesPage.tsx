import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MonitorSmartphone, RefreshCcw, LayoutDashboard, ShoppingCart, Workflow, Wrench, ChevronRight } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import styles from './servicesPage.module.css';
export function ServicesPage() {
    const { text } = useContext(SiteContext);
    const Services = [
        { icon: <MonitorSmartphone size={25}/>, title: text.services.s1, desc: text.services.s1d },
        { icon: <RefreshCcw size={25}/>, title: text.services.s2, desc: text.services.s2d },
        { icon: <LayoutDashboard size={25}/>, title: text.services.s3, desc: text.services.s3d },
        { icon: <ShoppingCart size={25}/>, title: text.services.s4, desc: text.services.s4d },
        { icon: <Workflow size={25}/>, title: text.services.s5, desc: text.services.s5d },
        { icon: <Wrench size={25}/>, title: text.services.s6, desc: text.services.s6d },
    ];
    const Steps = [
        { title: text.services.step1, desc: text.services.step1d }, { title: text.services.step2, desc: text.services.step2d },
        { title: text.services.step3, desc: text.services.step3d }, { title: text.services.step4, desc: text.services.step4d },
    ];
    return <><div className="container"><header className="pageHero"><span className="eyebrow">{text.services.eyebrow}</span><h1 className="displayTitle">{text.services.title}</h1><p className="muted pageLead">{text.services.desc}</p></header><div className={styles.grid}>{Services.map((service, index) => <article key={index} className={styles.service}><div className={styles.cardHead}><div className={styles.icon}>{service.icon}</div><span>{String(index + 1).padStart(2, '0')}</span></div><h2>{service.title}</h2><p>{service.desc}</p><ChevronRight size={17} className={styles.arrow}/></article>)}</div><div className={`subtleNote ${styles.note}`}>{text.services.note}</div></div>
    <section className={`section ${styles.process}`}><div className="container"><span className="eyebrow">PROCESS / 04 STEPS</span><h2 className="sectionTitle">{text.services.included}</h2><div className={styles.steps}>{Steps.map((step, index) => <div key={index} className={styles.step}><span>{String(index + 1).padStart(2, '0')} /</span><h3>{step.title}</h3><p>{step.desc}</p></div>)}</div></div></section>
    <section className="section"><div className="container"><div className="ctaSection"><div><span className="eyebrow">GILABERT STUDIO</span><h2>{text.home.callTitle}</h2><p className="muted">{text.home.callDesc}</p></div><Link to="/contact" className="primaryButton">{text.common.start}<ArrowUpRight size={18}/></Link></div></div></section></>;
}

