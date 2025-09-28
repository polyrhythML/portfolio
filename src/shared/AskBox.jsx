import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

export default function AskBox() {
  const [qna, setQna] = useState([]);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(null);

  useEffect(() => { fetch("/qna.json").then(r => r.json()).then(setQna); }, []);
  const fuse = useMemo(() => new Fuse(qna, { includeScore: true, keys: ["q","tags"], threshold: 0.4 }), [qna]);

  const chips = qna.slice(0, 6);

  const ask = (q) => {
    const query = (q || input).trim();
    if (!query) return;
    const res = fuse.search(query);
    if (res.length === 0) { setAnswer({ a: "I couldn’t find a match. Try a chip above.", links: [] }); return; }
    setAnswer(res[0].item);
  };

  return (
    <div className="rounded-2xl p-5 bg-white/5">
      <div className="flex flex-wrap gap-2 mb-4">
        {chips.map(c => (
          <button key={c.id} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-sm" onClick={() => ask(c.q)}>
            {c.q}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl bg-white/10 px-4 py-3 outline-none"
          placeholder="e.g., What’s your academic background?"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=> e.key === "Enter" && ask()}
          maxLength={200}
        />
        <button onClick={()=>ask()} className="px-4 py-3 rounded-xl bg-cyan-400/20 hover:bg-cyan-400/30">Ask</button>
      </div>

      {answer && (
        <div className="mt-6 rounded-xl bg-white/5 p-4">
          <p className="leading-relaxed">{answer.a}</p>
          {answer.links?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {answer.links.map((l,i)=>(
                <a key={i} className="text-cyan-300 underline" href={l.href} target="_blank" rel="noreferrer">
                  {l.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
