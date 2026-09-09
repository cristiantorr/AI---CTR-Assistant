const express = require("express");
const router = express.Router();
const { generateAIResponse } = require("../services/ai");

// Endpoint POST: /api/chat
router.post("/", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "El mensaje es requerido." });
  }

  // Generar respuesta del modelo
  try {
    const aiReply = await generateAIResponse(message, history);
    res.json({ response: aiReply });
  } catch (error) {
    console.error("Error al comunicarse con el modelo:", error);
    res.status(500).json({
      error:
        "Ocurrió un error interno en la IA. Verifica que el modelo esté ejecutándose.",
    });
  }
});

module.exports = router;
