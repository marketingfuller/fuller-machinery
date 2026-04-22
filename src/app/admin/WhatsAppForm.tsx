"use client";

import { useActionState } from "react";
import { saveWhatsApp, type FormState } from "./actions";

const initial: FormState = { ok: true };

function displayPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^57/, "");
  if (digits.length !== 10) return raw;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export default function WhatsAppForm({
  initialCommercial,
  initialSupport,
}: {
  initialCommercial: string;
  initialSupport: string;
}) {
  const [state, action, pending] = useActionState(saveWhatsApp, initial);
  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-1.5">
          Número comercial
        </label>
        <input
          name="commercial"
          type="tel"
          required
          defaultValue={displayPhone(initialCommercial)}
          placeholder="+57 324 424 7198"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">
          Número de servicio técnico
        </label>
        <input
          name="support"
          type="tel"
          required
          defaultValue={displayPhone(initialSupport)}
          placeholder="+57 322 853 4925"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl disabled:opacity-60 hover:bg-primary/90 transition-colors"
        >
          {pending ? "Guardando…" : "Guardar"}
        </button>
        {state.message && (
          <p
            className={`text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
