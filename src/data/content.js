// Contenido para webinar estudiantil: Fundamentos de IA Generativa
// Basado en investigación 2025-2026

export const stats = [
  {
    id: 1,
    value: 2.3,
    max: 5.0,
    label: "Madurez IA Panamá",
    description: "Oportunidad: hay espacio para talento nuevo (n=230, nov 2025)",
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
    description: "De organizaciones reportaron usar IA en 2024",
    suffix: "%",
    color: "blue"
  },
  {
    id: 4,
    value: 65,
    label: "Sin Monetizar IA",
    description: "Empresas sin ventas atribuibles a IA - oportunidad",
    suffix: "%",
    color: "orange"
  },
  {
    id: 5,
    value: 46,
    label: "Sin Gobernanza",
    description: "Empresas sin procesos claros de supervisión IA",
    suffix: "%",
    color: "pink"
  },
  {
    id: 6,
    value: 4,
    label: "Demos para Portafolio",
    description: "Mini-proyectos listos que te llevas del webinar",
    color: "purple"
  }
];

export const demos = [
  {
    id: "istmostory",
    title: "IstmoStory Studio",
    subtitle: "Texto Creativo + Control",
    description: "Genera historias del Istmo con control de tono, longitud y creatividad. Exporta en múltiples formatos.",
    icon: "pen-tool",
    color: "#00B4D8",
    wow: "Alto",
    features: ["Control de temperatura", "Múltiples estilos", "Export Markdown"]
  },
  {
    id: "codementor",
    title: "Code Mentor",
    subtitle: "Tutor + Tests + Explicación",
    description: "IA que genera soluciones, tests unitarios y explica errores. Aprende a programar sin copiar ciegamente.",
    icon: "code",
    color: "#10B981",
    wow: "Muy Alto",
    features: ["Genera tests", "Explica bugs", "Verifica código"]
  },
  {
    id: "vision",
    title: "Vision+Text Explainer",
    subtitle: "Multimodal en Tiempo Real",
    description: "Sube una imagen y la IA la analiza, describe y genera contenido. Ideal para marketing y análisis.",
    icon: "eye",
    color: "#F43F5E",
    wow: "Muy Alto",
    features: ["Análisis de imagen", "Genera copy", "Quiz visual"]
  },
  {
    id: "localdocs",
    title: "LocalDocs RAG + Agente",
    subtitle: "La Demo Más Potente",
    description: "Pregunta a documentos panameños (Ley 81, datos abiertos) con citas. Convierte respuestas en acciones.",
    icon: "file-search",
    color: "#8B5CF6",
    wow: "Máximo",
    features: ["RAG con citas", "Tool calling", "Export PDF"]
  }
];

export const modules = [
  {
    id: 1,
    title: "Contexto y Mental Models",
    duration: "8-10 min",
    learning: "Diferenciar IA generativa vs predictiva",
    project: "Mapa de casos de uso en tu campus"
  },
  {
    id: 2,
    title: "Prompting y Control",
    duration: "10-12 min",
    learning: "Controlar estilo, estructura y calidad",
    project: "Generador de historias con evaluación"
  },
  {
    id: 3,
    title: "Transformers sin Matemáticas",
    duration: "10-12 min",
    learning: "Explicar atención y el rol de tokens",
    project: "Mini-visualizador de atención"
  },
  {
    id: 4,
    title: "Code Assistant como Tutor",
    duration: "10-12 min",
    learning: "Usar IA para programar con verificación",
    project: "Bot que genera solución + tests"
  },
  {
    id: 5,
    title: "Multimodal (Imagen+Texto)",
    duration: "10-12 min",
    learning: "Usar visión+texto para análisis",
    project: "Detector de detalles turísticos"
  },
  {
    id: 6,
    title: "RAG con Documentos Locales",
    duration: "12-15 min",
    learning: "Pipeline: chunking → embeddings → respuesta",
    project: "Q&A sobre Ley 81 / Datos Abiertos"
  },
  {
    id: 7,
    title: "Agente Simple con Herramientas",
    duration: "12-15 min",
    learning: "Tool/function calling para acciones",
    project: "Agente planificador de estudio"
  },
  {
    id: 8,
    title: "IA Responsable y Privacidad",
    duration: "8-10 min",
    learning: "Riesgos y controles para publicar demos",
    project: "Checklist de compliance + guardrails"
  }
];

export const timeline = [
  {
    year: 2014,
    title: "GANs",
    subtitle: "Redes Generativas Adversarias",
    description: "Marco adversarial para generar muestras realistas.",
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
    description: "Escala masiva + few-shot learning sin fine-tuning.",
    icon: "sparkles",
    color: "pink"
  },
  {
    year: 2022,
    title: "ChatGPT",
    subtitle: "IA Conversacional Masiva",
    description: "Interfaz que normalizó el uso de LLMs en flujos cotidianos.",
    icon: "message-circle",
    color: "green"
  },
  {
    year: 2024,
    title: "Era Multimodal",
    subtitle: "Texto + Imagen + Audio",
    description: "Modelos que procesan múltiples modalidades: GPT-4V, Gemini, Claude 3.",
    icon: "layers",
    color: "blue"
  },
  {
    year: 2026,
    title: "IA Agéntica",
    subtitle: "Sistemas que Ejecutan",
    description: "De chat a agentes que perciben, planifican y ejecutan con herramientas.",
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
      "Aduanas: Perfilamiento de riesgo"
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
      "BAC Credomatic: Asistentes virtuales",
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
      "MINSA: Programa de Telemedicina",
      "Transformación Digital en Salud"
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
      "ISJUP-IA: Asistente judicial con fuentes",
      "Asamblea: Redacción normativa con IA",
      "Ventanillas virtuales con chatbots"
    ],
    stats: { projects: 6, companies: 8 },
    highlight: "ISJUP-IA: RAG con trazabilidad",
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
      "Tocumen: IA para objetos extraviados"
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
    description: "El modelo procesa tokens (fragmentos), no palabras completas.",
    example: "\"Hola mundo\" → [\"Hola\", \" mundo\"]"
  },
  {
    id: "attention",
    title: "Atención",
    analogy: "Linterna",
    description: "Decide qué partes del contexto importan para cada palabra.",
    example: "'El gato duerme' → relaciona 'duerme' con 'gato'"
  },
  {
    id: "generation",
    title: "Generación",
    analogy: "Autocomplete Pro",
    description: "Avanza token por token calculando probabilidades.",
    example: "\"El cielo es\" → [azul: 70%, rojo: 10%, ...]"
  },
  {
    id: "rag",
    title: "RAG",
    analogy: "Consultar antes de Responder",
    description: "Recupera fragmentos relevantes y genera con citas.",
    example: "Pregunta → Busca docs → Responde citando"
  },
  {
    id: "tools",
    title: "Tool Calling",
    analogy: "IA con Manos",
    description: "El modelo llama funciones externas para ejecutar acciones.",
    example: "\"Agenda reunión\" → llama create_event()"
  },
  {
    id: "agents",
    title: "Agentes",
    analogy: "IA Autónoma",
    description: "Sistemas que perciben, planifican y ejecutan tareas.",
    example: "\"Planifica mi estudio\" → crea plan + tareas + checklist"
  }
];

export const starterPack = {
  title: "Generative AI Student Starter Pack",
  items: [
    "5 Notebooks en Google Colab (sin GPU)",
    "Datasets del Portal de Datos Abiertos de Panamá",
    "Checklist de privacidad y compliance",
    "Ruta de estudio de 14 días",
    "Acceso al mini-hackathon post-webinar"
  ]
};

export const localCases = [
  {
    name: "Jetour/Petroautos",
    metric: "1% → 9.8%",
    description: "Conversión con chatbot IA",
    icon: "trending-up"
  },
  {
    name: "ISJUP-IA",
    metric: "RAG Legal",
    description: "Asistente judicial con fuentes seguras",
    icon: "scale"
  },
  {
    name: "Spark AI Summit",
    metric: "2025",
    description: "Ecosistema y comunidad local",
    icon: "users"
  }
];
