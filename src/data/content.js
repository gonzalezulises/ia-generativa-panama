// Contenido para webinar gerencial: Introducción a la IA Generativa
// Enfocado en decisores, líderes y gerentes

export const stats = [
  {
    id: 1,
    value: 2.3,
    max: 5.0,
    label: "Madurez IA Panamá",
    description: "Nivel actual del ecosistema: ventana de oportunidad para early adopters (n=230, nov 2025)",
    color: "cyan"
  },
  {
    id: 2,
    value: 33.9,
    label: "Inversión Global GenAI",
    description: "Billones USD en inversión privada en IA Generativa (2024)",
    prefix: "$",
    suffix: "B",
    color: "green"
  },
  {
    id: 3,
    value: 78,
    label: "Adopción Empresarial",
    description: "De organizaciones globales ya usan IA en al menos una función de negocio",
    suffix: "%",
    color: "blue"
  },
  {
    id: 4,
    value: 65,
    label: "Sin Monetizar IA",
    description: "Empresas que aún no generan ingresos atribuibles a IA — brecha competitiva",
    suffix: "%",
    color: "orange"
  },
  {
    id: 5,
    value: 46,
    label: "Sin Gobernanza",
    description: "Empresas sin procesos claros de supervisión IA — riesgo regulatorio",
    suffix: "%",
    color: "pink"
  },
  {
    id: 6,
    value: 4,
    label: "Demos en Vivo",
    description: "Casos prácticos interactivos que verás durante el webinar",
    color: "purple"
  }
];

export const demos = [
  {
    id: "istmostory",
    title: "IstmoStory Studio",
    subtitle: "Generación de Contenido",
    description: "Genera contenido de calidad con control de tono, estilo y creatividad. Ideal para marketing, comunicaciones y estrategia de marca.",
    icon: "pen-tool",
    color: "#00B4D8",
    wow: "Alto",
    features: ["Control de parámetros", "Múltiples estilos", "Aplicación inmediata"]
  },
  {
    id: "codementor",
    title: "Code Mentor",
    subtitle: "Automatización Inteligente",
    description: "IA que analiza, mejora y valida procesos. Ejemplo práctico de cómo la IA puede optimizar operaciones técnicas en tu organización.",
    icon: "code",
    color: "#10B981",
    wow: "Muy Alto",
    features: ["Análisis automatizado", "Genera verificaciones", "Reduce errores"]
  },
  {
    id: "vision",
    title: "Vision+Text Explainer",
    subtitle: "IA Multimodal",
    description: "Analiza imágenes y genera descripciones, contenido para redes y reportes. El futuro del análisis visual automatizado.",
    icon: "eye",
    color: "#F43F5E",
    wow: "Muy Alto",
    features: ["Análisis de imagen", "Genera contenido", "Múltiples outputs"]
  },
  {
    id: "localdocs",
    title: "LocalDocs RAG + Agente",
    subtitle: "Consulta de Documentos",
    description: "Pregunta a tus documentos internos y recibe respuestas con citas verificables. La aplicación más impactante para empresas.",
    icon: "file-search",
    color: "#8B5CF6",
    wow: "Máximo",
    features: ["RAG con citas", "Fuentes verificables", "Acciones automáticas"]
  }
];

export const modules = [
  {
    id: 1,
    title: "El Panorama de la IA Generativa",
    duration: "10 min",
    learning: "Diferenciar IA generativa vs predictiva y entender el impacto en negocios",
    project: "Mapa de oportunidades para tu industria"
  },
  {
    id: 2,
    title: "Cómo Funcionan los LLMs",
    duration: "12 min",
    learning: "Comprender tokens, atención y generación sin jerga técnica",
    project: "Visualización interactiva de fundamentos"
  },
  {
    id: 3,
    title: "Prompting Efectivo",
    duration: "10 min",
    learning: "Técnicas para obtener resultados consistentes y de calidad",
    project: "Generador de contenido con control de parámetros"
  },
  {
    id: 4,
    title: "Demos en Vivo",
    duration: "20 min",
    learning: "4 aplicaciones prácticas de IA generativa funcionando",
    project: "Generación de texto, análisis de código, visión, RAG"
  },
  {
    id: 5,
    title: "Casos Reales en Panamá",
    duration: "10 min",
    learning: "Empresas panameñas usando IA con resultados medibles",
    project: "Análisis de ROI y lecciones aprendidas"
  },
  {
    id: 6,
    title: "Riesgos y Gobernanza",
    duration: "8 min",
    learning: "Marco de riesgos y controles para implementar IA responsablemente",
    project: "Checklist de gobernanza para tu organización"
  },
  {
    id: 7,
    title: "Hoja de Ruta para Empezar",
    duration: "10 min",
    learning: "Plan de acción de 30-60-90 días para adoptar IA",
    project: "Framework de implementación priorizado"
  },
  {
    id: 8,
    title: "Q&A y Próximos Pasos",
    duration: "10 min",
    learning: "Resolver dudas específicas de tu contexto",
    project: "Recursos y formaciones disponibles"
  }
];

export const timeline = [
  {
    year: 2014,
    title: "GANs",
    subtitle: "Redes Generativas Adversarias",
    description: "Marco adversarial para generar contenido realista: imágenes, video, audio sintético.",
    icon: "brain",
    color: "cyan"
  },
  {
    year: 2017,
    title: "Transformers",
    subtitle: "Attention Is All You Need",
    description: "Arquitectura que habilitó el paralelismo masivo y los modelos fundacionales.",
    icon: "zap",
    color: "purple"
  },
  {
    year: 2020,
    title: "GPT-3",
    subtitle: "175B Parámetros",
    description: "Escala masiva + few-shot learning. Primer modelo capaz de seguir instrucciones complejas.",
    icon: "sparkles",
    color: "pink"
  },
  {
    year: 2022,
    title: "ChatGPT",
    subtitle: "IA Conversacional Masiva",
    description: "100M de usuarios en 2 meses. Normalizó el uso de LLMs en empresas y vida cotidiana.",
    icon: "message-circle",
    color: "green"
  },
  {
    year: 2024,
    title: "Era Multimodal",
    subtitle: "Texto + Imagen + Audio + Video",
    description: "GPT-4o, Gemini, Claude 3: modelos que procesan y generan múltiples modalidades.",
    icon: "layers",
    color: "blue"
  },
  {
    year: 2026,
    title: "IA Agéntica",
    subtitle: "Sistemas que Ejecutan",
    description: "De chatbots a agentes autónomos que planifican, deciden y actúan con herramientas.",
    icon: "bot",
    color: "orange"
  }
];

export const sectors = [
  {
    id: "logistics",
    name: "Logística",
    icon: "ship",
    maturity: 3.2,
    cases: [
      "Canal de Panamá: CITEC con IA para gestión hídrica",
      "Zona Libre de Colón: Automatización documental",
      "Aduanas: Perfilamiento de riesgo con ML"
    ],
    stats: { projects: 12, companies: 45 },
    color: "#00B4D8"
  },
  {
    id: "finance",
    name: "Banca y Finanzas",
    icon: "landmark",
    maturity: 3.8,
    cases: [
      "Banistmo: Chatbot 'Tabot' en producción",
      "BAC Credomatic: Asistentes virtuales multicanal",
      "Banco General: Biometría anti-spoofing"
    ],
    stats: { projects: 28, companies: 15 },
    highlight: "USD 125M en fraude detectado",
    color: "#10B981"
  },
  {
    id: "health",
    name: "Salud",
    icon: "heart-pulse",
    maturity: 2.8,
    cases: [
      "CSS: Tomógrafos con IA (~85 estudios/día)",
      "MINSA: Programa de Telemedicina con IA",
      "Transformación Digital en Salud Pública"
    ],
    stats: { projects: 8, companies: 12 },
    color: "#F43F5E"
  },
  {
    id: "government",
    name: "Gobierno y Legal",
    icon: "building-2",
    maturity: 2.4,
    cases: [
      "ISJUP-IA: Asistente judicial con fuentes verificables",
      "Asamblea: Redacción normativa asistida por IA",
      "Ventanillas virtuales con chatbots 24/7"
    ],
    stats: { projects: 6, companies: 8 },
    highlight: "ISJUP-IA: RAG con trazabilidad completa",
    color: "#8B5CF6"
  },
  {
    id: "retail",
    name: "Retail y Turismo",
    icon: "shopping-cart",
    maturity: 3.5,
    cases: [
      "Jetour/Petroautos: 9.8% conversión (vs 1%)",
      "Hoteles Decameron: Asistente 'Cameron'",
      "Tocumen: IA para gestión de objetos extraviados"
    ],
    stats: { projects: 15, companies: 32 },
    highlight: "Caso Jetour: 9.8x mejora en conversión",
    color: "#F59E0B"
  },
  {
    id: "education",
    name: "Educación",
    icon: "graduation-cap",
    maturity: 2.1,
    cases: [
      "MEDUCA: Capacitación docente en IA",
      "ITSE: Técnico Superior en IA",
      "UTP: Proyecto 'Nómada' robot educativo"
    ],
    stats: { projects: 5, companies: 10 },
    color: "#06B6D4"
  }
];

export const llmConcepts = [
  {
    id: "tokenization",
    title: "Tokenización",
    analogy: "Piezas de LEGO",
    description: "El modelo procesa tokens (fragmentos), no palabras completas. Entender esto es clave para controlar costos.",
    example: "\"Hola mundo\" → [\"Hola\", \" mundo\"]"
  },
  {
    id: "attention",
    title: "Atención",
    analogy: "Foco de linterna",
    description: "Decide qué partes del contexto importan para cada palabra. Es lo que hace potentes a los Transformers.",
    example: "'El gato duerme' → relaciona 'duerme' con 'gato'"
  },
  {
    id: "generation",
    title: "Generación",
    analogy: "Autocomplete avanzado",
    description: "Avanza token por token calculando probabilidades. No \"piensa\", predice el siguiente token más probable.",
    example: "\"El cielo es\" → [azul: 70%, rojo: 10%, ...]"
  },
  {
    id: "rag",
    title: "RAG",
    analogy: "Consultar antes de responder",
    description: "Recupera información relevante de tus documentos y genera respuestas con citas. Ideal para datos internos.",
    example: "Pregunta → Busca docs → Responde citando fuentes"
  },
  {
    id: "tools",
    title: "Tool Calling",
    analogy: "IA con manos",
    description: "El modelo llama funciones y APIs externas para ejecutar acciones reales: agendar, enviar emails, consultar bases de datos.",
    example: "\"Agenda reunión\" → llama create_event()"
  },
  {
    id: "agents",
    title: "Agentes",
    analogy: "Asistente autónomo",
    description: "Sistemas que perciben, planifican y ejecutan tareas complejas de forma autónoma. La frontera actual de la IA.",
    example: "\"Analiza ventas Q4\" → busca datos → genera reporte → envía"
  }
];

export const starterPack = {
  title: "Kit de Inicio para Líderes",
  items: [
    "Framework de evaluación de casos de uso IA",
    "Checklist de gobernanza y compliance",
    "Guía de proveedores de IA en la región",
    "Hoja de ruta 30-60-90 días",
    "Acceso a la comunidad Tecnasa U"
  ]
};

export const localCases = [
  {
    name: "Jetour/Petroautos",
    metric: "1% → 9.8%",
    description: "Conversión con chatbot IA en WhatsApp",
    icon: "trending-up"
  },
  {
    name: "ISJUP-IA",
    metric: "RAG Legal",
    description: "Asistente judicial con fuentes verificables",
    icon: "scale"
  },
  {
    name: "Spark AI Summit",
    metric: "2025",
    description: "Ecosistema y comunidad IA en Panamá",
    icon: "users"
  }
];
