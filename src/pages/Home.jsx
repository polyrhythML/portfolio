import RecentBlogPosts from '../components/RecentBlogPosts';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <main className="max-w-none mx-auto px-4 py-16">
        <section className="grid justify-center pt-3 pb-12">
          <div className="flex justify-center max-w-7xl mx-auto">
            <div id="hero-bubble" className="relative w-full mx-auto text-center rounded-3xl p-6 md:p-8 ring-1 ring-white/20 backdrop-blur-xl shadow-[0_0_70px_rgba(82,246,197,0.22)] after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:pointer-events-none after:shadow-[0_0_140px_rgba(82,246,197,0.26)] overflow-hidden backdrop-blur-2xl backdrop-saturate-150 z-10 max-w-[820px] md:max-w-[980px] lg:max-w-[1120px] poppins bg-black/10">
              <img src="/avatar.png" className="mx-auto mb-6 w-36 h-36 md:w-36 md:h-36 rounded-full object-cover ring-1 ring-white/15 shadow-lg" alt="Avatar" />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Hello, I'm <span className="text-emerald-300">Amit Singh Bhatti</span>
              </h1>
              <p className="mx-auto max-w-[1200px] lg:max-w-[1240px] text-[16px] md:text-[17px] lg:text-[14px] md:text-[15px] lg:text-[16px] tracking-[0.005em] leading-7 md:leading-7 lg:leading-7">
                A Minimalist Bayesian Sapien contributing to the universe's entropy, being an AI researcher building efficient, sustainable intelligence optimizing models via pruning, distillation, quantization, and routing to deliver lighter and faster systems. I also apply Quantum ML to combinatorial optimization, turning vast search spaces into practical results. My work spans RL, test time compute, Agentic Intelligence Optimization, and reasoning systems.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a href="https://bayesiansapien.substack.com/subscribe" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition" aria-label="Subscribe by Email on Substack">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="0" y="0" width="24" height="24" rx="3" fill="#FF6719"></rect>
                    <rect x="4" y="6" width="16" height="2" fill="white"></rect>
                    <rect x="4" y="10" width="16" height="2" fill="white"></rect>
                    <rect x="8" y="14" width="8" height="6" fill="white"></rect>
                  </svg>
                  <span>Subscribe by Email</span>
                </a>
                <a href="https://bayesiansapien.substack.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition" aria-label="RSS Feed">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 11a9 9 0 0 1 9 9"></path>
                    <path d="M4 4a16 16 0 0 1 16 16"></path>
                    <circle cx="5" cy="19" r="1"></circle>
                  </svg>
                  <span>RSS Feed</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <RecentBlogPosts />
      </main>
      <Footer />
    </>
  );
}