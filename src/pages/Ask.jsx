import AskBox from "../shared/AskBox.jsx";
export default function Ask() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold">Ask about me</h2>
      <p className="mt-2 text-slate-300">
        Use the chips or type a question. Answers are concise and include a source link.
      </p>
      <div className="mt-6"><AskBox /></div>
    </main>
  );
}
