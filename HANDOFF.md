# T05 인수인계 (AI A → AI B)

## 1. 목표
짤·카드 스튜디오(`index.html`, 단일 파일 캔버스 앱)의 **JSON 백업 복원 시 중복 템플릿 처리**를 완성한다.
- 같은 id + 같은 내용 → 건너뜀(skipped)
- 같은 id + 다른 내용 → 새 id로 둘 다 보존(renamed)
- 새 id → 추가(added)
- 합계 300개 초과 → 오류 `템플릿은 최대 300개까지 저장할 수 있습니다.`

## 2. 현재 상태
- 브랜치 `t05-ai-a`, 시작 소스는 커밋 `c41c70155508b3152d2815de5066805d494c4599`(검사 0/10, 미구현).
- `lib/merge.js`의 `mergeTemplates`에 added/skipped/renamed 처리가 구현됨.
- **미구현**: ① 300개 상한 오류 ② `index.html` 복원 핸들러 연결.
- 기준 버전 ID: 이 문서를 포함한 `t05-ai-a`의 A 종료 커밋(전체 SHA는 제출 폼 인수인계문에 기재).

## 3. 실행 명령
```
git clone https://github.com/khkj03042005-bot/card-studio
cd card-studio && git checkout t05-ai-a
node tests/checks.js
```
요구 런타임: Node.js 14 이상(의존성 설치 없음, 환경 변수 없음, 작업 디렉터리는 저장소 루트).

## 4. 통과
C01 C02 C03 C04 C05 C06 C08 C09 C10 (9개)

## 5. 검사 (수정 금지: docs/LIMITS.md, tests/checks.js)
10개 검사는 시작 시점에 고정됨. 삭제·조건 완화·기대값 변경 금지. 현재 `node tests/checks.js` → 9/10.

## 6. 남은 문제
- **C07 실패**: 기존 300개 + 새 1개를 합치면 오류가 나야 하는데 오류가 안 남. `mergeTemplates`가 `merged.length > MAX`일 때 Error를 던져야 함(C06 경계 300은 통과해야 하고, C08처럼 skipped는 길이를 늘리지 않음).
- `index.html`의 `$('jsonFile')` change 핸들러(약 241~249행)가 `[...getTemplates(),...clean]`로 단순 병합 중. `lib/merge.js`를 `<script src>`로 불러와 `CardMerge.mergeTemplates`로 교체하고, 상태 메시지에 added/skipped/renamed 개수를 표시. 기존 300개 초과 검사는 mergeTemplates 오류에 맡길 것.

## 7. 다음 작업 · 변경 금지 범위
- 다음 작업: ①C07 해결 ②index.html 연결 ③`card-studio-backup.json`(중복 id 2개 포함)로 복원해 skipped 1개 표시 확인.
- 변경 금지: `tests/checks.js`, `docs/LIMITS.md`의 검사 표, 이미 통과한 C01~C06·C08~C10의 기대값.
- 상한: 시간 30분, 요청 15회(AI A와 동일).
