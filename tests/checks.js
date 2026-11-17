// 실행: node tests/checks.js  (종료코드 0 = 10/10 통과)
const { mergeTemplates } = require('../lib/merge.js');
const T = (id, name = 'n', v = 1) => ({ id, name, settings: { v }, savedAt: '' });
const many = n => Array.from({ length: n }, (_, i) => T('e' + i));
const throwsMax = fn => { try { fn(); return false; } catch (e) { return /최대 300개/.test(e.message); } };
const checks = [
  ['C01', () => { const r = mergeTemplates([], [T('a')]); return r.added === 1 && r.merged.length === 1; }],
  ['C02', () => { const r = mergeTemplates([T('a')], [T('a')]); return r.skipped === 1 && r.merged.length === 1; }],
  ['C03', () => { const r = mergeTemplates([T('a')], [T('a', 'n', 2)]); return r.renamed === 1 && r.merged.length === 2 && r.merged[0].id !== r.merged[1].id; }],
  ['C04', () => { const r = mergeTemplates([], [T('a'), T('a')]); return r.added === 1 && r.skipped === 1 && r.merged.length === 1; }],
  ['C05', () => { const r = mergeTemplates([], []); return r.added + r.skipped + r.renamed === 0 && r.merged.length === 0; }],
  ['C06', () => mergeTemplates(many(299), [T('x')]).merged.length === 300],
  ['C07', () => throwsMax(() => mergeTemplates(many(300), [T('x')]))],
  ['C08', () => { const r = mergeTemplates(many(300), [T('e0')]); return r.skipped === 1 && r.merged.length === 300; }],
  ['C09', () => { const r = mergeTemplates([], [{ name: 'n', settings: {} }]); return r.added === 1 && !!r.merged[0].id; }],
  ['C10', () => { const e = [T('a')]; const snap = JSON.stringify(e); mergeTemplates(e, [T('a', 'n', 2), T('b')]); return JSON.stringify(e) === snap; }],
];
let pass = 0;
for (const [id, fn] of checks) { let ok = false; try { ok = fn(); } catch {} console.log(`${ok ? 'PASS' : 'FAIL'} ${id}`); if (ok) pass++; }
console.log(`${pass}/${checks.length} 통과`);
process.exit(pass === checks.length ? 0 : 1);
