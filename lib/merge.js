(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CardMerge = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const MAX = 300;
  const same = (a, b) => a.name === b.name && JSON.stringify(a.settings) === JSON.stringify(b.settings);
  let seq = 0;
  const newId = () => `${Date.now().toString(36)}-${(seq++).toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  // TODO(AI B): 중복 id 처리(skipped/renamed)와 300개 상한 오류가 아직 없음. docs/LIMITS.md 참고.
  function mergeTemplates(existing, incoming) {
    const merged = existing.map(t => ({ ...t }));
    let added = 0;
    for (const t of incoming) {
      const item = { ...t };
      if (!item.id) item.id = newId();
      merged.push(item); added++;
    }
    return { merged, added, skipped: 0, renamed: 0 };
  }
  return { mergeTemplates, MAX };
});
