(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CardMerge = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const MAX = 300;
  // 시작 시점 스켈레톤: 구현 없음. 구현은 AI A가 시작 기록 후 진행한다.
  function mergeTemplates(existing, incoming) {
    throw Error('not implemented');
  }
  return { mergeTemplates, MAX };
});
