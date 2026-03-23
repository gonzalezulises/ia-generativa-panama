import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: '¿Cuál es la mejor herramienta de IA para banca y seguros con redes privadas?',
    a: 'No existe una única "mejor" herramienta. La elección depende de la sensibilidad de los datos, los requerimientos de integración y el nivel de gobierno tecnológico. En sectores regulados, primero se diseña la arquitectura de riesgo y luego se selecciona la herramienta.'
  },
  {
    q: 'Cuando hablamos de "pesos" del modelo, ¿nos referimos a Transformers o VAE?',
    a: 'No. Los pesos son los parámetros aprendidos durante el entrenamiento. Un Transformer o un VAE son arquitecturas o familias de modelos. En otras palabras: la arquitectura define cómo está construido el modelo; los pesos contienen lo que aprendió.'
  },
  {
    q: '¿Se puede crear una IA especializada con leyes, normas o procedimientos internos?',
    a: 'Sí. Pero en la mayoría de los casos no hace falta reentrenar el modelo. Lo más efectivo suele ser construir un sistema RAG, que recupera información relevante de un repositorio documental y la usa para responder con mayor precisión y trazabilidad.'
  },
  {
    q: '¿MCP reemplaza a RAG?',
    a: 'No. Resuelven problemas distintos. RAG se usa para recuperar conocimiento desde documentos o bases de datos. MCP se usa para conectar el modelo con herramientas, sistemas o APIs externas. En arquitecturas maduras, ambos pueden combinarse.'
  },
  {
    q: '¿Qué tan segura es la información que compartimos con una IA?',
    a: 'Depende del entorno y del proveedor. La seguridad no debe asumirse por defecto. Hay que revisar dónde se procesan los datos, qué políticas de retención existen, si se usan para entrenamiento, qué controles de acceso aplican y qué garantías contractuales ofrece la plataforma.'
  },
  {
    q: '¿Cuál es la infraestructura mínima para usar IA con documentos confidenciales?',
    a: 'Depende del tamaño del modelo, el volumen documental y la cantidad de usuarios concurrentes. Como mínimo se requiere un modelo base, un sistema de embeddings, una base vectorial, una capa de orquestación y controles de seguridad. Para entornos institucionales, no basta un experimento improvisado.'
  },
  {
    q: '¿Cómo se detecta el sesgo en los resultados de una IA?',
    a: 'El sesgo no se detecta por intuición, sino por evaluación. Se prueba comparando casos equivalentes donde solo cambia una variable sensible, se analizan diferencias entre grupos, se revisa el balance de los datos y se evalúa el impacto que esos resultados tendrían en decisiones reales.'
  },
  {
    q: 'Para datos sensibles, ¿es mejor IA local o en la nube?',
    a: 'No es una decisión ideológica, sino estratégica. La IA local ofrece más control y soberanía sobre los datos, pero exige más capacidad operativa. La nube ofrece más velocidad y escalabilidad, pero incrementa la dependencia del proveedor y las exigencias contractuales y regulatorias.'
  },
  {
    q: '¿Qué conviene más en una empresa: ChatGPT o Copilot?',
    a: 'Depende del ecosistema tecnológico y del caso de uso. Si la organización trabaja profundamente con Microsoft, Copilot puede tener ventajas de integración. Si busca mayor flexibilidad conversacional y amplitud de uso, ChatGPT Enterprise puede resultar más potente. La decisión debe basarse en integración, seguridad, adopción y costo total.'
  },
  {
    q: '¿Machine Learning e Inteligencia Artificial son lo mismo?',
    a: 'No. Machine Learning es una rama de la Inteligencia Artificial. La IA es el campo amplio; Machine Learning se centra en aprender patrones a partir de datos; Deep Learning es una subrama basada en redes neuronales; y la IA generativa es una aplicación específica dentro de ese espectro.'
  },
  {
    q: '¿Se puede usar IA para supervisar o mejorar otra IA?',
    a: 'Sí. Ya se hace en muchos sistemas. Un modelo puede generar contenido, otro validarlo, otro clasificar su riesgo y otro contrastarlo con reglas o fuentes externas. Esto mejora la calidad, pero no elimina completamente el error. Lo correcto es hablar de reducción y control del riesgo.'
  },
  {
    q: '¿Se pueden combinar varios modelos en una misma solución?',
    a: 'Sí. De hecho, suele ser una buena práctica. Un modelo puede encargarse de generación, otro de clasificación, otro de extracción de datos y otro de evaluación. Las arquitecturas más robustas no dependen de un único modelo "perfecto", sino de una orquestación inteligente de capacidades.'
  },
  {
    q: '¿Es posible medir tokens, costo y consumo energético de una solución de IA?',
    a: 'Sí, aunque con distintos niveles de precisión. Los tokens y el costo pueden medirse con bastante claridad. El consumo energético suele estimarse mediante proxies, ya que depende del modelo, el hardware, el tiempo de inferencia y la infraestructura utilizada.'
  },
];

function FAQItem({ faq, index, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={onClick}
        className={`w-full text-left p-5 rounded-xl transition-all ${
          isOpen ? 'glass-strong border-primary/30' : 'glass hover:border-white/20'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-xs font-bold text-primary mt-1 flex-shrink-0">{index + 1}</span>
            <span className={`text-sm font-medium ${isOpen ? 'text-white' : 'text-gray-300'}`}>
              {faq.q}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 mt-0.5"
          >
            <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-primary' : 'text-gray-500'}`} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-gray-400 leading-relaxed mt-3 pl-6 border-l-2 border-primary/20">
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 relative bg-bg-dark">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sobre IA generativa en empresa
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
