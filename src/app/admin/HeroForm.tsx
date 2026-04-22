"use client";

import { useActionState } from "react";
import Image from "next/image";
import { saveHero, type FormState } from "./actions";
import type { SiteSettings, HeroSide } from "@/lib/whatsapp";

const initial: FormState = { ok: true };

function SideFields({
  side,
  data,
}: {
  side: "left" | "right";
  data: HeroSide;
}) {
  const prefix = side === "left" ? "hero_left" : "hero_right";
  const title = side === "left" ? "Lado izquierdo (Emprendimiento)" : "Lado derecho (Industrial)";
  return (
    <fieldset className="border border-slate-200 rounded-xl p-5">
      <legend className="font-display font-bold text-base px-2">{title}</legend>

      <label className="flex items-center gap-2 text-sm mb-4">
        <input
          type="checkbox"
          name={`${prefix}_enabled`}
          defaultChecked={data.enabled}
          className="size-4"
        />
        Mostrar este lado en la home
      </label>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-slate-600 mb-1.5">
            Imagen actual
          </p>
          {data.imageUrl ? (
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-100 mb-2">
              <Image
                src={data.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
                unoptimized={data.imageUrl.startsWith("/")}
              />
            </div>
          ) : (
            <p className="text-xs text-slate-500 mb-2">Sin imagen.</p>
          )}
          <label className="block text-sm font-semibold mb-1.5">
            Cambiar imagen (opcional, máx 5 MB)
          </label>
          <input
            name={`${prefix}_image`}
            type="file"
            accept="image/*"
            className="block text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              Etiqueta superior
            </label>
            <input
              name={`${prefix}_eyebrow`}
              type="text"
              defaultValue={data.eyebrow ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              Título principal
            </label>
            <input
              name={`${prefix}_title`}
              type="text"
              defaultValue={data.title ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">
            Palabras destacadas (aparecen con color)
          </label>
          <input
            name={`${prefix}_title_accent`}
            type="text"
            defaultValue={data.titleAccent ?? ""}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">Subtítulo</label>
          <textarea
            name={`${prefix}_subtitle`}
            defaultValue={data.subtitle ?? ""}
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              Texto del botón
            </label>
            <input
              name={`${prefix}_button_text`}
              type="text"
              defaultValue={data.buttonText ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              URL del botón
            </label>
            <input
              name={`${prefix}_button_url`}
              type="url"
              defaultValue={data.buttonUrl ?? ""}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default function HeroForm({ settings }: { settings: SiteSettings }) {
  const [state, action, pending] = useActionState(saveHero, initial);
  return (
    <form action={action} className="space-y-6">
      <SideFields side="left" data={settings.heroLeft} />
      <SideFields side="right" data={settings.heroRight} />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl disabled:opacity-60 hover:bg-primary/90 transition-colors"
        >
          {pending ? "Guardando…" : "Guardar hero"}
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
