const searchInput = document.querySelector("#guide-search");
const cards = [...document.querySelectorAll(".guide-card")];
const emptyState = document.querySelector("#empty-state");
const expandButton = document.querySelector("#expand-all");
const toast = document.querySelector("#toast");
const languageButtons = [...document.querySelectorAll("[data-lang]")];

const ui = {
  ko: {
    title: "숙소 이용 안내 | 공개용",
    searchPlaceholder: "필요한 내용을 검색하세요",
    expand: "전체 펼치기",
    collapse: "전체 접기",
    copied: "비밀번호를 복사했습니다.",
    empty: "검색 결과가 없습니다.",
    ariaLanguage: "언어 선택",
    homeAria: "숙소 이용 안내 처음으로",
  },
  en: {
    title: "Guest Guide | Public",
    searchPlaceholder: "Search this guide",
    expand: "Expand all",
    collapse: "Collapse all",
    copied: "Password copied.",
    empty: "No results found.",
    ariaLanguage: "Language selection",
    homeAria: "Back to the guest guide top",
  },
  zh: {
    title: "住宿指南 | 公开版",
    searchPlaceholder: "搜索需要的信息",
    expand: "全部展开",
    collapse: "全部收起",
    copied: "密码已复制。",
    empty: "没有搜索结果。",
    ariaLanguage: "语言选择",
    homeAria: "返回住宿指南顶部",
  },
  ja: {
    title: "宿泊ガイド | 公開版",
    searchPlaceholder: "必要な内容を検索",
    expand: "すべて開く",
    collapse: "すべて閉じる",
    copied: "パスワードをコピーしました。",
    empty: "検索結果がありません。",
    ariaLanguage: "言語選択",
    homeAria: "宿泊ガイドの先頭へ",
  },
};

const translations = {
  "숙소 이용 안내": {
    en: "Guest Guide",
    zh: "住宿指南",
    ja: "宿泊ガイド",
  },
  "강풀만화거리 근처의 따뜻한 하루": {
    en: "A warm stay near Kang Full Cartoon Street",
    zh: "在姜草漫画街附近度过温暖的一天",
    ja: "カンプル漫画通り近くで過ごす、あたたかな一日",
  },
  "Guest Guide · Welcome": {
    en: "Guest Guide · Welcome",
    zh: "住宿指南 · 欢迎",
    ja: "宿泊ガイド · ようこそ",
  },
  "편안한 머무름을 위한 숙소 안내": {
    en: "A Helpful Guide for a Comfortable Stay",
    zh: "让您舒适入住的住宿指南",
    ja: "快適にお過ごしいただくための宿泊ガイド",
  },
  "체크인부터 주변 산책 코스까지, 필요한 순간에 살짝 열어보는 작은 안내서예요.": {
    en: "A small guide to open whenever you need it, from check-in to nearby walks.",
    zh: "从入住到周边散步路线，需要时随时查看的小指南。",
    ja: "チェックインから近くのお散歩先まで、必要な時にそっと開ける小さなガイドです。",
  },
  "비상": {
    en: "Emergency",
    zh: "紧急",
    ja: "緊急",
  },
  "쓰레기": {
    en: "Trash",
    zh: "垃圾",
    ja: "ごみ",
  },
  "주변": {
    en: "Nearby",
    zh: "周边",
    ja: "周辺",
  },
  "🔑 체크인": {
    en: "🔑 Check-in",
    zh: "🔑 入住",
    ja: "🔑 チェックイン",
  },
  "도어락 비밀번호는 체크인 1시간 전에 전송됩니다.": {
    en: "The door lock code will be sent 1 hour before check-in.",
    zh: "门锁密码将在入住前1小时发送。",
    ja: "ドアロックの暗証番号はチェックイン1時間前にお送りします。",
  },
  "🚗 주차": {
    en: "🚗 Parking",
    zh: "🚗 停车",
    ja: "🚗 駐車",
  },
  "건물 주차장 1대 가능, 1분 거리에 공영주차장이 있습니다.": {
    en: "One car can park in the building lot. A public parking lot is also 1 minute away.",
    zh: "楼内停车场可停1辆车，步行1分钟处也有公共停车场。",
    ja: "建物の駐車場に1台駐車できます。徒歩1分の場所に公共駐車場もあります。",
  },
  "🛁 온수": {
    en: "🛁 Hot Water",
    zh: "🛁 热水",
    ja: "🛁 お湯",
  },
  "보일러를 켜면 보통 2분 안에 온수가 나옵니다.": {
    en: "After turning on the boiler, hot water usually comes out within 2 minutes.",
    zh: "打开锅炉后，通常2分钟内会出热水。",
    ja: "ボイラーをつけると、通常2分以内にお湯が出ます。",
  },
  "🔑 입·퇴실": {
    en: "🔑 Check-in & Check-out",
    zh: "🔑 入住与退房",
    ja: "🔑 チェックイン・チェックアウト",
  },
  "도어락 사용법": {
    en: "Door Lock",
    zh: "门锁使用方法",
    ja: "ドアロックの使い方",
  },
  "체크인 1시간 전 비밀번호를 전송해드립니다.": {
    en: "The password will be sent 1 hour before check-in.",
    zh: "入住前1小时会发送密码。",
    ja: "チェックイン1時間前に暗証番号をお送りします。",
  },
  "주차 안내": {
    en: "Parking",
    zh: "停车说明",
    ja: "駐車案内",
  },
  "건물 주차장에 1대 주차가 가능합니다. 주차장 앞 도로에도 주차가 유연한 편이며, 1분 거리에 공영주차장도 있습니다.": {
    en: "One car can park in the building parking lot. Street parking near the lot is often flexible, and a public parking lot is 1 minute away.",
    zh: "楼内停车场可停1辆车。停车场前方道路停车也相对灵活，步行1分钟处还有公共停车场。",
    ja: "建物の駐車場に1台駐車できます。駐車場前の道路も比較的停めやすく、徒歩1分の場所に公共駐車場もあります。",
  },
  "짐 보관": {
    en: "Luggage Storage",
    zh: "行李寄存",
    ja: "荷物預かり",
  },
  "기본적으로 제공하지 않습니다.": {
    en: "This is generally not provided.",
    zh: "原则上不提供行李寄存。",
    ja: "基本的には対応していません。",
  },
  "📶 기본 시설 사용법": {
    en: "📶 Basic Facilities",
    zh: "📶 基本设施使用方法",
    ja: "📶 基本設備の使い方",
  },
  "체크인 메시지를 확인해주세요": {
    en: "Please check your check-in message",
    zh: "请查看入住消息",
    ja: "チェックインメッセージをご確認ください",
  },
  "Wi-Fi 이름과 비밀번호는 체크인 메시지로 별도 안내드립니다. 공유기는 침실 2에 위치해있습니다.": {
    en: "The Wi-Fi name and password will be shared separately in your check-in message. The router is in Bedroom 2.",
    zh: "Wi-Fi名称和密码会在入住消息中另行告知。路由器位于卧室2。",
    ja: "Wi-Fi名とパスワードはチェックインメッセージで別途ご案内します。ルーターは寝室2にあります。",
  },
  "에어컨": {
    en: "Air Conditioner",
    zh: "空调",
    ja: "エアコン",
  },
  "침실1과 거실에 위치해 있으며, 리모콘으로 조작 가능합니다.": {
    en: "Air conditioners are located in Bedroom 1 and the living room, and can be operated with the remote controls.",
    zh: "空调位于卧室1和客厅，可使用遥控器操作。",
    ja: "寝室1とリビングにあり、リモコンで操作できます。",
  },
  "보일러": {
    en: "Boiler",
    zh: "锅炉",
    ja: "ボイラー",
  },
  "안방에 있는 중앙 조절 장치로 조작되며, 온수 사용시 필히 작동해야 합니다.": {
    en: "It is controlled by the central controller in the main bedroom. Please turn it on when using hot water.",
    zh: "通过主卧内的中央控制器操作。使用热水时请务必开启。",
    ja: "主寝室にある中央コントローラーで操作します。お湯を使う時は必ず作動させてください。",
  },
  "🛁 욕실": {
    en: "🛁 Bathroom",
    zh: "🛁 浴室",
    ja: "🛁 バスルーム",
  },
  "온수 나오는 데 걸리는 시간": {
    en: "How Long Hot Water Takes",
    zh: "热水需要多久",
    ja: "お湯が出るまでの時間",
  },
  "보일러를 켠 경우, 2분 안에 온수가 나옵니다. 온수가 나오지 않을 경우 보일러 작동 여부를 확인해주세요.": {
    en: "When the boiler is on, hot water should come out within 2 minutes. If it does not, please check whether the boiler is running.",
    zh: "锅炉开启后，2分钟内会出热水。如果没有热水，请确认锅炉是否已开启。",
    ja: "ボイラーをつけている場合、2分以内にお湯が出ます。出ない場合はボイラーが作動しているかご確認ください。",
  },
  "욕실 환풍기": {
    en: "Bathroom Fan",
    zh: "浴室换气扇",
    ja: "浴室換気扇",
  },
  "욕실 스위치를 켜면 자동으로 작동됩니다. 다만 습도 조절을 위해 창문을 활용하기를 추천드립니다.": {
    en: "It turns on automatically with the bathroom switch. Opening the window is also recommended to control humidity.",
    zh: "打开浴室开关后会自动运行。为调节湿度，也建议适当开窗。",
    ja: "浴室のスイッチを入れると自動で作動します。湿度調整のため、窓もご活用ください。",
  },
  "세면대 냉온수 안내": {
    en: "Sink Hot/Cold Water Note",
    zh: "洗手池冷热水说明",
    ja: "洗面台の冷温水について",
  },
  "세면대 수전의 냉수와 온수 방향이 일반적인 표시와 반대로 연결되어 있습니다. 물 온도를 천천히 확인하면서 사용해주세요.": {
    en: "The hot and cold directions on the sink faucet are connected opposite to the usual labels. Please check the water temperature slowly before use.",
    zh: "洗手池水龙头的冷水和热水方向与一般标识相反。使用时请慢慢确认水温。",
    ja: "洗面台の水栓は、冷水と温水の向きが通常の表示と逆につながっています。水温をゆっくり確認しながらお使いください。",
  },
  "세면대 물빠짐 주의사항": {
    en: "Sink Drain Note",
    zh: "洗手池排水注意事项",
    ja: "洗面台の排水について",
  },
  "휴지 외 이물질을 세면대, 하수구와 변기에 넣지 않도록 유의해주세요. 물티슈와 음식물은 넣지 말아주세요.": {
    en: "Please do not put anything other than toilet paper into the sink, drains, or toilet. Wet wipes and food waste should not be flushed or drained.",
    zh: "请不要将纸巾以外的异物放入洗手池、下水口或马桶。请勿投入湿纸巾和食物。",
    ja: "トイレットペーパー以外の異物を洗面台、排水口、トイレに流さないでください。ウェットティッシュや食べ物は入れないでください。",
  },
  "🍽️ 주방": {
    en: "🍽️ Kitchen",
    zh: "🍽️ 厨房",
    ja: "🍽️ キッチン",
  },
  "식기·조리도구": {
    en: "Dishes & Cookware",
    zh: "餐具与厨具",
    ja: "食器・調理器具",
  },
  "주방 싱크대 가운데 하부장 각 서랍에 수저, 그릇, 조리도구가 들어 있습니다. 각 서랍에 이름이 붙어 있습니다. 접시 및 와인잔, 컵 등은 상부장에 진열되어 있습니다.": {
    en: "Cutlery, bowls, and cooking tools are in the drawers of the lower cabinet under the middle of the kitchen sink. Each drawer is labeled. Plates, wine glasses, and cups are in the upper cabinets.",
    zh: "餐具、碗和厨具放在厨房水槽中间下柜的各个抽屉里。每个抽屉都有标签。盘子、酒杯和杯子等放在上柜。",
    ja: "スプーン、箸、器、調理器具はキッチンシンク中央下の収納引き出しに入っています。各引き出しに名前が貼ってあります。お皿、ワイングラス、カップなどは上部収納にあります。",
  },
  "냉장고": {
    en: "Refrigerator",
    zh: "冰箱",
    ja: "冷蔵庫",
  },
  "자유롭게 사용 가능합니다. 다만 음식물을 넣어 더러워지지 않도록 배려 부탁드립니다.": {
    en: "You may use it freely. Please be careful not to leave food spills or mess inside.",
    zh: "可自由使用。请注意不要因放入食物而弄脏冰箱。",
    ja: "自由にご利用いただけます。食べ物で汚れないようご配慮ください。",
  },
  "싱크대 옆 두 개의 쓰레기통에는 각각 일반쓰레기와 재활용쓰레기를 버리실 수 있습니다. 구분해서 버려주시면 체크아웃 후 분리배출하겠습니다.": {
    en: "The two bins next to the sink are for general waste and recyclables. If you separate them there, we will dispose of them after check-out.",
    zh: "水槽旁的两个垃圾桶分别用于一般垃圾和可回收垃圾。请分类投放，退房后我们会进行分类处理。",
    ja: "シンク横の2つのごみ箱は、一般ごみとリサイクルごみ用です。分けて捨てていただければ、チェックアウト後に分別して出します。",
  },
  "음식물 처리 주의사항": {
    en: "Food Waste Note",
    zh: "厨余垃圾注意事项",
    ja: "生ごみ処理について",
  },
  "싱크대 오른쪽 하부장에 밀폐가 가능한 음식물쓰레기통이 있습니다. 싱크대에 음식물을 흘려버려 배관이 막히지 않도록 유의 부탁드립니다.": {
    en: "There is a sealable food waste bin in the lower cabinet on the right side of the sink. Please do not wash food scraps down the sink, as this may clog the pipes.",
    zh: "水槽右侧下柜内有可密封的厨余垃圾桶。请不要将食物残渣倒入水槽，以免堵塞管道。",
    ja: "シンク右側の下部収納に密閉できる生ごみ用ごみ箱があります。配管詰まり防止のため、食べ物をシンクに流さないでください。",
  },
  "♻️ 분리수거 & 쓰레기": {
    en: "♻️ Recycling & Trash",
    zh: "♻️ 垃圾分类与处理",
    ja: "♻️ 分別・ごみ",
  },
  "분리수거 방법": {
    en: "How to Separate Trash",
    zh: "垃圾分类方法",
    ja: "分別方法",
  },
  "한국에서는 재활용이 가능한 종이, PET, 캔 등의 재활용쓰레기와 재활용이 불가능한 일반쓰레기, 음식물쓰레기로 구분하여 배출합니다.": {
    en: "In Korea, trash is separated into recyclables such as paper, PET bottles, and cans; general waste that cannot be recycled; and food waste.",
    zh: "在韩国，垃圾分为可回收垃圾（纸、PET瓶、易拉罐等）、不可回收的一般垃圾以及厨余垃圾。",
    ja: "韓国では、紙・PETボトル・缶などのリサイクルごみ、リサイクルできない一般ごみ、生ごみに分けて出します。",
  },
  "장박 손님 배출 안내": {
    en: "For Longer Stays",
    zh: "长住客人垃圾投放说明",
    ja: "長期滞在のお客様へ",
  },
  "직접 쓰레기 배출이 필요하신 경우 일반쓰레기와 음식물쓰레기를 배출하기 위한 종량제 봉투를 별도 문의해주세요. 재활용쓰레기와 종량제봉투에 담긴 일반쓰레기 및 음식물쓰레기는 1층 '담아내다덮밥' 옆 공간에 배출합니다.": {
    en: "If you need to take out trash during a longer stay, please ask separately for official bags for general and food waste. Recyclables and bagged general/food waste can be placed in the area next to 'Damanaeda Deopbap' on the 1st floor.",
    zh: "如长住期间需要自行丢垃圾，请另行咨询用于一般垃圾和厨余垃圾的专用垃圾袋。可回收垃圾以及装入专用袋的一般垃圾、厨余垃圾，请投放至1楼“담아내다덮밥”旁边区域。",
    ja: "長期滞在中にご自身でごみ出しが必要な場合は、一般ごみ・生ごみ用の指定ごみ袋について別途お問い合わせください。リサイクルごみと指定袋に入れた一般ごみ・生ごみは、1階「담아내다덮밥」横のスペースに出します。",
  },
  "🧯 비상·안전": {
    en: "🧯 Emergency & Safety",
    zh: "🧯 紧急与安全",
    ja: "🧯 緊急・安全",
  },
  "긴급 상황에서는 112(범죄신고), 119(응급구조) 또는 체크인 메시지로 별도 전달된 호스트 연락처로 연락해주세요.": {
    en: "In an emergency, please call 112 for police, 119 for emergency rescue, or the host contact shared separately in your check-in message.",
    zh: "紧急情况下，请拨打112报警、119急救，或联系入住消息中另行提供的房东联系方式。",
    ja: "緊急時は、犯罪通報は112、救急は119、またはチェックインメッセージで別途お伝えしたホスト連絡先へご連絡ください。",
  },
  "소화기": {
    en: "Fire Extinguisher",
    zh: "灭火器",
    ja: "消火器",
  },
  "입구 계단 아래에 위치해 있으며, 각 방과 거실에는 화재경보기가 설치되어 있습니다.": {
    en: "It is located under the entrance stairs. Fire alarms are installed in each room and the living room.",
    zh: "位于入口楼梯下方。各房间和客厅都安装有火灾警报器。",
    ja: "入口階段の下にあります。各部屋とリビングには火災報知器が設置されています。",
  },
  "누전차단기": {
    en: "Circuit Breaker",
    zh: "漏电断路器",
    ja: "漏電遮断器",
  },
  "신발장 옆 우드장 왼쪽 문을 열면 위쪽 칸 안쪽에 위치해 있습니다. 필요시에만 작동해주세요.": {
    en: "Open the left door of the wooden cabinet next to the shoe cabinet. It is inside the upper compartment. Please use it only when necessary.",
    zh: "打开鞋柜旁木柜的左侧门，位于上方隔层内。仅在必要时操作。",
    ja: "靴箱横の木製収納の左扉を開けると、上段の内側にあります。必要な時のみ操作してください。",
  },
  "가스 밸브 위치": {
    en: "Gas Valve",
    zh: "燃气阀位置",
    ja: "ガスバルブの位置",
  },
  "가스렌지 옆에 위치해 있습니다.": {
    en: "It is located next to the gas stove.",
    zh: "位于燃气灶旁边。",
    ja: "ガスコンロの横にあります。",
  },
  "복층 출입 금지": {
    en: "No Access to Loft/Rooftop",
    zh: "禁止进入阁楼与屋顶",
    ja: "ロフト・屋上立入禁止",
  },
  "복층 옥탑방 및 옥상은 현재 사용하지 않는 공간입니다. 안전을 위해 출입을 금하며, 계단 및 복층 이용으로 인한 사고는 숙소에서 책임지지 않습니다.": {
    en: "The loft rooftop room and rooftop are not in use. For safety, entry is prohibited. The accommodation is not responsible for accidents caused by using the stairs or loft area.",
    zh: "阁楼屋塔房及屋顶目前不开放使用。为安全起见禁止进入，因使用楼梯或阁楼造成的事故，住宿方不承担责任。",
    ja: "ロフト屋上部屋および屋上は現在使用していないスペースです。安全のため立入禁止です。階段およびロフト利用による事故について、宿泊施設では責任を負いかねます。",
  },
  "🧺 소모품 & 비품": {
    en: "🧺 Supplies & Amenities",
    zh: "🧺 消耗品与备品",
    ja: "🧺 消耗品・備品",
  },
  "수건 및 여분 화장지": {
    en: "Towels & Extra Toilet Paper",
    zh: "毛巾与备用卫生纸",
    ja: "タオル・予備トイレットペーパー",
  },
  "욕실 내 수건장에 비치되어 있습니다.": {
    en: "They are stored in the towel cabinet inside the bathroom.",
    zh: "放置在浴室内的毛巾柜中。",
    ja: "浴室内のタオル収納にあります。",
  },
  "부족할 때": {
    en: "If You Need More",
    zh: "不足时",
    ja: "不足している場合",
  },
  "필요한 물품이 부족할 경우 별도 문의해주세요.": {
    en: "If any supplies are running low, please contact us separately.",
    zh: "如有物品不足，请另行联系。",
    ja: "必要な物が足りない場合は、別途お問い合わせください。",
  },
  "🌙 생활 규칙": {
    en: "🌙 House Rules",
    zh: "🌙 住宿规则",
    ja: "🌙 ハウスルール",
  },
  "늦은 시간에는 이웃을 배려하여 소음을 자제해주세요.": {
    en: "Please keep noise down late at night out of consideration for neighbors.",
    zh: "夜间请顾及邻居，尽量避免噪音。",
    ja: "夜遅い時間は近隣の方への配慮として、騒音をお控えください。",
  },
  "객실 내 흡연은 절대 금지입니다.": {
    en: "Smoking is strictly prohibited inside the unit.",
    zh: "室内严禁吸烟。",
    ja: "室内での喫煙は絶対に禁止です。",
  },
  "반려동물은 동반하실 수 없습니다.": {
    en: "Pets are not allowed.",
    zh: "不可携带宠物。",
    ja: "ペットの同伴はできません。",
  },
  "☕ 주변 편의시설": {
    en: "☕ Nearby Conveniences",
    zh: "☕ 周边便利设施",
    ja: "☕ 周辺施設",
  },
  "성내전통시장": {
    en: "Seongnae Traditional Market",
    zh: "城内传统市场",
    ja: "城内伝統市場",
  },
  "도보 1분": {
    en: "1 minute on foot",
    zh: "步行1分钟",
    ja: "徒歩1分",
  },
  "도보 3분, 서울 강동구 천호옛12길 55": {
    en: "3 minutes on foot, 55 Cheonho-yet 12-gil, Gangdong-gu, Seoul",
    zh: "步行3分钟，首尔江东区千户옛12街55",
    ja: "徒歩3分、ソウル江東区千戸イェッ12ギル55",
  },
  "이마트 천호점": {
    en: "emart Cheonho Branch",
    zh: "易买得千户店",
    ja: "emart 千戸店",
  },
  "도보 10분, 천호역 5번출구": {
    en: "10 minutes on foot, Cheonho Station Exit 5",
    zh: "步行10分钟，千户站5号出口",
    ja: "徒歩10分、千戸駅5番出口",
  },
  "스타약국": {
    en: "Star Pharmacy",
    zh: "Star药局",
    ja: "スター薬局",
  },
  "일요일 영업 약국, 02-470-7904": {
    en: "Open on Sundays, 02-470-7904",
    zh: "周日营业药局，02-470-7904",
    ja: "日曜営業の薬局、02-470-7904",
  },
  "근처 맛집·카페": {
    en: "Nearby Restaurants & Cafes",
    zh: "附近餐厅与咖啡馆",
    ja: "近くの飲食店・カフェ",
  },
  "같은 건물 1층, 김치찌개": {
    en: "1st floor of the same building, kimchi stew",
    zh: "同一栋楼1层，泡菜锅",
    ja: "同じ建物の1階、キムチチゲ",
  },
  "같은 건물 1층, 덮밥": {
    en: "1st floor of the same building, rice bowls",
    zh: "同一栋楼1层，盖饭",
    ja: "同じ建物の1階、丼もの",
  },
  "아이들이나 어르신들도 편안하게 즐길 수 있는 맑은 곰탕집입니다. 홀이 좁은 편이라 여러 명이 함께 가실 때는 예약을 추천드려요. 0507-1359-8617": {
    en: "A clear gomtang soup place that children and older guests can enjoy comfortably. The dining area is small, so a reservation is recommended for larger groups. 0507-1359-8617",
    zh: "这是一家清爽的牛骨汤店，孩子和长辈也能轻松享用。店内座位较少，多人前往时建议预约。0507-1359-8617",
    ja: "お子さまやご年配の方も食べやすい、澄んだコムタンのお店です。店内はやや狭いので、人数が多い場合は予約をおすすめします。0507-1359-8617",
  },
  "숙소가 위치한 '강풀만화거리'답게 만화책을 천천히 즐길 수 있는 카페입니다. 산책하다가 잠깐 쉬어가기 좋아요.": {
    en: "A cafe where you can browse comic books, fitting for Kang Full Cartoon Street where the stay is located. It is a nice place to rest during a walk.",
    zh: "正如住宿所在的“姜草漫画街”一样，这是一家可以慢慢看漫画书的咖啡馆。散步途中小憩很合适。",
    ja: "宿のある「カンプル漫画通り」らしく、漫画本をゆっくり楽しめるカフェです。散歩の途中に少し休むのにぴったりです。",
  },
  "깔끔하게 매운 소스와 딱 알맞게 쪄진 떡의 조화가 참 좋은 곳입니다. 가능하다면 노란밥과 함께 드셔보시길 추천드려요.": {
    en: "A lovely balance of clean, spicy sauce and perfectly steamed rice cakes. If you can, try it together with the yellow rice.",
    zh: "干净利落的辣酱和蒸得恰到好处的年糕搭配得很好。如果可以，推荐搭配黄饭一起吃。",
    ja: "すっきり辛いソースと、ちょうどよく蒸されたお餅の相性がとても良いお店です。できれば黄色いご飯と一緒に召し上がってみてください。",
  },
  "트렌디한 도넛을 다양하게 즐길 수 있는 곳입니다. 쫄깃한 식감보다는 포실하고 부드러운 스타일을 좋아하신다면 잘 맞으실 거예요.": {
    en: "A place with a fun variety of trendy doughnuts. If you prefer a fluffy, soft style rather than a chewy texture, this should suit you well.",
    zh: "这里可以品尝多种时髦的甜甜圈。如果您喜欢松软绵密而不是有嚼劲的口感，应该会很合适。",
    ja: "トレンド感のあるドーナツをいろいろ楽しめるお店です。もちもちより、ふんわり柔らかい食感がお好きな方に合うと思います。",
  },
  "💬 호스트 연락 & 문제 해결": {
    en: "💬 Host Contact & Help",
    zh: "💬 房东联系与问题处理",
    ja: "💬 ホスト連絡・困った時",
  },
  "호스트 연락처는 체크인 메시지로 별도 전달드립니다.": {
    en: "The host contact will be shared separately in your check-in message.",
    zh: "房东联系方式会在入住消息中另行提供。",
    ja: "ホスト連絡先はチェックインメッセージで別途お伝えします。",
  },
  "비상 상황의 경우 별도 전달된 연락처로 전화주세요. 그 외 일상적인 문의는 오전 9시부터 오후 7시까지 에어비앤비 메시지 또는 문자로 보내주시면 가능한 빠르게 답신드리겠습니다.": {
    en: "In an emergency, please call the contact shared separately. For everyday questions, please send an Airbnb message or text between 9:00 AM and 7:00 PM, and we will reply as soon as possible.",
    zh: "如遇紧急情况，请拨打另行提供的联系方式。其他日常问题请在上午9点至晚上7点之间通过Airbnb消息或短信联系我们，我们会尽快回复。",
    ja: "緊急時は別途お伝えした連絡先へお電話ください。その他の日常的なお問い合わせは、午前9時から午後7時までにAirbnbメッセージまたはSMSでお送りいただければ、できるだけ早く返信します。",
  },
  "즐거운 시간 보내세요. 필요한 내용은 검색하거나 각 섹션을 펼쳐 확인하실 수 있습니다. ✨": {
    en: "We hope you have a lovely stay. You can search or open each section whenever you need something. ✨",
    zh: "祝您入住愉快。需要时可以搜索，或展开各个部分查看。✨",
    ja: "どうぞ楽しい時間をお過ごしください。必要な内容は検索したり、各セクションを開いて確認できます。✨",
  },
};

let toastTimer;
let currentLang = localStorage.getItem("guest-guide-lang") || "ko";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function normalise(text) {
  return text.toLowerCase().replace(/\s+/g, "");
}

function rememberOriginalText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const text = node.nodeValue.trim();
    if (text) node.parentElement.dataset.koText = text;
  });
}

function translateText(koText, lang) {
  if (lang === "ko") return koText;
  return translations[koText]?.[lang] || koText;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("guest-guide-lang", lang);
  document.documentElement.lang = lang;
  document.title = ui[lang].title;
  searchInput.placeholder = ui[lang].searchPlaceholder;
  emptyState.textContent = ui[lang].empty;
  document.querySelector(".language-switcher").setAttribute("aria-label", ui[lang].ariaLanguage);
  document.querySelector(".brand").setAttribute("aria-label", ui[lang].homeAria);

  document.querySelectorAll("[data-ko-text]").forEach((element) => {
    element.textContent = translateText(element.dataset.koText, lang);
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  });

  updateExpandButton();
  filterCards();
}

function updateExpandButton() {
  const hasClosed = cards.some((card) => !card.hidden && !card.open);
  expandButton.textContent = hasClosed ? ui[currentLang].expand : ui[currentLang].collapse;
}

function filterCards() {
  const query = normalise(searchInput.value);
  let visibleCount = 0;

  cards.forEach((card) => {
    const haystack = normalise(`${card.textContent} ${card.dataset.tags || ""}`);
    const isMatch = !query || haystack.includes(query);
    card.hidden = !isMatch;
    if (isMatch) {
      visibleCount += 1;
      if (query) card.open = true;
    }
  });

  emptyState.hidden = visibleCount > 0;
  updateExpandButton();
}

rememberOriginalText();
setLanguage(currentLang);

searchInput.addEventListener("input", filterCards);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

expandButton.addEventListener("click", () => {
  const hasClosed = cards.some((card) => !card.hidden && !card.open);
  cards.forEach((card) => {
    if (!card.hidden) card.open = hasClosed;
  });
  updateExpandButton();
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(ui[currentLang].copied);
    } catch {
      showToast(value);
    }
  });
});

document.querySelectorAll(".guide-card").forEach((card) => {
  card.addEventListener("toggle", updateExpandButton);
});
