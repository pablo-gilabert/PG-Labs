import { ArrowUpRight, CalendarDays, GraduationCap, Scissors, Sparkles } from 'lucide-react';
import type { PortfolioProject } from '../../Data/PortfolioData';
import styles from './showcaseVisual.module.css';
export function ShowcaseVisual({ variant }: {
    variant: PortfolioProject['visual'];
}) {
    if (variant === 'academy') {
        return <div className={`${styles.preview} ${styles.academy}`} aria-hidden="true">
    <div className={styles.demoChrome}>
    <span />
    <span />
    <span />
    <i>aulastudio.academy</i>
    </div>
    <div className={styles.academyBody}>
    <div className={styles.academySide}>
    <div className={styles.academyLogo}>A<span>.</span>
    </div>
    <span>▰</span>
    <span>▰</span>
    <span>▰</span>
    <span>▰</span>
    </div>
    <div className={styles.academyContent}>
    <div className={styles.tinyBadge}>ADMIN PANEL</div>
    <h3>Good morning, Alex.</h3>
    <p>Here is your academy at a glance.</p>
    <div className={styles.metrics}>
    <div>
    <strong>248</strong>
    <small>Students</small>
    </div>
    <div>
    <strong>12</strong>
    <small>Courses</small>
    </div>
    <div>
    <strong>94%</strong>
    <small>Attendance</small>
    </div>
    </div>
    <div className={styles.chart}>
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
    </div>
    </div>
    </div>
    </div>;
    }
    if (variant === 'tattoo') {
        return <div className={`${styles.preview} ${styles.tattoo}`} aria-hidden="true">
    <div className={styles.demoChrome}>
    <span />
    <span />
    <span />
    <i>inkstudio.design</i>
    </div>
    <div className={styles.tattooBody}>
    <div className={styles.tattooTop}>INK / STUDIO <span>MENU +</span>
    </div>
    <div className={styles.tattooCenter}>
    <span>CREATIVE BODY ART</span>
    <strong>YOUR SKIN.<br />YOUR STORY.</strong>
    <small>EST. MMXXVI — ART IS FOREVER</small>
    </div>
    <div className={styles.tattooRing}>✦</div>
    <div className={styles.tattooBottom}>BOOK YOUR SESSION <ArrowUpRight size={15}/>
    </div>
    </div>
    </div>;
    }
    return <div className={`${styles.preview} ${styles.salon}`} aria-hidden="true">
    <div className={styles.demoChrome}>
    <span />
    <span />
    <span />
    <i>atelier.salon</i>
    </div>
    <div className={styles.salonBody}>
    <div className={styles.salonBar}>
    <strong>ATELIER<span>.</span>
    </strong>
    <small>MENU &nbsp; SERVICES &nbsp; CONTACT</small>
    </div>
    <div className={styles.salonIllustration}>
    <div className={styles.face}>
    <span className={styles.hair}/>
    <span className={styles.eyeOne}/>
    <span className={styles.eyeTwo}/>
    <span className={styles.mouth}/>
    </div>
    </div>
    <div className={styles.salonCopy}>
    <small>THE ART OF HAIR</small>
    <strong>Style is<br />
    <em>personal.</em>
    </strong>
    <span>DISCOVER YOUR LOOK &nbsp; ↗</span>
    </div>
    </div>
    </div>;
}
export function DashboardVisual() {
    return (<div className={styles.heroWindow} aria-label="Illustration of a business management dashboard">
      <div className={styles.heroWindowHeader}>
    <div className={styles.dots}>
    <i />
    <i />
    <i />
    </div>
    <span>studio-dashboard / overview</span>
    <ArrowUpRight size={15}/>
    </div>
      <div className={styles.heroWindowContent}>
        <aside className={styles.heroSidebar}>
    <div className={styles.sidebarMark}>G.</div>
    <span className={styles.sidebarSelected}>▦</span>
    <span>◈</span>
    <span>≡</span>
    <span>◎</span>
    <div className={styles.sidebarBottom}>⚙</div>
    </aside>
        <div className={styles.heroDashboard}>
    <div className={styles.dashboardHeading}>
    <div>
    <span>MONDAY, OCT 26</span>
    <h3>Overview <Sparkles size={18}/>
    </h3>
    <p>Your business, at a glance.</p>
    </div>
    <span className={styles.avatar}>PG</span>
    </div>
    <div className={styles.heroStats}>
    <div>
    <small>Total revenue</small>
    <b>$24,850</b>
    <em>↗ +12.8%</em>
    </div>
    <div>
    <small>Active clients</small>
    <b>1,284</b>
    <em>↗ +8.4%</em>
    </div>
    </div>
    <div className={styles.chartCard}>
    <div>
    <b>Growth analytics</b>
    <span>Last 7 months</span>
    </div>
    <svg viewBox="0 0 440 150" aria-hidden="true" focusable="false">
    <defs>
    <linearGradient id="chartFade" x1="0" x2="0" y1="0" y2="1">
    <stop stopColor="#bdf37d" stopOpacity=".3"/>
    <stop offset="1" stopColor="#bdf37d" stopOpacity="0"/>
    </linearGradient>
    </defs>
    <path d="M0 145 L0 120 C40 110 42 60 85 83 S155 136 205 70 S275 110 315 44 S390 60 440 10 L440 150 Z" fill="url(#chartFade)"/>
    <path d="M0 120 C40 110 42 60 85 83 S155 136 205 70 S275 110 315 44 S390 60 440 10" stroke="#bdf37d" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
    <div className={styles.axis}>
    <span>APR</span>
    <span>MAY</span>
    <span>JUN</span>
    <span>JUL</span>
    <span>AUG</span>
    <span>SEP</span>
    <span>OCT</span>
    </div>
    </div>
    <div className={styles.dashboardCards}>
    <div>
    <CalendarDays size={18}/>
    <strong>12 bookings</strong>
    <span>Today</span>
    </div>
    <div>
    <GraduationCap size={18}/>
    <strong>24 students</strong>
    <span>Enrolled</span>
    </div>
    <div>
    <Scissors size={18}/>
    <strong>8 services</strong>
    <span>Published</span>
    </div>
    </div>
    </div>
      </div>
      <div className={styles.floatBadge}>
    <div className={styles.floatIcon}>✓</div>
    <div>
    <strong>Everything connected</strong>
    <span>One place. More possibilities.</span>
    </div>
    </div>
    </div>);
}

