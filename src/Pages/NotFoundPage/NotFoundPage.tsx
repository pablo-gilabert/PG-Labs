import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import styles from './notFoundPage.module.css';
export function NotFoundPage() { const { text } = useContext(SiteContext); return <section className={styles.wrapper}><div className="container"><span className={styles.number}>404<span>.</span></span><h1>{text.notFound.title}</h1><p className="muted">{text.notFound.desc}</p><Link to="/" className="primaryButton"><ArrowLeft size={17}/>{text.common.back}</Link></div></section>; }

