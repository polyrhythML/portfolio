import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

const footerContent = `export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto bg-[#0b1220] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-center mb-4">
          <div className="relative w-auto rounded-xl px-3 py-2 ring-1 ring-white/15 backdrop-blur-xl shadow-[0_0_30px_rgba(82,246,197,0.1)] overflow-hidden backdrop-blur-xl backdrop-saturate-150 bg-[#0b1220]">
            <div className="flex justify-center items-center gap-4">
              <a href="https://github.com/polyrhythML" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 bg-gray-200 hover:bg-gray-100 rounded-lg transition group" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="#000000" className="group-hover:fill-emerald-600 transition">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/amit-singh-bhatti-278b0a83/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 bg-gray-200 hover:bg-gray-100 rounded-lg transition group" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077B5" className="group-hover:fill-emerald-600 transition">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com/bayesiansapien" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 bg-gray-200 hover:bg-gray-100 rounded-lg transition group" title="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 300 271" fill="#000000" className="group-hover:fill-emerald-600 transition">
                  <path d="M236 0h46L181 115l118 156h-92.6l-72.5-94.8L59 271H13l107-123L0 0h94.9l65.5 86.6L236 0zm-16.1 243h25.5L80.4 26H53.2l166.7 217z"/>
                </svg>
              </a>
              <a href="https://medium.com/@amit02093" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 bg-gray-200 hover:bg-gray-100 rounded-lg transition group" title="Medium">
                <svg width="18" height="18" viewBox="0 0 1770 1000" fill="#000000" className="group-hover:fill-emerald-600 transition">
                  <circle cx="500" cy="500" r="500"/>
                  <ellipse ry="475" rx="250" cy="501" cx="1296"/>
                  <ellipse cx="1682" cy="502" rx="88" ry="424"/>
                </svg>
              </a>
              <a href="https://bayesiansapien.substack.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 bg-gray-200 hover:bg-gray-100 rounded-lg transition group" title="Substack">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="#FF6719" className="group-hover:fill-emerald-600 transition">
                  <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500">
          © 2013-{currentYear} Amit Singh Bhatti
        </div>
      </div>
    </footer>
  );
}`;

const recentBlogPostsContent = `import { useState, useEffect } from 'react';

const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Understanding and Implementing Qwen3 From Scratch",
    date: "Sep 6, 2025",
    excerpt: "Previously, I compared the most notable open-weight architectures of 2025 in The Big LLM Architecture Comparison.",
    link: "https://bayesiansapien.substack.com/"
  },
  {
    id: 2,
    title: "From GPT-2 to gpt-oss: Analyzing the Architectural Advances",
    date: "Aug 9, 2025",
    excerpt: "OpenAI just released their new open-weight LLMs this week: gpt-oss-120b and gpt-oss-20b.",
    link: "https://bayesiansapien.substack.com/"
  },
  {
    id: 3,
    title: "The Big LLM Architecture Comparison",
    date: "Jul 15, 2025",
    excerpt: "A comprehensive comparison of the most notable open-weight LLM architectures released in 2025.",
    link: "https://bayesiansapien.substack.com/"
  }
];

export default function RecentBlogPosts() {
  const [posts, setPosts] = useState(FALLBACK_POSTS);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const RSS_URL = 'https://bayesiansapien.substack.com/feed';
        const rss2jsonUrl = \`https://api.rss2json.com/v1/api.json?rss_url=\${encodeURIComponent(RSS_URL)}\`;
        
        const response = await fetch(rss2jsonUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const parsedPosts = data.items.slice(0, 3).map((item, index) => {
            const date = new Date(item.pubDate);
            const formattedDate = date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            });
            
            let thumbnail = null;
            if (item.thumbnail) {
              thumbnail = item.thumbnail;
            } else if (item.enclosure && item.enclosure.link) {
              thumbnail = item.enclosure.link;
            } else if (item.content || item.description) {
              const content = item.content || item.description;
              const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) {
                thumbnail = imgMatch[1];
              }
            }
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.description || '';
            const cleanDescription = tempDiv.textContent || tempDiv.innerText || '';
            const excerpt = cleanDescription.slice(0, 280) + (cleanDescription.length > 280 ? '...' : '');
            
            return {
              id: index + 1,
              title: item.title,
              link: item.link,
              date: formattedDate,
              excerpt: excerpt || 'Read more on Substack...',
              thumbnail: thumbnail
            };
          });
          
          setPosts(parsedPosts);
          setUsingFallback(false);
        } else {
          setUsingFallback(true);
        }
      } catch (err) {
        console.error('Error fetching RSS feed:', err);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, []);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-slate-100">
          Recent Notes and Blog Entries
        </h2>
        <div className="text-center text-slate-400 py-12">
          Loading posts...
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex justify-center mb-12">
        <div className="relative w-auto rounded-2xl px-6 py-3 ring-1 ring-white/15 backdrop-blur-xl shadow-[0_0_30px_rgba(82,246,197,0.1)] overflow-hidden backdrop-blur-xl backdrop-saturate-150 bg-white/5">
          <h2 className="text-3xl font-bold text-center text-slate-100">
            Recent Notes and Blog Entries
          </h2>
        </div>
      </div>
      
      <p className="text-center text-slate-300 mb-12">
        See <a 
          href="https://bayesiansapien.substack.com/" 
          className="text-emerald-400 hover:text-emerald-300 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog and Notes Archive
        </a> for all entries.
        {usingFallback && <span className="text-xs text-slate-500 ml-2">(Showing recent posts)</span>}
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article 
            key={post.id}
            style={{
              backgroundColor: 'rgba(11, 18, 32, 0.01)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              position: 'relative',
              zIndex: 10,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 3px rgba(82, 246, 197, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            className="flex flex-col md:flex-row gap-6 p-6 rounded-xl transition-all duration-300 border-[3px] border-emerald-400/50 hover:border-emerald-400/70 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_4px_rgba(82,246,197,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(11, 18, 32, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(11, 18, 32, 0.01)';
            }}
          >
            <div className="md:w-48 md:flex-shrink-0">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-emerald-500/20 to-blue-500/20">
                {post.thumbnail ? (
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {post.title}
                </a>
              </h3>
              
              <time className="text-sm text-slate-400 mb-3 block">
                {post.date}
              </time>
              
              <p className="text-slate-300 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}`;

async function main() {
  try {
    log('\n🚀 Updating blog posts and footer...', 'blue');
    
    const componentsDir = path.join(__dirname, 'src', 'components');
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }
    
    // Update RecentBlogPosts
    const blogPostsPath = path.join(componentsDir, 'RecentBlogPosts.jsx');
    if (fs.existsSync(blogPostsPath)) {
      fs.copyFileSync(blogPostsPath, blogPostsPath + '.backup');
      log('✓ Created backup for RecentBlogPosts', 'yellow');
    }
    fs.writeFileSync(blogPostsPath, recentBlogPostsContent);
    log('✓ Updated src/components/RecentBlogPosts.jsx', 'green');
    
    // Update Footer
    const footerPath = path.join(componentsDir, 'Footer.jsx');
    if (fs.existsSync(footerPath)) {
      fs.copyFileSync(footerPath, footerPath + '.backup');
      log('✓ Created backup for Footer', 'yellow');
    }
    fs.writeFileSync(footerPath, footerContent);
    log('✓ Updated src/components/Footer.jsx', 'green');
    
    log('\n✅ Patch applied!', 'green');
    log('\n📝 Changes:', 'blue');
    log('  • Blog cards: 0.05% opacity with thick emerald borders and 3D pop effect', 'yellow');
    log('  • Footer bubble: 95% opaque (much more solid)', 'yellow');
    log('  • "Recent Notes" heading in grey bubble', 'yellow');
    
    log('\n⚠️  Hard refresh browser!', 'red');
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();
