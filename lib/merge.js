(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CardMerge = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const MAX = 300;
  const same = (a, b) => a.name === b.name && JSON.stringify(a.settings) === JSON.stringify(b.settings);
  let seq = 0;
  const newId = () => `${Date.now().toString(36)}-${(seq++).toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  // 구현됨: 새 id 추가(added) / 같은 id+같은 내용 건너뜀(skipped) / 같은 id+다른 내용 새 id(renamed).
  // TODO(AI B): 합계 MAX(300) 초과 시 Error('템플릿은 최대 300개까지 저장할 수 있습니다.') — C07
  // TODO(AI B): index.html의 jsonFile change 핸들러가 단순 [...getTemplates(),...clean]으로 합치므로 mergeTemplates로 교체하고 상태 메시지에 added/skipped/renamed 표시
  function mergeTemplates(existing, incoming) {
    const merged = existing.map(t => ({ ...t }));
    const byId = new Map(merged.map(t => [t.id, t]));
    let added = 0, skipped = 0, renamed = 0;
    for (const t of incoming) {
      const item = { ...t };
      if (!item.id) item.id = newId();
      else if (byId.has(item.id)) {
        if (same(byId.get(item.id), item)) { skipped++; continue; }
        item.id = newId(); renamed++;
        merged.push(item); byId.set(item.id, item); continue;
      }
      merged.push(item); byId.set(item.id, item); added++;
    }
    return { merged, added, skipped, renamed };
  }
  return { mergeTemplates, MAX };
});
