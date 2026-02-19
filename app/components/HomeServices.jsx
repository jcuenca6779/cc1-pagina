"use client";

import {
  Building2,
  Info,
  UtensilsCrossed,
  Presentation,
  ParkingCircle,
  Landmark,
  ShieldCheck,
  Shield,
} from "lucide-react";

const SERVICES = [
  {
    id: "banos",
    icon: Building2,
    title: "Baños",
    description:
      "Contamos con baños en planta baja y planta alta para tu comodidad.",
  },
  {
    id: "cajeros",
    icon: Landmark,
    title: "Cajeros automáticos",
    description:
      "Disponibles cajeros del Banco del Pacífico y Banco Internacional.",
  },
  {
    id: "isla-info",
    icon: Info,
    title: "Isla de información",
    description: "El punto de información se encuentra en planta alta.",
  },
  {
    id: "parqueo",
    icon: ParkingCircle,
    title: "Parqueo privado",
    description:
      "Contamos con parqueadero para comodidad de nuestros visitantes.",
  },
  {
    id: "seguridad",
    icon: Shield,
    title: "Seguridad",
    description:
      "Sistema de seguridad y vigilancia permanente para tranquilidad de nuestros visitantes.",
  },
  {
    id: "sala-conferencias",
    icon: Presentation,
    title: "Sala de conferencias",
    description:
      "Espacio para reuniones, charlas y actividades institucionales.",
  },
  {
    id: "oficinas",
    icon: Building2,
    title: "Oficinas",
    description:
      "Espacios para profesionales y empresas en el centro comercial.",
  },
  {
    id: "patio-comidas",
    icon: UtensilsCrossed,
    title: "Patio de comidas",
    description: "Variedad de opciones gastronómicas en un solo lugar.",
  },
  {
    id: "otros",
    icon: ShieldCheck,
    title: "También contamos con:",
    description: "Ascensor, escaleras eléctricas y áreas de descanso.",
  },
];

export default function HomeServices() {
  return (
    <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white rounded-3xl shadow-sm">
      <h2 className="text-3xl font-bold text-center text-[#1d1d99] border-b-4 border-[#1d1d99] pb-2 w-fit mx-auto">
        Servicios
      </h2>

      <div className="flex justify-center mt-8">
        <span className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#0ACEE5] text-white">
          CC1
        </span>
      </div>

      <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
            >
              {Icon && (
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[#0ACEE5]/20 text-[#0ACEE5]">
                  <Icon size={24} />
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
