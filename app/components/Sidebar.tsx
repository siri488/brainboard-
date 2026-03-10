import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen border-r p-6">
      <h2 className="text-xl font-bold mb-8">BrainBoard</h2>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>

        <Link href="/notes">Notes</Link>

        <Link href="/tasks">Tasks</Link>

        <Link href="/progress">Progress</Link>
      </nav>
    </div>
  );
}
