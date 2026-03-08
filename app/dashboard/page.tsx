export default function Dashboard() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">BrainBoard Dashboard</h1>

      <p className="mt-4 text-gray-600">
        Welcome to your productivity workspace.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Notes</h2>
          <p className="text-sm mt-2">Create and organize knowledge.</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <p className="text-sm mt-2">Track what you need to do.</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Progress</h2>
          <p className="text-sm mt-2">Monitor learning progress.</p>
        </div>
      </div>
    </main>
  );
}
