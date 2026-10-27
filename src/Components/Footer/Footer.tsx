import { GithubIcon, LinkedinIcon } from '../BrandIcons/BrandIcons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ArrowUp } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import { ContactDetails } from '../../Data/PortfolioData';
import styles from './footer.module.css';
const CurrentYear = new Date().getFullYear();

export function Footer() {
    const { text, theme } = useContext(SiteContext);
    return (<footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.intro}>
            <div className={styles.brandWrap}>
              <img className={styles.brandLogo} src={theme === 'dark' ? '/brand/pgLabsLogoDark.png' : '/brand/pgLabsLogo.png'} alt="PG Labs"/>
            </div>
            <p>{text.footer.desc}</p>
            <Link to="/contact" className={styles.talk}>{text.common.talk}<ArrowUpRight size={17}/></Link>
          </div>
          <div className={styles.links}><h3>{text.footer.navigation}</h3>{[['/', text.nav.home], ['/projects', text.nav.projects], ['/services', text.nav.services], ['/lab', text.nav.lab], ['/about', text.nav.about]].map(([path, label]) => <Link key={path} to={path}>{label}<ArrowRight size={13}/></Link>)}</div>
          <div className={styles.links}><h3>{text.footer.contact}</h3><a href={`mailto:${ContactDetails.email}`}>{ContactDetails.email}</a><a href={`https://wa.me/${ContactDetails.whatsApp}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={ContactDetails.github} target="_blank" rel="noreferrer"><GithubIcon size={15}/> GitHub</a><a href={ContactDetails.linkedIn} target="_blank" rel="noreferrer"><LinkedinIcon size={15}/> LinkedIn</a></div>
        </div>
        <div className={styles.bottom}><span>© {CurrentYear} Pablo Gilabert. {text.footer.copyright}</span><span>{text.footer.signature}</span><a href="#main" aria-label={text.footer.toTop}><ArrowUp size={18}/></a></div>
      </div>
    </footer>);
}

