import { GithubIcon, LinkedinIcon } from '../../Components/BrandIcons/BrandIcons';
import { useContext, useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import { ContactDetails } from '../../Data/PortfolioData';
import styles from './contactPage.module.css';
export function ContactPage() {
    const { text } = useContext(SiteContext);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    function OpenEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const mailto = `mailto:${ContactDetails.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(message.trim())}`;
        window.location.href = mailto;
    }
    const Channels = [
        { icon: <Mail size={19}/>, name: text.contact.email, value: ContactDetails.email, href: `mailto:${ContactDetails.email}` },
        { icon: <MessageCircle size={19}/>, name: text.contact.whatsApp, value: ContactDetails.phone, href: `https://wa.me/${ContactDetails.whatsApp}` },
        { icon: <GithubIcon size={19}/>, name: text.contact.github, value: 'github.com/pablo-gilabert', href: ContactDetails.github },
        { icon: <LinkedinIcon size={19}/>, name: text.contact.linkedIn, value: 'Pablo Gilabert', href: ContactDetails.linkedIn },
    ];
    return <div className="container"><header className="pageHero"><span className="eyebrow">{text.contact.eyebrow}</span><h1 className="displayTitle">{text.contact.title}</h1><p className="muted pageLead">{text.contact.desc}</p></header><div className={styles.layout}><div className={styles.channels}><div className="badge"><span className="badgeDot"/>{text.common.available}</div><h2>{text.contact.or}</h2><div className={styles.channelList}>{Channels.map((channel) => <a key={channel.name} className={styles.channel} href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}><span className={styles.icon}>{channel.icon}</span><span className={styles.channelText}><strong>{channel.name}</strong><small>{channel.value}</small></span><ArrowUpRight size={17}/></a>)}</div><div className={styles.location}><MapPin size={18}/><span>{text.contact.locationValue}</span></div></div><form className={styles.form} onSubmit={OpenEmail}><span className="eyebrow">CONTACT / PROJECT</span><h2>{text.contact.project}</h2><div className="field"><label htmlFor="contact-subject">{text.contact.subject}</label><input id="contact-subject" className="input" required maxLength={150} value={subject} onChange={(event) => setSubject(event.target.value)} placeholder={text.contact.subjectPlaceholder}/></div><div className="field"><label htmlFor="contact-message">{text.contact.message}</label><textarea id="contact-message" className="input" required minLength={10} maxLength={5000} value={message} onChange={(event) => setMessage(event.target.value)} placeholder={text.contact.messagePlaceholder}/></div><button type="submit" className="primaryButton"><Send size={17}/>{text.contact.emailMe}<ArrowUpRight size={17}/></button><p className={styles.formNote}>{text.contact.note}</p></form></div></div>;
}

