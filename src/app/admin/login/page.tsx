import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="font-display font-black text-2xl text-slate-900 mb-1">
          Fuller Machinery · Admin
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          Ingresa con tu correo autorizado.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
