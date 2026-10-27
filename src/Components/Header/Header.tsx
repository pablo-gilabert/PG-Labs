import { useContext, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { SiteContext } from '../../Contexts/SiteContext';
import styles from './header.module.css';
export function Header() {
    const { text, theme, toggleTheme } = useContext(SiteContext);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const Pages = [
        { to: '/', label: text.nav.home },
        { to: '/projects', label: text.nav.projects },
        { to: '/services', label: text.nav.services },
        { to: '/lab', label: text.nav.lab },
        { to: '/about', label: text.nav.about },
    ];
    return (<header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="PG Labs — Home" onClick={() => setOpen(false)}>
          <img className={styles.brandLogo} src={theme === 'dark' ? '/brand/pgLabsLogoDark.png' : '/brand/pgLabsLogo.png'} alt="PG Labs"/>
          <span className={styles.brandMeta}><small>WEB DEVELOPMENT · DIGITAL PRODUCTS</small></span>
        </Link>

        <nav className={`${styles.navigation} ${open ? styles.open : ''}`} aria-label="Main navigation">
          {Pages.map(({ to, label }) => (<NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={() => setOpen(false)}>{label}</NavLink>))}
          <NavLink to="/contact" className={`${styles.mobileContact} ${pathname === '/contact' ? styles.active : ''}`} onClick={() => setOpen(false)}>{text.nav.contact}</NavLink>
        </nav>

        <div className={styles.controls}>
          <LanguageSelector />
          <button className={styles.themeButton} onClick={toggleTheme} type="button" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Cambiar a tema oscuro'} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <Link to="/contact" className={styles.contactButton}>{text.nav.contact}<ArrowUpRight size={16}/></Link>
          <button type="button" className={styles.menuButton} aria-label={open ? text.nav.close : text.nav.menu} aria-expanded={open} onClick={() => setOpen((current) => !current)}>{open ? <X size={23}/> : <Menu size={23}/>}</button>
        </div>
      </div>
    </header>);
}

