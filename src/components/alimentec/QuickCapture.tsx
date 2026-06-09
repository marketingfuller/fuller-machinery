"use client";

import { useEffect, useState } from "react";
import { BUSINESS_TYPES, FAIR } from "@/content/alimentec";

// Captura rápida para los asesores en la feria: agregan un cliente a ZOCAM a su
// nombre desde el celular. El asesor se elige una vez y queda recordado en el
// dispositivo (mismo localStorage que la herramienta del stand). También puede
// abrirse pre-asignado vía ?a=Nombre&w=WhatsApp (su QR personal). El lead entra
// a ZOCAM por data-zocam-form (asesor + cliente + UTM) → tag + dueño + deal.

const ADVISOR_KEY = "fuller_asesor";
const QUICK_PICKS = [
  "Angie Loaiza",
  "Misael Amaya",
  "Javier Bello",
  "Brandon Buitrago",
  "Juan Galindo",
  "Ariadna Marketing",
];

type Advisor = { name: string; whatsapp: string };

function waDigits(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("57") && d.length === 12) return d;
  if (d.length === 10) return `57${d}`;
  return d;
}

export default function QuickCapture() {
  const [advisor, setAdvisor] = useState<Advisor>({ name: "", whatsapp: "" });
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customWa, setCustomWa] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const [qrUrl, setQrUrl] = useState("");
  const [qrOpen, setQrOpen] = useState(false);

  // Carga inicial: ?a=&w= (QR personal) tiene prioridad; si no, localStorage.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get("a");
    const w = params.get("w");
    if (a) {
      const adv = { name: a, whatsapp: w ?? "" };
      setAdvisor(adv);
      persist(adv);
      setReady(true);
      return;
    }
    try {
      const raw = window.localStorage.getItem(ADVISOR_KEY);
      if (raw) {
        const adv = JSON.parse(raw) as Advisor;
        if (adv.name) setAdvisor({ name: adv.name, whatsapp: adv.whatsapp ?? "" });
      }
    } catch {
      /* sin persistencia */
    }
    setReady(true);
  }, []);

  function persist(adv: Advisor) {
    try {
      window.localStorage.setItem(ADVISOR_KEY, JSON.stringify(adv));
    } catch {
      /* ignore */
    }
  }

  function chooseAdvisor(adv: Advisor) {
    setAdvisor(adv);
    persist(adv);
    setEditing(false);
    setCustomName("");
    setCustomWa("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // ZOCAM captura el form en fase de captura ANTES de este handler.
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("telefono") ?? "").trim();
    e.preventDefault();
    if (!name || !phone) {
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  async function showMyQr() {
    const base = `${window.location.origin}/alimentec/captura`;
    const params = new URLSearchParams({ a: advisor.name });
    if (advisor.whatsapp) params.set("w", waDigits(advisor.whatsapp));
    try {
      const QR = await import("qrcode");
      const url = await QR.toDataURL(`${base}?${params.toString()}`, {
        width: 360,
        margin: 1,
        color: { dark: "#013d02", light: "#ffffff" },
      });
      setQrUrl(url);
      setQrOpen(true);
    } catch {
      setQrUrl("");
    }
  }

  if (!ready) return null;

  const needsAdvisor = !advisor.name || editing;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-secondary font-mono text-xs uppercase tracking-widest mb-1">
            {FAIR.name} · {FAIR.pavilion} · {FAIR.stand}
          </p>
          <h1 className="font-display font-black text-2xl text-primary">Agregar cliente a ZOCAM</h1>
        </div>

        {needsAdvisor ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <p className="font-display font-black text-xl text-primary mb-1">¿Quién eres?</p>
            <p className="text-gray-500 text-sm mb-4">
              El cliente quedará a tu nombre. Se recuerda en este celular.
            </p>
            <div className="grid grid-cols-1 gap-2 mb-4">
              {QUICK_PICKS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => chooseAdvisor({ name: n, whatsapp: advisor.whatsapp })}
                  className="w-full rounded-xl border border-gray-200 hover:border-accent hover:bg-accent/5 px-4 py-3 text-sm font-semibold text-gray-800 transition text-left"
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Otro asesor</p>
              <input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <input
                value={customWa}
                onChange={(e) => setCustomWa(e.target.value)}
                type="tel"
                inputMode="tel"
                placeholder="Tu WhatsApp (opcional)"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                disabled={!customName.trim()}
                onClick={() => chooseAdvisor({ name: customName.trim(), whatsapp: customWa.trim() })}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold text-sm px-4 py-3 rounded-full transition"
              >
                Usar este nombre
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-2 bg-white rounded-2xl border border-gray-100 px-4 py-3 mb-3">
              <span className="text-sm text-gray-600 min-w-0 truncate">
                Asesor: <strong className="text-primary">{advisor.name}</strong>
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={showMyQr} className="text-xs font-semibold text-primary hover:underline">
                  Mi QR
                </button>
                <button type="button" onClick={() => setEditing(true)} className="text-xs font-semibold text-gray-500 hover:underline">
                  Cambiar
                </button>
              </div>
            </div>

            {status === "done" ? (
              <div className="bg-white rounded-3xl border border-accent/30 p-7 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: "30px" }}>person_add</span>
                </div>
                <p className="font-display font-black text-xl text-primary mb-1">¡Cliente agregado!</p>
                <p className="text-gray-500 text-sm mb-5">
                  Quedó en ZOCAM a nombre de <strong className="text-primary">{advisor.name}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-6 py-3 rounded-full transition"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
                  Agregar otro cliente
                </button>
              </div>
            ) : (
              <form
                data-zocam-form
                onSubmit={handleSubmit}
                key={status}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3"
                noValidate
              >
                {/* Asesor → ZOCAM lo asigna. origen=asesor lo distingue del cliente. */}
                <input name="asesor" type="hidden" value={advisor.name} readOnly />
                <input name="asesor_whatsapp" type="hidden" value={advisor.whatsapp} readOnly />
                <input name="origen" type="hidden" value="asesor" readOnly />

                <input
                  name="name" type="text" autoComplete="off" placeholder="Nombre del cliente *"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <input
                  name="telefono" type="tel" inputMode="tel" autoComplete="off" placeholder="WhatsApp del cliente *"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <input
                  name="email" type="email" autoComplete="off" placeholder="Correo (opcional)"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <select
                  name="negocio"
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  <option value="" disabled>Tipo de negocio…</option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <textarea
                  name="mensaje" rows={2} placeholder="Nota / qué busca (opcional)"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
                />
                {status === "error" && (
                  <p className="text-sm text-secondary font-medium">Completa nombre y WhatsApp del cliente.</p>
                )}
                <button
                  type="submit"
                  data-zocam-event="captura-rapida-asesor"
                  className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-6 py-4 rounded-full transition hover:scale-[1.01]"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>person_add</span>
                  Agregar a ZOCAM
                </button>
              </form>
            )}
          </>
        )}

        {/* Modal QR personal */}
        {qrOpen && (
          <div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setQrOpen(false)}
          >
            <div className="bg-white rounded-3xl p-7 max-w-xs w-full text-center" onClick={(e) => e.stopPropagation()}>
              <p className="font-display font-black text-xl text-primary mb-1">Tu QR personal</p>
              <p className="text-gray-500 text-sm mb-4">
                Guárdalo como foto. Al escanearlo, la captura ya queda a tu nombre.
              </p>
              {qrUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={qrUrl} alt="QR personal del asesor" width={240} height={240} className="mx-auto rounded-xl border border-gray-100" />
              ) : (
                <p className="text-gray-400 text-sm py-8">Generando…</p>
              )}
              <button type="button" onClick={() => setQrOpen(false)} className="mt-5 w-full text-gray-400 hover:text-gray-600 text-sm py-1">
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
