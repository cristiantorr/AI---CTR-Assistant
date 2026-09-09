# Case Study: CTR Assistant - Agente Interactivo de Portafolio

## 1. El Problema

Al presentar un portafolio profesional, los reclutadores deben leer manualmente bloques de texto para encontrar experiencia específica (ej. _¿Tiene experiencia en React y Salesforce?_).

Para resolver esto, decidí crear un asistente virtual. Sin embargo, los principales retos técnicos al integrar el LLM fueron:

- **Alucinaciones y seguridad:** Impedir que el modelo inventara experiencia que no poseo o bloqueara datos por sesgos de privacidad (ej. mi apodo "Torres").
- **Prompt Leaking y pérdida de rol:** Evitar que el modelo revelara sus instrucciones de sistema cuando el usuario interactuaba.

## 2. Proceso y Decisiones de Arquitectura

- **Evaluación de alternativas:** Se descartaron chatbots basados en nodos (como ManyChat) por falta de flexibilidad semántica.
- **Elección tecnológica:** Se implementó una arquitectura basada en **Node.js** utilizando **LangChain** para el manejo de la memoria y la orquestación de mensajes.

### Puntos clave del diseño:

1. **Fuente Única de Verdad (Single Source of Truth):** Toda mi experiencia (proyectos, habilidades, trayectoria) se estructuró en un esquema JSON uniforme.
2. **Aislamiento de Mensajes:** Uso de clases `SystemMessage`, `HumanMessage` y `AIMessage` de LangChain para separar las reglas secretas del agente respecto al historial del usuario, evitando fugas de contexto.
3. **Prompt Engineering con Autorización:** Directivas explícitas dentro del `systemPrompt` autorizando el uso de datos personales y estableciendo reglas estricta sobre el formato sin Markdown agresivo.

## 3. Stack Tecnológico

- **Frontend:** HTML5, CSS3, JavaScript / React (Interfaz de chat conversacional)
- **Backend:** Node.js / Express
- **Orquestador de IA:** LangChain (`@langchain/core`)
- **Modelo de IA:** Gemini 1.5 Flash / OpenAI API
- **Estructura de datos:** JSON estandarizado

## 4. Código Destacado (Orquestación del Prompt e Historial)

```javascript
// Manejo modular del historial con LangChain para evitar Prompt Leaking
const formattedHistory = history.map((msg) => {
  if (msg.role === "user") {
    return new HumanMessage(msg.content);
  }
  return new AIMessage(msg.content);
});

const messages = [
  new SystemMessage(systemPrompt), // Reglas del sistema y JSON de perfil
  ...formattedHistory, // Contexto del chat
  new HumanMessage(userMessage), // Pregunta actual
];

const response = await model.invoke(messages);
```
