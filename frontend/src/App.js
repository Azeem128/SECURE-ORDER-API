function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white">
      <div className="p-16 bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl text-center max-w-4xl mx-4">
        <h1 className="text-8xl font-extrabold mb-8 tracking-tight">
          VITE + TAILWIND WORKS!
        </h1>
        <p className="text-4xl font-light">
          Beautiful gradient, blur, shadow visible
        </p>
        <p className="mt-10 text-2xl opacity-90">
          No more PostCSS errors — ready for real UI
        </p>
      </div>
    </div>
  );
}

export default App;