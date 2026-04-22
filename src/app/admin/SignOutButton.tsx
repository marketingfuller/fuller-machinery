"use client";

import { signOut } from "./actions";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg px-4 py-2 bg-white hover:bg-slate-50 transition-colors"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
