import type { Language } from './Translations';
import type { ProjectId } from './PortfolioData';

export interface ProjectStory {
  typeLabel: string;
  headline: string;
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
  audience: string;
  tryIt: string;
}

// These case studies describe demonstrative design solutions without inventing client outcomes.
export const ProjectStories: Record<Language, Record<ProjectId, ProjectStory>> = {
  "es": {
    "burger": {
      "typeLabel": "Hamburguesería",
      "headline": "Una presencia digital con sabor e identidad propia.",
      "summary": "Demo gastronómica orientada a un negocio de hamburguesas y comidas rápidas. Una referencia de cómo presentar un local, ordenar la oferta y facilitar que el público conozca la marca.",
      "challenge": "Un comercio gastronómico necesita despertar interés rápido, presentar su propuesta con claridad y ser fácil de consultar desde un teléfono.",
      "solution": "Una experiencia web pensada alrededor de la identidad Blend Burger, la propuesta gastronómica y un recorrido breve hacia la información del negocio.",
      "features": [
        "Identidad visual para gastronomía",
        "Presentación de la propuesta comercial",
        "Navegación pensada para clientes móviles"
      ],
      "audience": "Hamburgueserías, locales de comida rápida, delivery y emprendimientos gastronómicos.",
      "tryIt": "Abrí la demo y recorré la portada, la presentación del local y su organización visual."
    },
    "academy": {
      "typeLabel": "Academia de formación",
      "headline": "De una web informativa a una experiencia de gestión.",
      "summary": "Plataforma académica demostrativa que muestra cómo separar experiencias para alumnos, tutores y administradores según sus responsabilidades.",
      "challenge": "Una institución educativa tiene distintos perfiles de usuario y necesita organizar procesos que no se resuelven con una página estática.",
      "solution": "Un entorno demostrativo con acceso y vistas diferenciadas por rol, pensado para representar operaciones académicas y administrativas.",
      "features": [
        "Inicio de sesión de demostración",
        "Vistas según el rol",
        "Paneles de gestión académica"
      ],
      "audience": "Academias, centros educativos, instituciones de capacitación y escuelas de oficios.",
      "tryIt": "Ingresá al acceso de prueba y explorá cómo cambia la experiencia entre roles. Los datos son de demostración."
    },
    "salon": {
      "typeLabel": "Peluquería",
      "headline": "Servicios, precios e identidad en un mismo lugar.",
      "summary": "Sitio para peluquerías y barberías que organiza la información comercial en una experiencia clara y adaptable a distintas pantallas.",
      "challenge": "Los clientes suelen buscar servicios, precios y formas de contacto antes de decidir dónde reservar una cita.",
      "solution": "Una web enfocada en mostrar lo que ofrece el salón, con jerarquía visual y una experiencia cómoda desde el celular.",
      "features": [
        "Presentación de servicios",
        "Información de precios",
        "Contacto y navegación responsive"
      ],
      "audience": "Peluquerías, barberías, estudios de belleza y profesionales independientes.",
      "tryIt": "Recorré las páginas de servicios, precios y contacto para ver cómo se presenta la oferta."
    },
    "tattoo": {
      "typeLabel": "Estudio de tatuajes",
      "headline": "Una identidad visual que transmite personalidad.",
      "summary": "Demo para un estudio de tatuajes con una dirección artística marcada y una experiencia digital adaptable a diferentes públicos.",
      "challenge": "Un estudio creativo necesita diferenciarse visualmente y comunicar su estilo antes del primer contacto con el cliente.",
      "solution": "Una presencia web de alto impacto, con una estética coherente y una interfaz preparada para diferentes pantallas y preferencias.",
      "features": [
        "Dirección de arte para marca creativa",
        "Interfaz adaptable",
        "Opciones de idioma y tema"
      ],
      "audience": "Estudios de tatuajes, artistas, diseñadores y marcas independientes.",
      "tryIt": "Explorá las secciones, la identidad visual y los controles de idioma y tema."
    },
    "store": {
      "typeLabel": "Tienda online",
      "headline": "El catálogo como punto de partida de una tienda digital.",
      "summary": "Proyecto demostrativo de escaparate de productos con datos de muestra, útil para explicar experiencias de catálogo y comercio electrónico.",
      "challenge": "Una tienda necesita organizar productos y ayudar al visitante a recorrer un catálogo sin perderse entre opciones.",
      "solution": "Una interfaz de tienda de demostración que permite observar la presentación de productos y su estructura visual, sin prometer integraciones comerciales reales.",
      "features": [
        "Presentación de un catálogo",
        "Interfaz orientada a productos",
        "Contenido de muestra para explorar"
      ],
      "audience": "Tiendas online, comercios minoristas, catálogos comerciales y marcas de productos.",
      "tryIt": "Visitá la demo y examiná cómo se muestran los productos y los datos de ejemplo. No implica pagos reales."
    },
    "restaurant": {
      "typeLabel": "Restaurante",
      "headline": "Una experiencia digital a la altura de la propuesta gastronómica.",
      "summary": "Sitio conceptual para un restaurante, donde la estética y el contenido funcionan como carta de presentación de la marca.",
      "challenge": "Los restaurantes necesitan transmitir ambiente, estilo y propuesta culinaria antes de que alguien los visite.",
      "solution": "Una web editorial orientada a comunicar el carácter de Maison Aster y construir una primera impresión cuidada.",
      "features": [
        "Identidad para restaurante",
        "Presentación editorial",
        "Experiencia web enfocada en la marca"
      ],
      "audience": "Restaurantes, bistrós, cafeterías y proyectos de hospitalidad.",
      "tryIt": "Explorá la portada y las secciones del restaurante para evaluar la narrativa visual."
    }
  },
  "en": {
    "burger": {
      "typeLabel": "Burger restaurant",
      "headline": "A digital presence with a distinctive identity.",
      "summary": "A food-business demo for burgers and fast casual dining, showing how a local brand can introduce its offering and make information easy to discover.",
      "challenge": "A food business must capture attention quickly, explain its offering clearly and remain easy to browse on mobile.",
      "solution": "A brand-led experience built around Blend Burger and a simple path through the business proposition.",
      "features": [
        "Visual identity for food businesses",
        "Clear presentation of the offering",
        "Mobile-friendly navigation"
      ],
      "audience": "Burger shops, takeaways, delivery brands and food businesses.",
      "tryIt": "Open the demo and explore the homepage, the business presentation and the visual layout."
    },
    "academy": {
      "typeLabel": "Training academy",
      "headline": "From an information site to a management experience.",
      "summary": "An academic platform demo that illustrates distinct experiences for students, tutors and administrators.",
      "challenge": "Educational organizations serve different users and manage processes a static website cannot handle.",
      "solution": "A demonstration environment with role-specific access and views, representing academic and administrative workflows.",
      "features": [
        "Demo sign-in",
        "Role-specific views",
        "Academic dashboards"
      ],
      "audience": "Academies, training centers, education organizations and vocational schools.",
      "tryIt": "Use the demo access to explore the different roles. All information is illustrative."
    },
    "salon": {
      "typeLabel": "Hair salon",
      "headline": "Services, pricing and brand identity in one place.",
      "summary": "A beauty and barbershop website that organizes the commercial offering into a clear, responsive experience.",
      "challenge": "Prospective clients often want to see services, prices and contact details before choosing a salon.",
      "solution": "A website focused on communicating the salon’s offering, with clear hierarchy and mobile-friendly browsing.",
      "features": [
        "Service presentation",
        "Pricing information",
        "Contact and responsive navigation"
      ],
      "audience": "Hair salons, barbershops, beauty studios and independent professionals.",
      "tryIt": "Browse the service, pricing and contact pages to see how the offering is presented."
    },
    "tattoo": {
      "typeLabel": "Tattoo studio",
      "headline": "A visual identity that communicates personality.",
      "summary": "A tattoo studio demo with a distinctive art direction and an experience adaptable to different audiences.",
      "challenge": "A creative studio needs to stand apart visually and convey its style before the first conversation.",
      "solution": "An expressive website with consistent aesthetics and responsive experiences.",
      "features": [
        "Art direction for creative brands",
        "Responsive interface",
        "Language and theme options"
      ],
      "audience": "Tattoo studios, artists, designers and independent brands.",
      "tryIt": "Explore the sections, visual identity, language options and theme controls."
    },
    "store": {
      "typeLabel": "Online store",
      "headline": "A product catalog as the starting point for online retail.",
      "summary": "A sample-data storefront project for illustrating product catalog and e-commerce interface patterns.",
      "challenge": "An online shop needs to organize products and help visitors browse without getting lost.",
      "solution": "A demo storefront that showcases product presentation and interface structure, without claiming live commerce integrations.",
      "features": [
        "Product catalog presentation",
        "Product-focused interface",
        "Sample content for exploration"
      ],
      "audience": "Online stores, retail businesses, catalogs and consumer brands.",
      "tryIt": "Explore how the demo presents products and sample data. It does not imply live payment processing."
    },
    "restaurant": {
      "typeLabel": "Restaurant",
      "headline": "A digital experience that matches the dining concept.",
      "summary": "A restaurant concept site where aesthetics and editorial content introduce the brand.",
      "challenge": "Restaurants need to communicate atmosphere, style and cuisine before someone visits.",
      "solution": "An editorial website focused on Maison Aster’s character and first impressions.",
      "features": [
        "Restaurant brand identity",
        "Editorial presentation",
        "Brand-focused web experience"
      ],
      "audience": "Restaurants, bistros, cafés and hospitality businesses.",
      "tryIt": "Explore the homepage and restaurant sections to see its visual storytelling."
    }
  },
  "pt": {
    "burger": {
      "typeLabel": "Hamburgueria",
      "headline": "Uma presença digital com identidade própria.",
      "summary": "Demo gastronômica para hamburguerias e refeições rápidas, mostrando como apresentar um negócio e facilitar o acesso às informações.",
      "challenge": "Um negócio gastronômico precisa chamar atenção rapidamente, apresentar a oferta e funcionar bem no celular.",
      "solution": "Uma experiência centrada na identidade Blend Burger e em um percurso simples pela proposta comercial.",
      "features": [
        "Identidade visual para gastronomia",
        "Apresentação clara da oferta",
        "Navegação pensada para celulares"
      ],
      "audience": "Hamburguerias, lanchonetes, delivery e empreendimentos gastronômicos.",
      "tryIt": "Acesse a demo e explore a página inicial, a apresentação do negócio e sua organização visual."
    },
    "academy": {
      "typeLabel": "Academia de formação",
      "headline": "De um site informativo para uma experiência de gestão.",
      "summary": "Plataforma acadêmica de demonstração com experiências separadas para alunos, tutores e administradores.",
      "challenge": "Instituições de ensino atendem perfis diferentes e possuem processos que um site estático não resolve.",
      "solution": "Um ambiente demonstrativo com acesso e interfaces por perfil para representar tarefas acadêmicas e administrativas.",
      "features": [
        "Acesso de demonstração",
        "Telas específicas por perfil",
        "Painéis acadêmicos"
      ],
      "audience": "Academias, centros de formação, instituições educacionais e escolas profissionalizantes.",
      "tryIt": "Use o acesso de demonstração e veja as experiências de cada perfil. Todos os dados são fictícios."
    },
    "salon": {
      "typeLabel": "Salão de beleza",
      "headline": "Serviços, preços e identidade no mesmo lugar.",
      "summary": "Site para salões e barbearias que organiza a oferta comercial em uma experiência clara e responsiva.",
      "challenge": "Clientes procuram serviços, preços e contato antes de escolher um salão.",
      "solution": "Uma web para apresentar a oferta do salão com hierarquia visual e navegação confortável no celular.",
      "features": [
        "Apresentação dos serviços",
        "Informações de preços",
        "Contato e navegação responsiva"
      ],
      "audience": "Salões de beleza, barbearias, estúdios de beleza e profissionais autônomos.",
      "tryIt": "Explore as páginas de serviços, preços e contato para ver como a oferta é organizada."
    },
    "tattoo": {
      "typeLabel": "Estúdio de tatuagem",
      "headline": "Uma identidade visual que expressa personalidade.",
      "summary": "Demo para estúdio de tatuagem com direção artística marcante e experiência adaptável a diferentes públicos.",
      "challenge": "Um estúdio criativo precisa se destacar visualmente e comunicar seu estilo antes do primeiro contato.",
      "solution": "Uma presença web expressiva com estética consistente e experiência responsiva.",
      "features": [
        "Direção de arte para marcas criativas",
        "Interface responsiva",
        "Opções de idioma e tema"
      ],
      "audience": "Estúdios de tatuagem, artistas, designers e marcas independentes.",
      "tryIt": "Explore as seções, a identidade visual e os controles de idioma e tema."
    },
    "store": {
      "typeLabel": "Loja online",
      "headline": "O catálogo como ponto de partida para uma loja digital.",
      "summary": "Projeto demonstrativo de vitrine de produtos com dados de exemplo, ideal para ilustrar interfaces de e-commerce.",
      "challenge": "Uma loja precisa organizar produtos e ajudar o visitante a navegar sem se perder.",
      "solution": "Uma interface demonstrativa de loja que destaca produtos e dados de exemplo, sem afirmar integrações comerciais reais.",
      "features": [
        "Apresentação de catálogo",
        "Interface focada em produtos",
        "Dados de exemplo para explorar"
      ],
      "audience": "Lojas virtuais, comércio varejista, catálogos e marcas de produtos.",
      "tryIt": "Visite a demo e veja como os produtos e os dados de exemplo são apresentados. Não implica pagamentos reais."
    },
    "restaurant": {
      "typeLabel": "Restaurante",
      "headline": "Uma experiência digital à altura da gastronomia.",
      "summary": "Site conceitual para restaurante em que estética e conteúdo apresentam a identidade da marca.",
      "challenge": "Restaurantes precisam transmitir ambiente, estilo e proposta culinária antes da visita.",
      "solution": "Uma web editorial que transmite a personalidade do Maison Aster e cria uma primeira impressão cuidadosa.",
      "features": [
        "Identidade de restaurante",
        "Apresentação editorial",
        "Experiência web centrada na marca"
      ],
      "audience": "Restaurantes, bistrôs, cafés e negócios de hospitalidade.",
      "tryIt": "Explore a página inicial e as seções do restaurante para conhecer a narrativa visual."
    }
  }
};
