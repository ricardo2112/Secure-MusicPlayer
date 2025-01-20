import User from "../model/user.js";

// Guardar suscripción después del pago exitoso
export const saveSubscription = async (req, res) => {
  try {
    const { planId, startDate, endDate, status } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newSubscription = { planId, startDate, endDate, status };
    user.subscriptions = user.subscriptions || [];
    user.subscriptions.push(newSubscription);

    await user.save();

    res.status(201).json({ message: "Suscripción guardada con éxito", subscription: newSubscription });
  } catch (error) {
    console.error("Error al guardar la suscripción:", error.message);
    res.status(500).json({ error: "Error al guardar la suscripción" });
  }
};

// Obtener la suscripción activa
export const getActiveSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.subscriptions || user.subscriptions.length === 0) {
      return res.status(404).json({ error: "No hay suscripción activa" });
    }

    const activeSubscription = user.subscriptions.find((sub) => sub.status === "ACTIVE");
    if (!activeSubscription) {
      return res.status(404).json({ error: "No hay suscripción activa" });
    }

    res.status(200).json({ subscription: activeSubscription });
  } catch (error) {
    console.error("Error al obtener la suscripción:", error.message);
    res.status(500).json({ error: "Error al obtener la suscripción" });
  }
};
