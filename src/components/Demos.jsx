import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Code, Eye, FileSearch, Play, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';

// Demo 1: IstmoStory Studio - Generador de historias
function IstmoStoryDemo() {
  const [tema, setTema] = useState('Canal de Panamá');
  const [tono, setTono] = useState('inspirador');
  const [creatividad, setCreatividad] = useState(0.7);
  const [generating, setGenerating] = useState(false);
  const [story, setStory] = useState('');
  const [copied, setCopied] = useState(false);

  const temas = ['Canal de Panamá', 'Biodiversidad', 'Vida universitaria', 'Emprendimiento', 'Casco Viejo'];
  const tonos = ['inspirador', 'humor', 'thriller', 'documental'];

  const stories = {
    'Canal de Panamá': {
      inspirador: 'En el corazón del istmo, donde dos océanos se abrazan, nació una idea que cambiaría el comercio mundial. Miles de trabajadores, bajo un sol implacable, excavaron montañas y domaron ríos. Hoy, cada barco que cruza las esclusas de Miraflores lleva consigo el eco de ese sueño cumplido: conectar mundos, unir destinos.',
      humor: '¿Sabías que el Canal de Panamá es el único lugar del mundo donde puedes decir "voy a cruzar de un océano a otro" y tardar menos que en el tráfico de la Tumba Muerto? Los barcos pasan más rápido que un taxi en hora pico.',
      thriller: 'Las aguas del Gatún guardaban secretos. El capitán Morales observó el radar: algo se movía bajo la superficie. No era un cocodrilo. Era demasiado grande. Las esclusas se cerraron automáticamente. Alguien —o algo— había hackeado el sistema.',
      documental: 'Construido entre 1904 y 1914, el Canal de Panamá representa una de las mayores hazañas de ingeniería del siglo XX. Con 80 kilómetros de longitud, permite el tránsito de aproximadamente 14,000 buques anuales, generando ingresos superiores a los 4 mil millones de dólares.'
    },
    'Biodiversidad': {
      inspirador: 'Panamá, puente entre continentes, es hogar de más especies de aves que Estados Unidos y Canadá juntos. En cada hoja de la selva del Darién late la promesa de descubrimientos. Somos guardianes de un tesoro verde que el mundo apenas comienza a comprender.',
      humor: 'En Panamá tenemos tantas especies de ranas que podrían formar su propio partido político. Y probablemente gobernarían mejor que... bueno, mejor no seguir con esa analogía.',
      thriller: 'El biólogo encontró la especie a las 3 AM, cuando el bosque nuboso se llenaba de niebla. Una rana dorada que no debería existir. Llevaba 15 años extinta. Alguien la había traído de vuelta. La pregunta era: ¿por qué?',
      documental: 'Con solo el 0.1% de la superficie terrestre, Panamá alberga el 5% de la biodiversidad mundial. El Parque Nacional Darién, Patrimonio de la Humanidad, contiene más de 1,800 especies de plantas vasculares y 530 especies de aves documentadas.'
    },
    'Vida universitaria': {
      inspirador: 'Entre bibliotecas y cafeterías, entre exámenes y amistades, se forjan los profesionales que transformarán Panamá. Cada desvelo tiene propósito, cada duda es semilla de conocimiento. El futuro del país duerme poco, pero sueña en grande.',
      humor: 'Estudiar en Panamá significa dominar el arte de encontrar estacionamiento, sobrevivir al aire acondicionado ártico de las aulas, y explicarle a tu familia por qué "estudiar con amigos" requiere ir a un restaurante.',
      thriller: 'El mensaje apareció en el grupo de WhatsApp a medianoche: "El examen final fue filtrado." María lo ignoró. Pero cuando llegó al aula, todos tenían las mismas respuestas. Todos menos ella. Alguien quería que reprobara.',
      documental: 'El sistema universitario panameño cuenta con 5 universidades públicas y más de 40 privadas. Anualmente, más de 150,000 estudiantes cursan educación superior, con carreras de ingeniería, medicina y negocios liderando la demanda.'
    },
    'Emprendimiento': {
      inspirador: 'En garajes de Panamá nacen las ideas que mañana conquistarán mercados. Cada emprendedor panameño lleva en su sangre la audacia de quienes construyeron una nación en un istmo. El siguiente unicornio podría estar gestándose ahora mismo en Ciudad del Saber.',
      humor: 'Emprender en Panamá es fácil: solo necesitas una idea brillante, capital infinito, paciencia de santo, y la habilidad de explicar tu startup en 30 segundos mientras el ascensor del PH se detiene en cada piso.',
      thriller: 'La app tenía 2 millones de usuarios. Y un bug que nadie había detectado. Alguien estaba usando la plataforma para lavar dinero. Carlos tenía 48 horas para encontrar el fallo antes de que las autoridades cerraran todo.',
      documental: 'El ecosistema emprendedor panameño ha crecido 300% desde 2015. Iniciativas como Ciudad del Saber, SENACYT y la Ley de SEM facilitan la creación de startups. En 2024, el país atrajo más de $200 millones en inversión de venture capital regional.'
    },
    'Casco Viejo': {
      inspirador: 'Cada adoquín del Casco guarda historias de piratas y virreyes, de independencias y renacimientos. Hoy, donde antes hubo abandono, florece arte, gastronomía y vida. Las ruinas se volvieron restaurantes, los conventos en galerías. El pasado y el futuro bailan juntos cada noche.',
      humor: 'Vivir en el Casco Viejo es experimentar la gentrificación en tiempo real: un día el café cuesta $1, al mes siguiente $7, y viene con nota explicando el origen del grano y su relación con la luna llena.',
      thriller: 'Detrás de la fachada colonial del edificio 47, el anticuario encontró una puerta que no aparecía en los planos originales de 1673. Lo que había adentro explicaba por qué tres dueños anteriores habían desaparecido.',
      documental: 'Fundado en 1673 tras la destrucción de Panamá Viejo, el Casco Antiguo fue declarado Patrimonio de la Humanidad en 1997. Su restauración ha convertido 28 hectáreas de edificios coloniales en el centro cultural y gastronómico más visitado del país.'
    }
  };

  const generateStory = () => {
    setGenerating(true);
    setStory('');

    const fullStory = stories[tema]?.[tono] || stories['Canal de Panamá']['inspirador'];

    // Simulate word-by-word generation
    let currentIndex = 0;
    const words = fullStory.split(' ');

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setStory(prev => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 50 + (1 - creatividad) * 50);
  };

  const copyStory = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Tema</label>
          <select
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
          >
            {temas.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Tono</label>
          <select
            value={tono}
            onChange={(e) => setTono(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
          >
            {tonos.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Creatividad: {Math.round(creatividad * 100)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={creatividad}
            onChange={(e) => setCreatividad(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generateStory}
        disabled={generating}
        className="btn-primary flex items-center gap-2"
      >
        {generating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generar Historia
          </>
        )}
      </button>

      {/* Output */}
      {story && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <p className="text-gray-200 leading-relaxed">{story}</p>
          {!generating && (
            <button
              onClick={copyStory}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Demo 2: Code Mentor
function CodeMentorDemo() {
  const [code, setCode] = useState(`function validarCedula(cedula) {
  // TODO: Implementar validación
  return true;
}`);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        issues: [
          { line: 2, type: 'warning', message: 'La función siempre retorna true, no valida nada' },
          { line: 1, type: 'suggestion', message: 'Agregar validación de formato: X-XXX-XXXX' }
        ],
        suggestion: `function validarCedula(cedula) {
  // Formato esperado: X-XXX-XXXX o XX-XXX-XXXX
  const regex = /^\\d{1,2}-\\d{3}-\\d{4}$/;

  if (!cedula || typeof cedula !== 'string') {
    return { valido: false, error: 'Cédula requerida' };
  }

  if (!regex.test(cedula)) {
    return { valido: false, error: 'Formato inválido' };
  }

  return { valido: true };
}`,
        tests: `// Tests generados automáticamente
test('valida formato correcto', () => {
  expect(validarCedula('8-123-4567').valido).toBe(true);
});

test('rechaza formato incorrecto', () => {
  expect(validarCedula('123456').valido).toBe(false);
});

test('rechaza valor vacío', () => {
  expect(validarCedula('').valido).toBe(false);
});`
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Code input */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Tu código</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={6}
          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-green-400 font-mono text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <button
        onClick={analyze}
        disabled={analyzing}
        className="btn-primary flex items-center gap-2"
      >
        {analyzing ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Analizando...
          </>
        ) : (
          <>
            <Code className="w-4 h-4" />
            Analizar y Mejorar
          </>
        )}
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Issues */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-red-400 font-semibold mb-2">Problemas detectados</h4>
            {result.issues.map((issue, i) => (
              <div key={i} className="text-sm text-gray-300">
                <span className="text-yellow-400">Línea {issue.line}:</span> {issue.message}
              </div>
            ))}
          </div>

          {/* Suggestion */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-green-400 font-semibold mb-2">Código mejorado</h4>
            <pre className="text-sm text-green-300 font-mono overflow-x-auto">{result.suggestion}</pre>
          </div>

          {/* Tests */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-blue-400 font-semibold mb-2">Tests generados</h4>
            <pre className="text-sm text-blue-300 font-mono overflow-x-auto">{result.tests}</pre>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Demo 3: Vision Explainer
function VisionDemo() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const images = [
    { name: 'Canal de Panamá', emoji: '🚢', color: '#00B4D8' },
    { name: 'Selva Tropical', emoji: '🌴', color: '#10B981' },
    { name: 'Casco Viejo', emoji: '🏛️', color: '#F59E0B' },
    { name: 'Skyline Ciudad', emoji: '🏙️', color: '#8B5CF6' }
  ];

  const analyses = [
    {
      description: 'Imagen del Canal de Panamá mostrando las esclusas de Miraflores con un buque portacontenedores en tránsito.',
      objects: ['Esclusa', 'Buque', 'Contenedores', 'Agua', 'Compuertas'],
      copy: '🚢 Donde el Atlántico y el Pacífico se dan la mano. 80km de ingeniería que cambiaron el mundo. #CanalDePanamá #Ingeniería',
      quiz: ['¿Cuántas esclusas tiene el Canal?', '¿En qué año se inauguró?', '¿Cuántos barcos transitan diariamente?']
    },
    {
      description: 'Fotografía de la selva tropical del Darién con vegetación exuberante y biodiversidad visible.',
      objects: ['Árboles', 'Helechos', 'Aves', 'Río', 'Niebla'],
      copy: '🌿 El pulmón de las Américas. 5% de la biodiversidad mundial en un solo país. #PanamáVerde #Biodiversidad',
      quiz: ['¿Cuántas especies de aves hay en Panamá?', '¿Qué parque nacional es Patrimonio de la Humanidad?']
    },
    {
      description: 'Vista arquitectónica del Casco Antiguo con edificios coloniales restaurados y calles empedradas.',
      objects: ['Edificio colonial', 'Balcones', 'Calle empedrada', 'Iglesia', 'Plaza'],
      copy: '🏛️ 350 años de historia en cada esquina. El Casco Viejo: donde el pasado se viste de futuro. #CascoViejo #Patrimonio',
      quiz: ['¿En qué año fue declarado Patrimonio de la Humanidad?', '¿Por qué se fundó el Casco Antiguo?']
    },
    {
      description: 'Panorámica del skyline de Ciudad de Panamá con rascacielos modernos reflejados en la bahía.',
      objects: ['Rascacielos', 'Bahía', 'F&F Tower', 'Cinta Costera', 'Atardecer'],
      copy: '🌆 El Dubai de las Américas. Donde los sueños se construyen hacia el cielo. #PanamaCity #Skyline',
      quiz: ['¿Cuál es el edificio más alto de Panamá?', '¿Cuántos habitantes tiene la capital?']
    }
  ];

  const analyzeImage = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyses[selectedImage]);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Image selector */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setSelectedImage(i); setResult(null); }}
            className={`p-4 rounded-xl border transition-all ${
              selectedImage === i
                ? 'border-primary bg-primary/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-3xl mb-2">{img.emoji}</div>
            <div className="text-xs text-gray-400">{img.name}</div>
          </button>
        ))}
      </div>

      <button
        onClick={analyzeImage}
        disabled={analyzing}
        className="btn-primary flex items-center gap-2"
      >
        {analyzing ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Analizando imagen...
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            Analizar con IA
          </>
        )}
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-primary font-semibold mb-2">Descripción</h4>
            <p className="text-gray-300 text-sm">{result.description}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-primary font-semibold mb-2">Objetos detectados</h4>
            <div className="flex flex-wrap gap-2">
              {result.objects.map((obj, i) => (
                <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  {obj}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-primary font-semibold mb-2">Copy para redes</h4>
            <p className="text-gray-300 text-sm">{result.copy}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-primary font-semibold mb-2">Preguntas de quiz</h4>
            <ul className="space-y-1">
              {result.quiz.map((q, i) => (
                <li key={i} className="text-gray-300 text-sm">• {q}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Demo 4: RAG + Agent
function RAGDemo() {
  const [question, setQuestion] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);

  const sampleQuestions = [
    '¿Qué exige la Ley 81 sobre protección de datos?',
    '¿Cuál es la estrategia nacional de IA de Panamá?',
    '¿Qué datos están disponibles en el Portal de Datos Abiertos?'
  ];

  const answers = {
    '¿Qué exige la Ley 81 sobre protección de datos?': {
      answer: 'La Ley 81 de 2019 establece los principios y obligaciones para el tratamiento de datos personales en Panamá. Exige: consentimiento previo del titular, finalidad específica, seguridad de los datos, y el derecho a acceso, rectificación y cancelación.',
      sources: [
        { title: 'Ley 81 de 26 de marzo de 2019', page: 'Art. 5-12' },
        { title: 'Decreto Ejecutivo No. 285', page: 'Capítulo II' }
      ],
      actions: ['Crear checklist de cumplimiento', 'Generar aviso de privacidad', 'Exportar resumen PDF']
    },
    '¿Cuál es la estrategia nacional de IA de Panamá?': {
      answer: 'SENACYT lidera el desarrollo de la Estrategia Nacional de IA desde febrero 2025. Se enfoca en: capacitación del talento humano, marco regulatorio, adopción en sector público, e impulso a la investigación. El nivel de madurez actual es 2.3/5.0.',
      sources: [
        { title: 'Comunicado SENACYT Feb 2025', page: 'Anuncio oficial' },
        { title: 'Estudio Elemente Nov 2025', page: 'Indicadores de madurez' }
      ],
      actions: ['Ver hoja de ruta', 'Comparar con otros países', 'Descargar informe']
    },
    '¿Qué datos están disponibles en el Portal de Datos Abiertos?': {
      answer: 'El Portal de Datos Abiertos de Panamá contiene datasets de: presupuesto público, salud, educación, ambiente, transporte, y estadísticas económicas. Cada dataset incluye metadatos, formatos descargables (CSV, JSON), y API de acceso.',
      sources: [
        { title: 'Portal de Datos Abiertos', page: 'datosabiertos.gob.pa' },
        { title: 'Catálogo de Datasets', page: '150+ datasets' }
      ],
      actions: ['Explorar catálogo', 'Conectar vía API', 'Ver ejemplos de uso']
    }
  };

  const search = (q = question) => {
    if (!q.trim()) return;
    setSearching(true);
    setResult(null);

    setTimeout(() => {
      const foundAnswer = answers[q] || {
        answer: 'Basándome en los documentos disponibles, no encontré información específica sobre esa consulta. Te sugiero reformular la pregunta o consultar directamente las fuentes oficiales.',
        sources: [{ title: 'Base de conocimiento local', page: 'Sin coincidencias exactas' }],
        actions: ['Reformular pregunta', 'Buscar en fuentes externas']
      };
      setResult(foundAnswer);
      setSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Sample questions */}
      <div className="flex flex-wrap gap-2">
        {sampleQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => { setQuestion(q); search(q); }}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && search()}
          placeholder="Pregunta sobre documentos panameños..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
        />
        <button
          onClick={() => search()}
          disabled={searching || !question.trim()}
          className="btn-primary px-6"
        >
          {searching ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileSearch className="w-5 h-5" />}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Answer */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-gray-200 leading-relaxed">{result.answer}</p>
          </div>

          {/* Sources */}
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <h4 className="text-primary font-semibold mb-3 flex items-center gap-2">
              <FileSearch className="w-4 h-4" />
              Fuentes citadas
            </h4>
            <div className="space-y-2">
              {result.sources.map((src, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-primary">📄</span>
                  <span className="text-white">{src.title}</span>
                  <span className="text-gray-500">— {src.page}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {result.actions.map((action, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Main Demos component
export default function Demos() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { id: 0, title: 'IstmoStory Studio', subtitle: 'Generador de Historias', icon: PenTool, color: '#00B4D8', component: IstmoStoryDemo },
    { id: 1, title: 'Code Mentor', subtitle: 'Tutor de Código', icon: Code, color: '#10B981', component: CodeMentorDemo },
    { id: 2, title: 'Vision Explainer', subtitle: 'Análisis de Imagen', icon: Eye, color: '#F43F5E', component: VisionDemo },
    { id: 3, title: 'RAG + Agente', subtitle: 'Q&A Documentos', icon: FileSearch, color: '#8B5CF6', component: RAGDemo }
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <section id="demos" className="py-24 relative bg-bg-dark">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Lo que Aprenderás
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            4 <span className="gradient-text">Demos</span> en Vivo
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Aplicaciones reales de IA Generativa que puedes llevar a tu organización
          </p>
        </motion.div>

        {/* Demo tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
                  activeDemo === demo.id
                    ? 'bg-white/10 border-2'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
                style={{ borderColor: activeDemo === demo.id ? demo.color : undefined }}
              >
                <Icon className="w-5 h-5" style={{ color: demo.color }} />
                <div className="text-left">
                  <div className="text-white font-medium text-sm">{demo.title}</div>
                  <div className="text-gray-500 text-xs">{demo.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active demo */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8"
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </section>
  );
}
