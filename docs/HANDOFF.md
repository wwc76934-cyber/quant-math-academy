# Agent Handoff 鈥?Quant Math Academy RC1

- 鏃ユ湡锛?026-11-10
- 褰撳墠鎻愪氦锛歚fcc1382 docs: final RC1 acceptance`
- 宸ヤ綔鍖猴細骞插噣锛沗main` 涓?`origin/main` 鍚屾
- 绔欑偣锛歨ttps://wwc76934-cyber.github.io/quant-math-academy/
- 浠撳簱锛歨ttps://github.com/wwc76934-cyber/quant-math-academy
- 浠ｇ爜璁稿彲锛歁IT锛涙暀鏉愭鏂?瑙ｇ瓟锛欰ll rights reserved锛坄CONTENT_NOTICE.md`锛?
## 1. 椤圭洰鏄粈涔?
鎶?1,964 椤典腑鏂囬噺鍖栨暟瀛︽暀鏉愬仛鎴愰潤鎬佸涔犵珯锛?
- 34 绔?/ 219 鑺傦紱889 鐜锛?98 涔犻+瑙ｆ瀽锛?- 2,504 涓悳绱㈡枃妗ｏ紱鐭ヨ瘑鍥捐氨 219 鑺傜偣銆?58 鍏堜慨銆?46 鐩稿叧銆? 鐜紱
- D/P 浜哄伐鏍囨敞锛歅0 124銆丳1 73銆丳2 21銆丳3 1锛?- 瀛︿範璺緞 A/B/C/D銆佺粌涔犮€侀敊棰樸€佸涔犮€佽繘搴︺€佺瑪璁般€佸鍏ュ鍑猴紱
- 鍏紡鏀惰棌銆佹悳绱㈢浉鍏?chips銆佷粖鏃ュ缓璁紱
- 鍏紑 GitHub Pages 宸蹭笂绾裤€?
## 2. 鎶€鏈爤

- Vite + React 18 + TypeScript + React Router 7
- 鏋勫缓鏈?`marked` + KaTeX 0.19.1锛涘鎴风涓嶈窇 Markdown/KaTeX
- 鏃犲悗绔紱localStorage `qma:store:v1`
- 璺敱绾?`React.lazy`锛涢灞?JS gzip 绾?75.3KB
- 娴嬭瘯锛歏itest + Testing Library锛汵ode 20+

## 3. 鐩綍

```
src/                 鏁欐潗 Markdown锛堝彧鏈夊唴瀹癸紝涓嶈鏀圭粨鏋勯€昏緫锛?content/
  metadata/          D/P/鍏堜慨/鐩稿叧/鍏紡浜哄伐鏍囨敞
  paths/paths.json   瀛︿範璺緞
  search/aliases.json
  generated/         鏋勫缓浜х墿锛坓itignore锛屼笉瑕佹墜鏀癸級
tools/content/       瑙ｆ瀽/娓叉煋/鎷嗗垎/鎼滅储/鍥?璺緞/鏍￠獙
web/                 React 鍓嶇
docs/                PRD/鏋舵瀯/璁捐/浠诲姟/楠屾敹
.github/workflows/   Pages 閮ㄧ讲
```

## 4. 鍐呭绠＄嚎锛堥噸瑕侊級

```bash
npm ci
npm run content:inventory    # src -> content/generated/book.json
npm run content:build        # 娓叉煋/鎷嗗垎绔犺妭/涔犻/纭椄闂?node tools/content/build-search-index.mjs
npm run content:graph
npm run content:paths
npm --prefix web ci
npm --prefix web run build
```

CI 蹇呴』鎸変笂闈㈤『搴忚窇锛涘皯 `inventory` 浼氬洜缂?book.json 澶辫触锛屽皯 search/graph/paths 浼氬鑷?`/search`銆乣/graph`銆乣/paths` 绾夸笂 404/鐧藉睆銆?`content/generated/` 涓?`web/public/content/` 鏄骇鐗╋紝涓嶈鎵嬫敼銆?
## 5. 鍓嶇璺敱

`/`, `/syllabus`, `/learn/:chapterId`, `/search`, `/graph`, `/paths`, `/paths/:mode`, `/practice`, `/practice/:chapterId`, `/practice/wrong`, `/progress`, `/notes`, `/bookmarks`銆?
`/bookmarks`銆乣/progress` 寤鸿鍗°€佹悳绱?related chips 鏄渶杩戞柊澧炪€?
## 6. 鏁版嵁妯″瀷

- `StoreV1`锛歴ettings / progress / lastLocation / exercises / review / notes / bookmarks / path / activity銆?- 杩涘害鐘舵€侊細`empty | learn | done | master | review`銆?- 閿欓/澶嶄範锛歚ExerciseRecord`銆乣ReviewRecord`锛涢敊棰?+1 澶╋紝閲嶇粌绛斿 1/3/7 澶╋紝3 娆℃垨鏍囪鎺屾彙绉诲嚭銆?- `bookmarks.formulaMeta`锛歚{id,latex,tag,chapterId,sectionId,bookmarkedAt}`銆?- 瀵煎嚭/瀵煎叆鍖呭惈鍏ㄩ儴 store锛涘鍏ュ墠鏍￠獙 schema銆?- 鏁版嵁鍙湪鏈満锛屾棤璐﹀彿/鍚庣/閬ユ祴銆?
## 7. 娴嬭瘯涓庤川閲?
```bash
npm run test:content          # 58
npm --prefix web run test     # 123
npm --prefix web run build    # 0 error
npm audit --omit=dev          # 0 vulnerabilities锛堟牴/Web锛?```

- 鍐呭鏍￠獙锛? error锛? 涓?>1MB 鍗曡妭 warning锛?- 4 涓秴闀胯妭锛歝08-s3銆乧22-s1銆乧14-s2銆乧30-s1锛?- T23锛?脳 CPU/1.6Mbps 涓?FCP 0.88鈥?.87s锛?1 璺敱 脳 1440/390 DOM 妫€鏌ラ€氳繃锛?- 鎵撳嵃 PDF 47 椤?smoke銆?
## 8. 閮ㄧ讲

- GitHub Actions `.github/workflows/deploy.yml`锛?  inventory 鈫?build 鈫?search 鈫?graph 鈫?paths 鈫?web build 鈫?404 copy 鈫?upload 鈫?deploy銆?- `BASE_URL=/${{ github.event.repository.name }}/`锛岀珯鐐瑰瓙璺緞 `/quant-math-academy/`銆?- Pages Source = GitHub Actions锛涘凡鍚敤銆?- 娣遍摼鐢?`404.html`锛坕ndex 鍓湰锛塮allback锛汬TTP 鐘舵€佷粛涓?404锛屼絾娴忚鍣ㄦ覆鏌撴甯搞€?- 鏈満鍑瘉涓嶅緱鍐欏叆浠撳簱/鑱婂ぉ銆?
## 9. 鏈€杩戝彉鏇达紙閬垮厤閲嶅/鍐茬獊锛?
- T14b/T14c锛氬叕寮忔敹钘?store + Reader 鏄熸爣 + `/bookmarks`锛?- T20锛氭悳绱㈢粨鏋滅浉鍏?chips锛堟渶澶?2锛夛紱
- T22锛歚/progress` 浠婃棩寤鸿鍗★紱
- T23锛氫綆绔?DOM/鎵撳嵃澶嶆锛?- 娴嬭瘯浠?110 鈫?123锛?- 淇 Pages CI锛氳ˉ inventory/search/graph/paths銆乣/paths` main landmark銆?
## 10. 宸茬煡 backlog锛堝彲閫夛紝涓嶉樆濉烇級

- 10鈥?5 涓瘉鏄庣殑鍒嗘鎺ㄥ锛?- 8 涓彲瑙嗗寲锛?- 鐪熷疄浣庣鎵嬫満 / NVDA/VoiceOver / axe 鍏ㄩ噺锛?- 鎵撳嵃閫愰〉鏍稿锛?- P2/P3 浠?10% 缁х画缁嗗寲锛?- 1,964 椤甸€愬瓧鏍″嫎銆?
## 11. 涓嶈鍋?
- 涓嶈鏀?`CONTENT_NOTICE.md` 鎺堟潈鑼冨洿锛岄櫎闈炵敤鎴锋槑纭巿鏉冿紱
- 涓嶈鎶?`src/` 鍐呭鎹㈡垚绗笁鏂规暀鏉愭枃鏈紱
- 涓嶈鎵嬫敼 `content/generated/` 鎴?`web/public/content/`锛?- 涓嶈鍙戝竷/鏀?Pages 璁剧疆/鍔犲瘑閽ワ紝闄ら潪鐢ㄦ埛鏄庣‘瑕佹眰锛?- 涓嶈鍒犻櫎 `content/inventory` 鎴?CI 鐨?search/graph/paths 姝ラ銆?
## 12. 鎺ユ墜鍏堝仛

```bash
git status
npm run test:content
npm --prefix web run test
npm --prefix web run build
```

鍐嶆墦寮€绾夸笂 `/`銆乣/paths`銆乣/graph`銆乣/search?q=鍛介`銆乣/learn/c11#c11-s4`銆乣/bookmarks`銆乣/progress` 纭鍩虹嚎銆?
