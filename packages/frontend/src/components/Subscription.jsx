import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const plans = [
  {
    id: "BASIC_PLAN",
    name: "Plan Básico",
    price: import.meta.env.VITE_SUBSCRIPTION_BASIC_PLAN || "5.00",
    description: "Acceso ilimitado a música estándar.",
    upgradeTo: "PREMIUM_PLAN",
  },
  {
    id: "PREMIUM_PLAN",
    name: "Plan Premium",
    price: import.meta.env.VITE_SUBSCRIPTION_PREMIUM_PLAN || "10.00",
    description:
      "Acceso ilimitado a toda la biblioteca de música, playlists exclusivas y descarga offline.",
    upgradeTo: null,
  },
];

const Subscription = () => {
  const [subscription, setSubscription] = useState(null); // Suscripción activa
  const [loading, setLoading] = useState(true); // Estado de carga
  const [selectedPlan, setSelectedPlan] = useState(null); // Plan seleccionado

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/subscriptions/get-subscription`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const result = await response.json();
        if (response.ok && result.subscription) {
          setSubscription(result.subscription); // Guardar la suscripción activa
        }
      } catch (error) {
        console.error("Error al obtener la suscripción:", error);
      } finally {
        setLoading(false); // Detener la pantalla de carga
      }
    };

    fetchSubscription();
  }, []);

  // Manejar nueva suscripción
  const handleSubscribe = async (orderDetails) => {
    if (!selectedPlan) {
      alert("Debe seleccionar un plan.");
      return;
    }

    if (orderDetails.status !== "COMPLETED") {
      alert("El pago no se completó correctamente.");
      return;
    }

    const subscriptionData = {
      planId: selectedPlan,
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      status: "ACTIVE",
      orderId: orderDetails.id,
      payerName: orderDetails.payer.name.given_name,
      payerEmail: orderDetails.payer.email_address,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/subscriptions/save-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(subscriptionData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Suscripción guardada con éxito");
        setSubscription(subscriptionData); // Actualizar la suscripción activa
        setSelectedPlan(null); // Reiniciar el plan seleccionado
      } else {
        alert("Error al guardar la suscripción: " + result.error);
      }
    } catch (error) {
      console.error("Error al guardar la suscripción:", error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/subscriptions/cancel-subscription`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        alert("Suscripción cancelada con éxito");
        setSubscription(null); 
      } else {
        alert("Error al cancelar la suscripción.");
      }
    } catch (error) {
      console.error("Error al cancelar la suscripción:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-secondary">Cargando...</div>;
  }

  // Mostrar apartado de "Mi Suscripción" si hay una suscripción activa
  if (subscription && subscription.status === "ACTIVE") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-primary to-contrast text-secondary px-6">
        <h1 className="text-4xl font-extrabold mb-8">Mi Suscripción</h1>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-white">
            {subscription.planId === "BASIC_PLAN" ? "Plan Básico" : "Plan Premium"}
          </h2>
          <p className="text-lg text-white mb-2">
            <strong>Plan:</strong> {subscription.planId}
          </p>
          <p className="text-lg text-white mb-2">
            <strong>Inicio:</strong> {new Date(subscription.startDate).toLocaleDateString()}
          </p>
          <p className="text-lg text-white mb-2">
            <strong>Fin:</strong> {new Date(subscription.endDate).toLocaleDateString()}
          </p>
          <p className="text-lg text-white mb-6">
            <strong>Estado:</strong> {subscription.status}
          </p>
          {subscription.planId === "BASIC_PLAN" && (
            <button
              onClick={() => setSelectedPlan("PREMIUM_PLAN")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 mb-4"
            >
              Mejorar a Plan Premium
            </button>
          )}
          <button
            onClick={handleUnsubscribe}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Cancelar Suscripción
          </button>
        </div>
      </div>
    );
  }

  // Si no hay suscripción activa, mostrar los planes
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-primary to-contrast text-secondary px-6">
      <h1 className="text-4xl font-extrabold mb-8">Suscripciones</h1>
      <div className="grid grid-cols-1 gap-8 w-full max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
            <p className="text-lg mb-4 text-white">{plan.description}</p>
            <p className="text-lg mb-6 text-white">
              <strong>Precio:</strong> ${plan.price}/mes
            </p>

            <PayPalButtons
              style={{ layout: "horizontal", color: "white", shape: "rect", height: 50 }}
              createOrder={(_, actions) => {
                setSelectedPlan(plan.id);
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: plan.price },
                    },
                  ],
                });
              }}
              onApprove={(_, actions) => {
                return actions.order.capture().then((orderDetails) => {
                  handleSubscribe(orderDetails);
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
