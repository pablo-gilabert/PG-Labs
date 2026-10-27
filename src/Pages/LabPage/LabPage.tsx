import { useContext, useEffect, useState } from 'react';
import { Users, Scissors, Blocks, ShoppingBag, RotateCcw, Info, ArrowUpRight, GraduationCap, Eye, Pencil, Trash2, Plus, Search, ArrowUp, ArrowDown, Minus, ShoppingCart, History } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import { ConfirmModal, OpenModalForm, SuccessModal } from '../../Components/SweetAlertForms/SweetAlertForms';
import type { ModalLabels } from '../../Components/SweetAlertForms/SweetAlertForms';
import { formatMoney, ReadDemo, WriteDemo } from '../../Utils/DemoStorage';
import type { Translation } from '../../Data/Translations';
import styles from './labPage.module.css';
type LabTab = 'students' | 'services' | 'sections' | 'shop';
type StudentStatus = 'enrolled' | 'paused' | 'graduated';
interface Student {
    id: string;
    name: string;
    course: string;
    status: StudentStatus;
}
interface BusinessService {
    id: string;
    name: string;
    category: string;
    price: number;
    visible: boolean;
}
interface ContentSection {
    id: string;
    heading: string;
    body: string;
}
interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    symbol: string;
    color: string;
}
interface Order {
    id: string;
    total: number;
    quantity: number;
    time: string;
}
const InitialStudents: Student[] = [
    { id: '1', name: 'Camila Rodríguez', course: 'Estilismo profesional', status: 'enrolled' },
    { id: '2', name: 'Mateo Silva', course: 'Colorimetría', status: 'enrolled' },
    { id: '3', name: 'Valentina Costa', course: 'Corte avanzado', status: 'paused' },
    { id: '4', name: 'Sofía Fernández', course: 'Estilismo profesional', status: 'graduated' },
];
const InitialServices: BusinessService[] = [
    { id: '1', name: 'Corte y styling', category: 'Peluquería', price: 18000, visible: true },
    { id: '2', name: 'Color y reflejos', category: 'Color', price: 45000, visible: true },
    { id: '3', name: 'Tratamiento capilar', category: 'Tratamientos', price: 28000, visible: true },
    { id: '4', name: 'Asesoría personalizada', category: 'Consultoría', price: 12000, visible: false },
];
const InitialSections: ContentSection[] = [
    { id: '1', heading: 'Bienvenidos a nuestro estudio', body: 'Un espacio para descubrir tu próxima experiencia. Conocé nuestro trabajo y todos nuestros servicios.' },
    { id: '2', heading: 'Nuestros servicios', body: 'Atención personalizada, calidad y pasión por cada detalle. Reservá tu próximo turno.' },
];
const Products: Product[] = [
    { id: 'p1', name: 'Studio Notebook', category: 'Stationery', price: 12500, symbol: 'N°', color: '#b8d8c8' },
    { id: 'p2', name: 'Everyday Tote', category: 'Accessories', price: 23000, symbol: 'T.', color: '#e8c4a9' },
    { id: 'p3', name: 'Ceramic Mug', category: 'Lifestyle', price: 18000, symbol: 'C°', color: '#c6bddf' },
    { id: 'p4', name: 'Desk Calendar', category: 'Stationery', price: 9000, symbol: '12', color: '#e4d59d' },
];
function NewId(): string { return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
// Saved demo data is untrusted input and must be checked before rendering.
function IsRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function IsStudentStatus(value: string): value is StudentStatus {
    return value === 'enrolled' || value === 'paused' || value === 'graduated';
}
function IsStudent(value: unknown): value is Student {
    return IsRecord(value)
        && typeof value.id === 'string'
        && typeof value.name === 'string'
        && typeof value.course === 'string'
        && (value.status === 'enrolled' || value.status === 'paused' || value.status === 'graduated');
}
function IsBusinessService(value: unknown): value is BusinessService {
    return IsRecord(value)
        && typeof value.id === 'string'
        && typeof value.name === 'string'
        && typeof value.category === 'string'
        && typeof value.price === 'number'
        && Number.isFinite(value.price)
        && typeof value.visible === 'boolean';
}
function IsContentSection(value: unknown): value is ContentSection {
    return IsRecord(value)
        && typeof value.id === 'string'
        && typeof value.heading === 'string'
        && typeof value.body === 'string';
}
function IsOrder(value: unknown): value is Order {
    return IsRecord(value)
        && typeof value.id === 'string'
        && typeof value.total === 'number'
        && Number.isFinite(value.total)
        && typeof value.quantity === 'number'
        && Number.isInteger(value.quantity)
        && typeof value.time === 'string';
}
function IsStudents(value: unknown): value is Student[] {
    return Array.isArray(value) && value.every(IsStudent);
}
function IsBusinessServices(value: unknown): value is BusinessService[] {
    return Array.isArray(value) && value.every(IsBusinessService);
}
function IsContentSections(value: unknown): value is ContentSection[] {
    return Array.isArray(value) && value.every(IsContentSection);
}
function IsOrders(value: unknown): value is Order[] {
    return Array.isArray(value) && value.every(IsOrder);
}
function IsCart(value: unknown): value is Record<string, number> {
    return IsRecord(value) && Object.values(value).every((quantity) => typeof quantity === 'number' && Number.isInteger(quantity) && quantity >= 0);
}
function modalLabels(text: Translation): ModalLabels {
    return { save: text.common.save, cancel: text.common.cancel, confirm: text.common.confirm, validation: text.lab.validation };
}

export function LabPage() {
    const { text, language } = useContext(SiteContext);
    const [tab, setTab] = useState<LabTab>('students');
    const [students, setStudents] = useState<Student[]>(() => ReadDemo('students', InitialStudents, IsStudents));
    const [services, setServices] = useState<BusinessService[]>(() => ReadDemo('services', InitialServices, IsBusinessServices));
    const [sections, setSections] = useState<ContentSection[]>(() => ReadDemo('sections', InitialSections, IsContentSections));
    const [cart, setCart] = useState<Record<string, number>>(() => ReadDemo('cart', {}, IsCart));
    const [orders, setOrders] = useState<Order[]>(() => ReadDemo('orders', [], IsOrders));
    useEffect(() => WriteDemo('students', students), [students]);
    useEffect(() => WriteDemo('services', services), [services]);
    useEffect(() => WriteDemo('sections', sections), [sections]);
    useEffect(() => WriteDemo('cart', cart), [cart]);
    useEffect(() => WriteDemo('orders', orders), [orders]);
    async function ResetDemos() {
        if (!await ConfirmModal(text.common.reset, text.lab.resetConfirm, modalLabels(text), true)) return;
        setStudents(InitialStudents);
        setServices(InitialServices);
        setSections(InitialSections);
        setCart({});
        setOrders([]);
    }
    const Tabs: {
        id: LabTab;
        icon: typeof Users;
        desc: string;
        label: string;
    }[] = [
        { id: 'students', icon: Users, label: text.lab.students, desc: text.lab.studentsDesc },
        { id: 'services', icon: Scissors, label: text.lab.services, desc: text.lab.servicesDesc },
        { id: 'sections', icon: Blocks, label: text.lab.sections, desc: text.lab.sectionsDesc },
        { id: 'shop', icon: ShoppingBag, label: text.lab.shop, desc: text.lab.shopDesc },
    ];
    return <div className="container">
    <header className="pageHero">
    <span className="eyebrow">{text.lab.eyebrow}</span>
    <h1 className="displayTitle">{text.lab.title}</h1>
    <p className="muted pageLead">{text.lab.desc}</p>
    </header>
    <div className={styles.notice} role="note">
    <Info size={18}/>
    <p>{text.lab.notice}</p>
    <button type="button" onClick={ResetDemos}>
    <RotateCcw size={15}/>{text.common.reset}</button>
    </div>
    <div className={styles.tabGrid} role="tablist" aria-label={text.lab.selectDemo}>{Tabs.map((item) => { const Icon = item.icon; return <button type="button" key={item.id} className={`${styles.tabCard} ${tab === item.id ? styles.tabActive : ''}`} onClick={() => setTab(item.id)} role="tab" id={`tab-${item.id}`} aria-controls={`panel-${item.id}`} aria-selected={tab === item.id}>
    <span className={styles.tabIcon}>
    <Icon size={22}/>
    </span>
    <strong>{item.label}</strong>
    <span>{item.desc}</span>
    <ArrowUpRight size={16} className={styles.tabArrow}/>
    </button>; })}</div>
    <div className={styles.workbench} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} key={tab}>
      {tab === 'students' && <StudentsDemo text={text} students={students} setStudents={setStudents}/>}
      {tab === 'services' && <ServicesDemo text={text} language={language} services={services} setServices={setServices}/>}
      {tab === 'sections' && <SectionsDemo text={text} sections={sections} setSections={setSections}/>}
      {tab === 'shop' && <ShopDemo text={text} language={language} cart={cart} setCart={setCart} orders={orders} setOrders={setOrders}/>}
    </div>
    <p className={styles.bottomNote}>
    <Info size={15}/>{text.lab.demoHint}</p>
  </div>;
}
function DemoHeading({ icon, title, subtitle, action }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    action?: React.ReactNode;
}) {
    return <div className={styles.workbenchHeader}>
    <div className={styles.workbenchHeaderInfo}>
    <span className={styles.workbenchIcon}>{icon}</span>
    <div>
    <h2>{title}</h2>
    <p>{subtitle}</p>
    </div>
    </div>{action}</div>;
}
function StudentsDemo({ text, students, setStudents }: {
    text: Translation;
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}) {
    const [search, setSearch] = useState('');
    const filtered = students.filter((student) => `${student.name} ${student.course}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    async function openEditor(student?: Student) {
        const values = await OpenModalForm(student ? text.lab.editStudent : text.lab.newStudent, [
            { key: 'name', label: text.lab.fullName, type: 'text', required: true, maxLength: 90, value: student?.name ?? '' },
            { key: 'course', label: text.lab.course, type: 'text', required: true, maxLength: 90, value: student?.course ?? '' },
            { key: 'status', label: text.common.status, type: 'select', required: true, value: student?.status ?? 'enrolled', options: [
                { value: 'enrolled', label: text.lab.enrolled },
                { value: 'paused', label: text.lab.paused },
                { value: 'graduated', label: text.lab.graduated },
            ] },
        ], modalLabels(text));
        if (!values) return;
        const { name, course, status } = values;
        if (typeof name !== 'string' || typeof course !== 'string' || typeof status !== 'string' || !IsStudentStatus(status)) return;
        if (student) setStudents((items) => items.map((item) => item.id === student.id ? { ...item, name, course, status } : item));
        else setStudents((items) => [{ id: NewId(), name, course, status }, ...items]);
    }

    async function remove(student: Student) {
        if (await ConfirmModal(text.lab.deleteConfirm, student.name, modalLabels(text), true)) {
            setStudents((items) => items.filter((item) => item.id !== student.id));
        }
    }

    function statusLabel(status: StudentStatus) {
        return status === 'enrolled' ? text.lab.enrolled : status === 'paused' ? text.lab.paused : text.lab.graduated;
    }

    return <>
        <DemoHeading icon={<GraduationCap size={22}/>} title={text.lab.studentTitle} subtitle={text.lab.studentSubtitle} action={
            <button type="button" className={styles.addButton} onClick={() => { void openEditor(); }}>
                <Plus size={16}/>{text.lab.newStudent}
            </button>
        }/>
        <div className={styles.workbenchBody}>
            <div className={styles.toolbar}>
                <div className={styles.stat}><strong>{students.length}</strong><span>{text.lab.countStudents}</span></div>
                <label className={styles.searchBox}>
                    <Search size={17}/><span className="srOnly">{text.common.search}</span>
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.common.search}/>
                </label>
            </div>
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead><tr><th>{text.lab.fullName}</th><th>{text.lab.course}</th><th>{text.common.status}</th><th>{text.common.actions}</th></tr></thead>
                    <tbody>{filtered.map((student) => <tr key={student.id}>
                        <th scope="row" className={styles.studentCell} aria-label={student.name}>
                            <span className={styles.person}><span className={styles.personAvatar}>{student.name.charAt(0)}</span><strong>{student.name}</strong></span>
                        </th>
                        <td>{student.course}</td>
                        <td><span className={`${styles.status} ${student.status === 'enrolled' ? styles.activeStatus : student.status === 'paused' ? styles.pausedStatus : styles.finishedStatus}`}>{statusLabel(student.status)}</span></td>
                        <td><div className={styles.rowActions}>
                            <button type="button" aria-label={`${text.common.edit}: ${student.name}`} onClick={() => { void openEditor(student); }}><Pencil size={16}/></button>
                            <button type="button" aria-label={`${text.common.delete}: ${student.name}`} onClick={() => { void remove(student); }}><Trash2 size={16}/></button>
                        </div></td>
                    </tr>)}</tbody>
                </table>
                {filtered.length === 0 && <p className={styles.empty}>{text.lab.emptyStudents}</p>}
            </div>
        </div>
    </>;
}

function ServicesDemo({ text, language, services, setServices }: {
    text: Translation;
    language: string;
    services: BusinessService[];
    setServices: React.Dispatch<React.SetStateAction<BusinessService[]>>;
}) {
    async function openEditor(service?: BusinessService) {
        const values = await OpenModalForm(service ? text.lab.editService : text.lab.newService, [
            { key: 'name', label: text.lab.serviceName, type: 'text', required: true, maxLength: 80, value: service?.name ?? '' },
            { key: 'category', label: text.lab.category, type: 'text', required: true, maxLength: 60, value: service?.category ?? '' },
            { key: 'price', label: text.lab.price, type: 'number', required: true, min: 1, max: 1000000000, value: service ? String(service.price) : '' },
            { key: 'visible', label: text.lab.visible, type: 'checkbox', value: service?.visible ?? true },
        ], modalLabels(text));
        if (!values) return;
        const { name, category, price, visible } = values;
        if (typeof name !== 'string' || typeof category !== 'string' || typeof price !== 'string' || typeof visible !== 'boolean') return;
        const next = { name, category, price: Number(price), visible };
        if (service) setServices((items) => items.map((item) => item.id === service.id ? { ...item, ...next } : item));
        else setServices((items) => [{ id: NewId(), ...next }, ...items]);
    }

    async function remove(service: BusinessService) {
        if (await ConfirmModal(text.lab.deleteConfirm, service.name, modalLabels(text), true)) {
            setServices((items) => items.filter((item) => item.id !== service.id));
        }
    }

    return <>
        <DemoHeading icon={<Scissors size={22}/>} title={text.lab.serviceTitle} subtitle={text.lab.serviceSubtitle} action={
            <button className={styles.addButton} type="button" onClick={() => { void openEditor(); }}><Plus size={16}/>{text.lab.newService}</button>
        }/>
        <div className={styles.workbenchBody}>
            <div className={styles.toolbar}>
                <div className={styles.stat}><strong>{services.filter((item) => item.visible).length} / {services.length}</strong><span>{text.lab.visibleCount}</span></div>
            </div>
            <div className={styles.serviceGrid}>{services.map((service) => <article className={styles.serviceTile} key={service.id}>
                <div className={styles.serviceTileHead}>
                    <span className={styles.serviceTileIcon}><Scissors size={19}/></span>
                    <span className={`${styles.status} ${service.visible ? styles.activeStatus : styles.pausedStatus}`}>{service.visible ? text.lab.visible : text.lab.hidden}</span>
                </div>
                <h3>{service.name}</h3><p>{service.category}</p><strong>{formatMoney(service.price, language)}</strong>
                <div className={styles.serviceTileActions}>
                    <button type="button" onClick={() => setServices((items) => items.map((item) => item.id === service.id ? { ...item, visible: !item.visible } : item))}>
                        <Eye size={15}/>{service.visible ? text.lab.hidden : text.lab.visible}
                    </button>
                    <button type="button" onClick={() => { void openEditor(service); }} aria-label={`${text.common.edit}: ${service.name}`}><Pencil size={16}/></button>
                    <button type="button" onClick={() => { void remove(service); }} aria-label={`${text.common.delete}: ${service.name}`}><Trash2 size={16}/></button>
                </div>
            </article>)}</div>
            {services.length === 0 && <p className={styles.empty}>{text.lab.emptyServices}</p>}
        </div>
    </>;
}

function SectionsDemo({ text, sections, setSections }: {
    text: Translation;
    sections: ContentSection[];
    setSections: React.Dispatch<React.SetStateAction<ContentSection[]>>;
}) {
    async function openEditor(section?: ContentSection) {
        const values = await OpenModalForm(section ? text.lab.editSection : text.lab.newSection, [
            { key: 'heading', label: text.lab.sectionHeading, type: 'text', required: true, maxLength: 100, value: section?.heading ?? '' },
            { key: 'body', label: text.lab.sectionBody, type: 'textarea', required: true, maxLength: 700, value: section?.body ?? '' },
        ], modalLabels(text));
        if (!values) return;
        const { heading, body } = values;
        if (typeof heading !== 'string' || typeof body !== 'string') return;
        if (section) setSections((items) => items.map((item) => item.id === section.id ? { ...item, heading, body } : item));
        else setSections((items) => [...items, { id: NewId(), heading, body }]);
    }

    async function remove(section: ContentSection) {
        if (await ConfirmModal(text.lab.deleteConfirm, section.heading, modalLabels(text), true)) {
            setSections((items) => items.filter((item) => item.id !== section.id));
        }
    }

    function move(index: number, by: number) {
        setSections((items) => {
            const next = [...items];
            const target = index + by;
            if (target < 0 || target >= items.length) return items;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    }

    return <>
        <DemoHeading icon={<Blocks size={22}/>} title={text.lab.sectionTitle} subtitle={text.lab.sectionSubtitle} action={
            <button className={styles.addButton} type="button" onClick={() => { void openEditor(); }}><Plus size={16}/>{text.lab.newSection}</button>
        }/>
        <div className={styles.workbenchBody}>
            <div className={styles.builderGrid}>
                <div className={styles.sectionList}>{sections.map((section, index) => <article className={styles.sectionItem} key={section.id}>
                    <span className={styles.sectionIndex}>0{index + 1}</span>
                    <div><h3>{section.heading}</h3><p>{section.body}</p></div>
                    <div className={styles.sectionActions}>
                        <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`${text.lab.moveUp}: ${section.heading}`}><ArrowUp size={15}/></button>
                        <button type="button" onClick={() => move(index, 1)} disabled={index === sections.length - 1} aria-label={`${text.lab.moveDown}: ${section.heading}`}><ArrowDown size={15}/></button>
                        <button type="button" onClick={() => { void openEditor(section); }} aria-label={`${text.common.edit}: ${section.heading}`}><Pencil size={15}/></button>
                        <button type="button" onClick={() => { void remove(section); }} aria-label={`${text.common.delete}: ${section.heading}`}><Trash2 size={15}/></button>
                    </div>
                </article>)}</div>
                <div className={styles.pagePreview}>
                    <div className={styles.previewHeading}>
                        <span><Eye size={15}/>{text.lab.sectionPreview}</span><span>LIVE PREVIEW</span>
                    </div>
                    {sections.length === 0 && <p className={styles.empty}>{text.lab.emptySections}</p>}
                    {sections.map((section, index) => <section key={section.id} className={styles.previewSection}>
                        <span>0{index + 1} / CONTENT</span><h3>{section.heading}</h3><p>{section.body}</p>
                        {index === 0 && <span className={styles.previewFakeButton}>{text.common.learnMore} ↗</span>}
                    </section>)}
                </div>
            </div>
        </div>
    </>;
}

function ShopDemo({ text, language, cart, setCart, orders, setOrders }: {
    text: Translation;
    language: string;
    cart: Record<string, number>;
    setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
    const items = Products.filter((product) => (cart[product.id] ?? 0) > 0);
    const quantity = items.reduce((total, product) => total + cart[product.id], 0);
    const total = items.reduce((value, product) => value + product.price * cart[product.id], 0);

    function update(id: string, by: number) {
        setCart((current) => {
            const next = { ...current };
            const amount = Math.max(0, (next[id] ?? 0) + by);
            if (amount === 0) delete next[id];
            else next[id] = Math.min(999, amount);
            return next;
        });
    }

    async function addProduct(product: Product) {
        const values = await OpenModalForm(`${text.lab.addToCart}: ${product.name}`, [
            { key: 'quantity', type: 'number', label: text.lab.quantity, required: true, min: 1, max: 99, value: '1' },
        ], { ...modalLabels(text), save: text.lab.addToCart });
        if (!values || typeof values.quantity !== 'string') return;
        const amount = Number(values.quantity);
        setCart((current) => ({ ...current, [product.id]: Math.min(999, (current[product.id] ?? 0) + amount) }));
    }

    async function changeQuantity(product: Product) {
        const values = await OpenModalForm(`${text.lab.editQuantity}: ${product.name}`, [
            { key: 'quantity', type: 'number', label: text.lab.quantity, required: true, min: 0, max: 999, value: String(cart[product.id] ?? 0) },
        ], modalLabels(text));
        if (!values || typeof values.quantity !== 'string') return;
        const amount = Number(values.quantity);
        if (amount === 0) {
            await removeProduct(product);
            return;
        }
        setCart((current) => ({ ...current, [product.id]: amount }));
    }

    async function removeProduct(product: Product) {
        if (await ConfirmModal(text.lab.removeProduct, `${product.name} · ${text.lab.removeProductHint}`, modalLabels(text), true)) {
            setCart((current) => {
                const next = { ...current };
                delete next[product.id];
                return next;
            });
        }
    }

    async function clearCart() {
        if (quantity === 0) return;
        if (await ConfirmModal(text.lab.clearCart, text.lab.clearCartConfirm, modalLabels(text), true)) setCart({});
    }

    async function placeOrder() {
        if (quantity === 0) return;
        if (!await ConfirmModal(text.lab.order, text.lab.orderConfirm, modalLabels(text))) return;
        const id = `PG-${String(orders.length + 1).padStart(3, '0')}`;
        setOrders((current) => [{ id, total, quantity, time: new Date().toLocaleString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-AR') }, ...current]);
        setCart({});
        await SuccessModal(text.lab.orderSuccess, id, text.common.close);
    }

    return <>
        <DemoHeading icon={<ShoppingCart size={22}/>} title={text.lab.shopTitle} subtitle={text.lab.shopSubtitle}/>
        <div className={styles.workbenchBody}>
            <div className={styles.shopGrid}>
                <div>
                    <h3 className={styles.panelHeading}>{text.lab.products}</h3>
                    <div className={styles.products}>{Products.map((product) => <article key={product.id} className={styles.product}>
                        <div className={styles.productArt} style={{ background: product.color }}><strong>{product.symbol}</strong></div>
                        <div className={styles.productText}>
                            <span>{product.category}</span><h4>{product.name}</h4><strong>{formatMoney(product.price, language)}</strong>
                            <button type="button" onClick={() => { void addProduct(product); }}><Plus size={15}/>{text.lab.addToCart}</button>
                        </div>
                    </article>)}</div>
                </div>
                <aside className={styles.cart}>
                    <div className={styles.cartTitle}>
                        <div><h3>{text.lab.cart}</h3><span>{quantity} {text.lab.items}</span></div>
                        <button type="button" className={styles.clearCartButton} disabled={quantity === 0} onClick={() => { void clearCart(); }}>
                            <Trash2 size={14}/>{text.lab.clearCart}
                        </button>
                    </div>
                    {items.length === 0 ? <p className={styles.emptyCart}>{text.lab.emptyCart}</p> : <div className={styles.cartItems}>
                        {items.map((product) => <div className={styles.cartItem} key={product.id}>
                            <div className={styles.cartProductInfo}>
                                <strong>{product.name}</strong><small>{formatMoney(product.price * cart[product.id], language)}</small>
                                <button type="button" className={styles.removeProductButton} onClick={() => { void removeProduct(product); }}>
                                    <Trash2 size={12}/>{text.lab.removeProduct}
                                </button>
                            </div>
                            <div className={styles.cartItemActions}>
                                <div className={styles.quantity}>
                                    <button type="button" onClick={() => { if ((cart[product.id] ?? 0) === 1) void removeProduct(product); else update(product.id, -1); }} aria-label={`${text.lab.quantityDecrement}: ${product.name}`}><Minus size={13}/></button>
                                    <span>{cart[product.id]}</span>
                                    <button type="button" onClick={() => update(product.id, 1)} aria-label={`${text.lab.quantityIncrement}: ${product.name}`}><Plus size={13}/></button>
                                </div>
                                <button type="button" className={styles.editQuantityButton} onClick={() => { void changeQuantity(product); }} aria-label={`${text.lab.editQuantity}: ${product.name}`}><Pencil size={14}/></button>
                            </div>
                        </div>)}
                    </div>}
                    <div className={styles.cartTotal}><span>{text.lab.total}</span><strong>{formatMoney(total, language)}</strong></div>
                    <button type="button" disabled={quantity === 0} className={`${styles.addButton} ${styles.checkout}`} onClick={() => { void placeOrder(); }}>{text.lab.order}<ArrowUpRight size={17}/></button>
                    <p className={styles.shopDisclaimer}>{text.lab.record}</p>
                    <div className={styles.orders}>
                        <h4><History size={16}/>{text.lab.orderHistory}</h4>
                        {orders.length === 0 ? <p>{text.lab.orderEmpty}</p> : orders.slice(0, 5).map((order) => <div key={order.id}>
                            <strong>{order.id}</strong><span>{order.time}</span><b>{formatMoney(order.total, language)}</b>
                        </div>)}
                    </div>
                </aside>
            </div>
        </div>
    </>;
}
