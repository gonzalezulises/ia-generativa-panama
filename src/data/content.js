// Datos extraídos del reporte de investigación
export const stats = [
  {
    id: 1,
    value: 2.3,
    max: 5.0,
    label: "Madurez IA Empresarial",
    description: "Índice de madurez en organizaciones panameñas (n=230)",
    color: "cyan"
  },
  {
    id: 2,
    value: 2488,
    label: "Ataques Semanales",
    description: "Ciberataques por organización en Panamá",
    suffix: "/org",
    color: "pink"
  },
  {
    id: 3,
    value: 14,
    label: "Data Centers",
    description: "Instalaciones de centros de datos en Panamá",
    color: "purple"
  },
  {
    id: 4,
    value: 109.1,
    label: "Billones USD",
    description: "Inversión privada global en IA (2024)",
    prefix: "$",
    suffix: "B",
    color: "green"
  },
  {
    id: 5,
    value: 78,
    label: "Adopción Global",
    description: "Organizaciones usando IA en 2024",
    suffix: "%",
    color: "blue"
  },
  {
    id: 6,
    value: 46,
    label: "Sin Gobernanza",
    description: "Empresas sin procesos claros de supervisión IA",
    suffix: "%",
    color: "orange"
  }
];

export const timeline = [
  {
    year: 2014,
    title: "GANs",
    subtitle: "Redes Generativas Adversarias",
    description: "Introducen el marco adversarial (generador vs discriminador) para generar muestras realistas.",
    icon: "brain",
    color: "cyan"
  },
  {
    year: 2017,
    title: "Transformers",
    subtitle: "Attention Is All You Need",
    description: "Arquitectura basada solo en mecanismos de atención. Habilitó el paralelismo masivo y los modelos fundacionales.",
    icon: "zap",
    color: "purple"
  },
  {
    year: 2020,
    title: "GPT-3",
    subtitle: "175B Parámetros",
    description: "Escala masiva + few-shot learning. Demostró que los LLMs pueden seguir instrucciones sin fine-tuning.",
    icon: "sparkles",
    color: "pink"
  },
  {
    year: 2022,
    title: "ChatGPT",
    subtitle: "IA Conversacional Masiva",
    description: "Interfaz conversacional que normalizó el uso empresarial de LLMs en flujos cotidianos.",
    icon: "message-circle",
    color: "green"
  },
  {
    year: 2024,
    title: "Era Multimodal",
    subtitle: "Texto + Imagen + Audio + Video",
    description: "Los modelos procesan múltiples modalidades simultáneamente. GPT-4V, Gemini, Claude 3.",
    icon: "layers",
    color: "blue"
  },
  {
    year: 2026,
    title: "IA Agéntica",
    subtitle: "Sistemas que Ejecutan",
    description: "De chat a sistemas que perciben, planifican y ejecutan. Agentes con herramientas, APIs y flujos supervisados.",
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
      "Aduanas: Perfilamiento de riesgo y detección de anomalías"
    ],
    stats: { projects: 12, companies: 45 },
    color: "#00f5ff"
  },
  {
    id: "finance",
    name: "Banca y Finanzas",
    icon: "landmark",
    maturity: 3.8,
    cases: [
      "Banistmo: Chatbot 'Tabot' en producción",
      "BAC Credomatic: Asistentes virtuales multicanal",
      "Banco General: Biometría y anti-spoofing con IA"
    ],
    stats: { projects: 28, companies: 15 },
    highlight: "USD 125M en intentos de fraude detectados (2025)",
    color: "#bf00ff"
  },
  {
    id: "health",
    name: "Salud",
    icon: "heart-pulse",
    maturity: 2.8,
    cases: [
      "CSS: Tomógrafos con IA (~85 estudios/día)",
      "MINSA: Programa Nacional de Telemedicina",
      "Estrategia Nacional de Transformación Digital en Salud"
    ],
    stats: { projects: 8, companies: 12 },
    color: "#ff00a8"
  },
  {
    id: "government",
    name: "Gobierno y Legal",
    icon: "building-2",
    maturity: 2.4,
    cases: [
      "ISJUP-IA: Asistente judicial con fuentes oficiales",
      "Asamblea Nacional: Exploración en redacción normativa",
      "Ventanillas virtuales con chatbots"
    ],
    stats: { projects: 6, companies: 8 },
    highlight: "Caso de referencia: ISJUP-IA con trazabilidad y privacidad",
    color: "#0066ff"
  },
  {
    id: "retail",
    name: "Retail y Turismo",
    icon: "shopping-cart",
    maturity: 3.5,
    cases: [
      "Jetour/Petroautos: Chatbot con 9.8% conversión (vs 1%)",
      "Hoteles Decameron: Asistente 'Cameron'",
      "Tocumen: Exploración IA para objetos extraviados"
    ],
    stats: { projects: 15, companies: 32 },
    highlight: "20.9M pasajeros en Tocumen (2025)",
    color: "#00ff88"
  },
  {
    id: "education",
    name: "Educación",
    icon: "graduation-cap",
    maturity: 2.1,
    cases: [
      "MEDUCA: Capacitación docente en IA",
      "ITSE: Técnico Superior en IA",
      "UTP Veraguas: Proyecto 'Nómada' robot educativo"
    ],
    stats: { projects: 5, companies: 10 },
    color: "#ffaa00"
  }
];

export const llmConcepts = [
  {
    id: "tokenization",
    title: "Tokenización",
    analogy: "Piezas de LEGO",
    description: "El modelo no lee palabras; procesa tokens (fragmentos). Algunos son palabras completas, otros sílabas o signos.",
    example: "\"Hola mundo\" → [\"Hola\", \" mundo\"]"
  },
  {
    id: "attention",
    title: "Atención",
    analogy: "Linterna",
    description: "Decide qué partes del contexto importan para cada palabra que genera. Pondera y arma una vista relevante.",
    example: "En 'El gato que vive en mi casa duerme', relaciona 'duerme' con 'gato'"
  },
  {
    id: "generation",
    title: "Generación",
    analogy: "Autocomplete con Esteroides",
    description: "Avanza token por token: toma contexto, calcula probabilidades y selecciona el siguiente. Repite el ciclo.",
    example: "\"El cielo es\" → [azul: 0.7, rojo: 0.1, verde: 0.05, ...]"
  },
  {
    id: "context",
    title: "Contexto",
    analogy: "Ventana de Memoria",
    description: "Cuánta información puede considerar para responder (prompt + historial + documentos).",
    example: "GPT-4: 128K tokens ≈ 300 páginas de texto"
  },
  {
    id: "hallucination",
    title: "Alucinaciones",
    analogy: "Inventar con Confianza",
    description: "El modelo puede producir afirmaciones plausibles pero falsas. No es un bug: es comportamiento esperado sin verificación.",
    example: "Citar papers que no existen con formato perfecto"
  },
  {
    id: "rag",
    title: "RAG",
    analogy: "Consultar antes de Responder",
    description: "Retrieval-Augmented Generation: recupera fragmentos relevantes de tu base documental y genera anclado en fuentes.",
    example: "Pregunta → Busca en documentos → Responde con citas"
  }
];

export const models = {
  proprietary: [
    { name: "GPT-4 / ChatGPT", company: "OpenAI", strength: "Versatilidad y ecosistema", color: "#10a37f" },
    { name: "Claude 3", company: "Anthropic", strength: "Seguridad y contexto largo", color: "#d4a574" },
    { name: "Gemini", company: "Google", strength: "Multimodalidad nativa", color: "#4285f4" }
  ],
  openWeight: [
    { name: "Llama 3", company: "Meta", strength: "Balance rendimiento/costo", color: "#0668e1" },
    { name: "Mistral", company: "Mistral AI", strength: "Eficiencia (7B params)", color: "#ff7000" },
    { name: "Mixtral", company: "Mistral AI", strength: "Mixture of Experts", color: "#ff7000" }
  ]
};

export const faq = [
  {
    question: "¿La IA reemplazará empleos o aumentará productividad?",
    answer: "El patrón más común es redistribución del trabajo: menos tiempo en borradores y búsquedas manuales, más tiempo en decisión, supervisión y trato humano. Los estudios sobre IA agéntica anticipan cambios en modelos operativos."
  },
  {
    question: "¿Cómo evitamos alucinaciones en decisiones críticas?",
    answer: "No confiando más en el modelo, sino diseñando arquitectura: RAG con fuentes oficiales, verificación, y control por permisos/auditoría. ISJUP-IA es un ejemplo de GenAI con guardrails en Panamá."
  },
  {
    question: "¿Modelo propietario u open-weight?",
    answer: "Depende de sensibilidad de datos, necesidad de personalización, costo marginal y capacidad interna. Con madurez 2.3/5.0, empezar con APIs puede acelerar, pero invierte en arquitectura modular."
  },
  {
    question: "¿Cuál es el primer caso para Panamá hoy?",
    answer: "En casi todas las industrias locales: documentos + atención. Copilots para back office, RAG sobre políticas y chatbots con handoff humano. Los datos ya existen y los KPIs son inmediatos."
  }
];
