// Remove any element that looks like an "Ask me" control.
(function(){
  function kill(node){
    if(!node) return;
    const txt = (node.textContent||"").trim().toLowerCase();
    const aria = (node.getAttribute && (node.getAttribute("aria-label")||"")).toLowerCase();
    const title = (node.getAttribute && (node.getAttribute("title")||"")).toLowerCase();
    const href = (node.getAttribute && (node.getAttribute("href")||"")).toLowerCase();
    if (
      txt === "ask me" || txt.includes("ask me") ||
      aria.includes("ask me") || title.includes("ask me") ||
      (href && (href.includes("/ask") || href.endsWith("#ask")))
    ) {
      node.remove();
      return true;
    }
    return false;
  }
  function sweep(){
    const candidates = Array.from(document.querySelectorAll("a,button,[aria-label],*[title]"));
    for(const el of candidates){
      if (kill(el)) continue;
      // try nearest clickable ancestor if the text is nested
      const clickable = el.closest("a,button,[role='button']");
      if (clickable) kill(clickable);
    }
  }
  const mo = new MutationObserver(sweep);
  window.addEventListener("DOMContentLoaded", sweep);
  window.addEventListener("load", sweep);
  mo.observe(document.documentElement, { childList:true, subtree:true });
})();