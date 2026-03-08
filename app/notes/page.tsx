export default function NotesPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Notes</h1>

      <p className="mt-4 text-gray-600">
        Capture your ideas and learning notes.
      </p>

      <div className="mt-8 border rounded-lg p-6">
        <textarea
          placeholder="Write your notes here..."
          className="w-full h-40 border p-3 rounded"
        />
      </div>
    </main>
  );
}
