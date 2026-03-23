// Contenido para webinar gerencial: Introducción a la IA Generativa
// Enfocado en decisores, líderes y gerentes

export const stats = [
  {
    id: 1,
    value: 78,
    label: "Shadow AI",
    description: "De empleados usan IA sin autorización en sus empresas (WalkMe/SAP 2025)",
    suffix: "%",
    color: "orange"
  },
  {
    id: 2,
    value: 7.5,
    label: "Con Entrenamiento",
    description: "Solo este porcentaje de empleados tiene formación extensa en IA (WalkMe/SAP 2025)",
    suffix: "%",
    color: "pink"
  },
  {
    id: 3,
    value: 95,
    label: "Pilotos IA Fracasan",
    description: "De pilotos de IA empresarial fracasan por falta de capacitación, no de tecnología (MIT 2025)",
    suffix: "%",
    color: "cyan"
  },
  {
    id: 4,
    value: 356,
    label: "Crecimiento LATAM",
    description: "Aumento de inscripciones en GenAI en Latinoamérica durante 2025 (Coursera/Combine)",
    prefix: "+",
    suffix: "%",
    color: "green"
  },
  {
    id: 5,
    value: 3.2,
    label: "Brecha de Talento",
    description: "Por cada profesional IA disponible, hay 3.2 posiciones abiertas (WEF 2025)",
    suffix: ":1",
    color: "blue"
  },
  {
    id: 6,
    value: 24,
    label: "Horas del Programa",
    description: "3 cursos progresivos: Fundamentos + Prompting + Agentes. De usuario casual a profesional IA.",
    suffix: "h",
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
    year: "IAG-101",
    title: "Entender la IA",
    subtitle: "Fundamentos · 8 horas",
    description: "Qué es y qué no es IA generativa. Pensamiento crítico, sesgos, limitaciones reales. Evaluar herramientas con criterio.",
    icon: "brain",
    color: "cyan"
  },
  {
    year: "IAG-101",
    title: "Ecosistema Multi-herramienta",
    subtitle: "ChatGPT · Gemini · Claude · Copilot",
    description: "Trabajo práctico con múltiples plataformas. No dependes de un solo proveedor. Texto, imagen, documentos.",
    icon: "layers",
    color: "purple"
  },
  {
    year: "IAG-102",
    title: "Prompting Efectivo",
    subtitle: "Ingeniería de Prompts · 8 horas",
    description: "Zero-shot, Few-shot, Chain-of-Thought, Role Prompting. Diseñar instrucciones que producen resultados consistentes.",
    icon: "zap",
    color: "green"
  },
  {
    year: "IAG-102",
    title: "Prompting Avanzado",
    subtitle: "Evaluación y Tareas Complejas",
    description: "Documentos largos, análisis multi-paso, evaluación de outputs. Biblioteca personal de prompts optimizados.",
    icon: "sparkles",
    color: "pink"
  },
  {
    year: "IAG-103",
    title: "Agentes y RAG",
    subtitle: "Asistentes Inteligentes · 8 horas",
    description: "Construir agentes autónomos. RAG para conectar IA con tus documentos internos. Custom GPTs y Claude Projects.",
    icon: "bot",
    color: "blue"
  },
  {
    year: "IAG-103",
    title: "Integración y Gobernanza",
    subtitle: "Automatización + Compliance",
    description: "Integrar agentes con Zapier, CRM y workflows. Gobernanza, evaluación de riesgos y entregable: prototipo funcional.",
    icon: "message-circle",
    color: "orange"
  }
];

export const sectors = [
  {
    id: "logistics",
    name: "Logística y Supply Chain",
    icon: "ship",
    cases: [
      "Predicción de demanda y optimización de inventario con IA",
      "Automatización de documentación aduanera y clasificación arancelaria",
      "Monitoreo predictivo de flotas y rutas con agentes autónomos"
    ],
    highlight: "Reducir tiempos de despacho hasta 40% con clasificación IA",
    color: "#00B4D8"
  },
  {
    id: "finance",
    name: "Banca y Finanzas",
    icon: "landmark",
    cases: [
      "Detección de fraude en tiempo real con análisis de patrones",
      "Asistentes virtuales para servicio al cliente 24/7",
      "Generación automática de reportes de compliance y KYC"
    ],
    highlight: "Chatbots financieros resuelven 70% de consultas sin humano",
    color: "#10B981"
  },
  {
    id: "health",
    name: "Salud",
    icon: "heart-pulse",
    cases: [
      "Análisis de imágenes médicas para priorización de diagnóstico",
      "RAG sobre guías clínicas para soporte en decisiones médicas",
      "Resúmenes automáticos de historiales clínicos"
    ],
    highlight: "IA radiológica puede triplicar capacidad de estudios diarios",
    color: "#F43F5E"
  },
  {
    id: "government",
    name: "Gobierno y Legal",
    icon: "building-2",
    cases: [
      "Asistentes RAG sobre normativa con fuentes verificables",
      "Automatización de redacción y revisión de documentos legales",
      "Chatbots de atención ciudadana y ventanilla virtual 24/7"
    ],
    highlight: "RAG legal garantiza trazabilidad y cero alucinaciones",
    color: "#8B5CF6"
  },
  {
    id: "retail",
    name: "Retail y Comercio",
    icon: "shopping-cart",
    cases: [
      "Chatbots de ventas en WhatsApp con calificación automática de leads",
      "Generación de contenido para marketing y redes sociales",
      "Personalización de recomendaciones y experiencia de compra"
    ],
    highlight: "Chatbots IA pueden multiplicar conversión hasta 10x",
    color: "#F59E0B"
  },
  {
    id: "education",
    name: "Educación y RRHH",
    icon: "graduation-cap",
    cases: [
      "Tutores IA personalizados que adaptan contenido al estudiante",
      "Evaluación automática con feedback detallado y rúbricas",
      "Onboarding y capacitación corporativa con agentes inteligentes"
    ],
    highlight: "Formación facilitada tiene 4x mejor retención que self-paced",
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
