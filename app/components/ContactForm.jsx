"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      // Aquí conectas tu API real cuando quieras.
      await new Promise((r) => setTimeout(r, 400));

      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        asunto: "",
        mensaje: "",
      });

      setStatus({ type: "success", message: "Mensaje enviado" });

      setTimeout(() => setStatus({ type: "", message: "" }), 2500);
    } catch (err) {
      setStatus({ type: "error", message: "No se pudo enviar el mensaje" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-sm rounded-2xl">
      <h2 className="text-lg font-semibold text-gray-900">Escríbenos</h2>

      <p className="mt-2 text-sm text-gray-600">
        Nos contactaremos contigo lo antes posible.
      </p>

      {status.message && (
        <div
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
            status.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-3 mt-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
            placeholder="Nombre"
            required
          />
          <input
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
            placeholder="Teléfono"
            required
          />
        </div>

        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={onChange}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
          placeholder="Correo"
          required
        />

        <input
          name="asunto"
          value={form.asunto}
          onChange={onChange}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
          placeholder="Asunto"
          required
        />

        <textarea
          rows={4}
          name="mensaje"
          value={form.mensaje}
          onChange={onChange}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
          placeholder="Mensaje"
          required
        />

        <button
          type="submit"
          disabled={isSending}
          className="mt-1 rounded-full bg-[#0ACEE5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#08b7cc] disabled:bg-gray-300"
        >
          {isSending ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </div>
  );
}
