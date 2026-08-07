/**
 * secret2.js - 시크릿 2 프로필 전용 커스텀 스크립트 및 데이터
 * 
 * 시크릿 2 프로필의 메인 테마, 프로젝트 목록, 취미 및 페이지 꾸미기 로직을 작성할 수 있습니다.
 */

window.secret2Data = {
    key: 'secret2',
    name: '김시은',
    avatarClass: 'avatar-secret2',
    emoji: '',
    rowProjectsTitle: '<i class="fa-solid fa-tv" style="color:#ab47bc;"></i> 김시은 님이 시청 중인 콘텐츠',
    rowHobbiesTitle: '<i class="fa-solid fa-music" style="color:#ab47bc;"></i> 김시은 님이 즐겨듣는 음악',
    rowInterestsTitle: '<i class="fa-solid fa-star" style="color:#ab47bc;"></i> 김시은 님이 관심있는 관심사',
    rowShowoffTitle: '<i class="fa-solid fa-heart" style="color:#ab47bc;"></i> 김시은 님이 자랑하고 싶은 콘텐츠',
    hero: {
        badge: '<i class="fa-solid fa-key" style="color:#ab47bc;"></i> SECRET 2 CINEMATIC SPACE',
        title: '시크릿 2:<br>시네마틱 라이브러리',
        desc: '감각적인 비주얼과 감성적인 멜로디가 공존하는 시크릿 2 전용 시네마 공간입니다.',
        bgYoutube: 'https://www.youtube.com/embed/z-xfGoabprU?autoplay=1&mute=1&loop=1&playlist=z-xfGoabprU&controls=0&showinfo=0&rel=0',
        bgImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80',
        demoYoutube: 'https://www.youtube.com/embed/z-xfGoabprU?autoplay=1',
        heroInfo: {
            title: '시크릿 2: 시네마틱 라이브러리',
            desc: '감각적인 비주얼과 감성적인 멜로디가 공존하는 시크릿 2 전용 시네마 공간입니다.',
            tags: 'K-POP, CINEMA, VISUAL',
            period: '2026',
            role: '시크릿 2 디렉터',
            link: 'https://github.com/',
            img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80'
        }
    },
    // "시청 중인 콘텐츠" 행. 포스터는 static/img/poster-*.png 실제 이미지 사용.
    projects: [
        {
            title: '종이의 집',
            desc: '완벽한 계획을 세운 \'교수\'와 사연 많은 범죄자들이 조폐국을 점거하며 벌어지는 사상 최대의 인질극. 처음부터 끝까지 텐션이 안 떨어져서 그냥 전 시즌 정주행이 답입니다. (한국판은 취급 안함)',
            tags: 'Crime, Heist, Thriller',
            period: '2017',
            role: '정주행 완료',
            img: '/static/img/poster-money-heist.png',
            displayTags: ['범죄', '스릴러']
        },
        {
            title: '브레이킹 배드',
            desc: '평범한 화학 교사가 가족을 위해 마약 제조에 손을 대며 돌이킬 수 없는 범죄의 세계로 빠져드는 이야기. 시즌 1의 답답한 구간만 딱 참고 넘기면, 시즌 3부터는 진짜 밤새우면서 보게 됨. 결말까지 완벽해서 깔 수 없는 명작.',
            tags: 'Crime, Drama',
            period: '2008',
            role: '정주행 완료',
            img: '/static/img/poster-breaking-bad.png',
            displayTags: ['범죄', '드라마']
        },
        {
            title: '베터콜 사울',
            desc: '말솜씨 하나로 판을 뒤흔드는 삼류 변호사 지미 맥길이 악명 높은 \'사울 굿맨\'으로 타락해 가는 과정을 그린 《브레이킹 배드》의 프리퀄 겸 스핀오프. 총 6개 시즌으로 구성되어 있어서 본인을 히키코모리로 만드는 주범임',
            tags: 'Crime, Drama',
            period: '2015',
            role: '시청 중',
            img: '/static/img/poster-saul.png',
            displayTags: ['범죄', '드라마']
        },
        {
            title: '기묘한 이야기',
            desc: '평범한 마을에서 소년이 사라지며 시작되는 비밀 실험과 초자연적 사건들. 작중 아역 배우들이 실제로 자라는 모습을 함께 보다 보면 나도 모르게 정 들 수가 있음. 특히 최근 《스파이더맨: 브랜드 뉴 데이》에 \'존 그레이\' 역으로 캐스팅된 세이디 싱크가 \'맥스\'로 나오는데, 너무 예쁨...',
            tags: 'Sci-Fi, Horror',
            period: '2016',
            role: '정주행 완료',
            img: '/static/img/poster-stranger-things.png',
            displayTags: ['SF', '호러']
        },
        {
            title: '사이키 쿠스오의 재난',
            desc: '초능력만 빼면 평범하게 살고 싶은 고등학생 사이키 쿠스오와 이상한 친구들이 만드는 매일매일의 재난 연속극. 《짱구는 못말려》처럼 아무 생각 없이 멍하니 보기 딱 좋습니다. 밥 먹을 때 틀어두는 내 최애 \'밥친구\'.',
            tags: 'Anime, Comedy',
            period: '2018',
            role: '정주행 완료',
            img: '/static/img/poster-saiki.png',
            displayTags: ['애니', '코미디']
        },
        {
            title: '카케구루이',
            desc: '공부가 아니라 도박 실력으로 모든 서열이 결정되는 명문 사립학교에 위험한 승부를 즐기는 광기 어린 전학생이 등장합니다. 등장하는 캐릭터 하나하나가 전부 매력 터지고, 도박 특유의 짜릿한 스릴을 미친 연출로 느낄 수 있습니다.',
            tags: 'Anime, Psychological',
            period: '2017',
            role: '시청 중',
            img: '/static/img/poster-kakegurui.png',
            displayTags: ['애니', '심리']
        },
        {
            title: '스파이 패밀리',
            desc: '아냐. 와쿠와쿠',
            tags: 'Anime, Action, Comedy',
            period: '2022',
            role: '정주행 완료',
            img: '/static/img/poster-spy-family.png',
            displayTags: ['애니', '액션']
        }
    ],
    // "즐겨듣는 음악" 행 — 카드 하나 = 가수 한 명, episodes 배열 = 그 가수의 노래 목록
    // (눌렀을 때 회차처럼 나열됨). 이미지는 static/img/artist-*.jpeg 실제 사진 사용.
    hobbies: [
        {
            title: '5 Seconds Of Summer',
            desc: '팝 펑크 감성과 청량한 보컬이 매력적인 밴드. *11.19 내한 공연',
            tags: 'Pop Punk, Rock',
            period: '2026',
            role: '즐겨 듣는 가수',
            img: '/static/img/artist-5sos.jpeg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: 'High', desc: '', img: '/static/img/5sos-calm.jpeg' },
                { num: '2', title: 'Youngblood', desc: '', img: '/static/img/5sos-youngblood.jpeg' },
                { num: '3', title: 'Ghost Of You', desc: '', img: '/static/img/5sos-youngblood.jpeg' },
                { num: '4', title: 'Valentine', desc: '', img: '/static/img/5sos-youngblood.jpeg' },
                { num: '5', title: 'Lie to Me', desc: '', img: '/static/img/5sos-youngblood.jpeg' },
                { num: '6', title: '2011', desc: '', img: '/static/img/5sos-2011.jpeg' },
                { num: '7', title: 'Easier', desc: '', img: '/static/img/5sos-calm.jpeg' }
            ]
        },
        {
            title: 'MUSE',
            desc: '웅장한 사운드와 실험적인 프로그레시브 록으로 유명한 밴드.',
            tags: 'Rock, Alternative',
            period: '2026',
            role: '즐겨 듣는 가수',
            img: '/static/img/artist-muse.jpeg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: 'Plug in Baby', desc: '', img: '/static/img/muse-origin.jpeg' },
                { num: '2', title: 'Hysteria', desc: '', img: '/static/img/muse-absolution.jpeg' },
                { num: '3', title: 'Supermassive Black Hole', desc: '', img: '/static/img/muse-blackholes.jpeg' },
                { num: '4', title: 'Time is Running Out', desc: '', img: '/static/img/muse-absolution.jpeg' },
                { num: '5', title: 'Madness', desc: '', img: '/static/img/muse-madness.jpeg' },
                { num: '6', title: 'Starlight', desc: '', img: '/static/img/muse-blackholes.jpeg' },
                { num: '7', title: 'Psycho', desc: '', img: '/static/img/muse-drones.jpeg' },
                { num: '8', title: 'Stockholm Syndrome', desc: '', img: '/static/img/muse-absolution.jpeg' }
            ]
        },
        {
            title: '2NE1',
            desc: '독보적인 카리스마와 파워풀한 퍼포먼스의 걸그룹.',
            tags: 'K-POP',
            period: '2026',
            role: '즐겨 듣는 가수',
            img: '/static/img/artist-2ne1.jpeg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: 'You And I', desc: '', img: '/static/img/2ne1-21.jpeg' },
                { num: '2', title: 'Ugly', desc: '', img: '/static/img/2ne1-skull.jpeg' },
                { num: '3', title: "I Don't Care", desc: '', img: '/static/img/2ne1-holo.jpeg' },
                { num: '4', title: 'Fire', desc: '', img: '/static/img/2ne1-holo.jpeg' },
                { num: '5', title: 'Come Back Home', desc: '', img: '/static/img/2ne1-crush.png' }
            ]
        },
        {
            title: 'M.C The Max',
            desc: '섬세한 감정 표현과 폭발적인 라이브 실력의 록 발라드 밴드. 노래방 18번',
            tags: 'Rock Ballad',
            period: '2026',
            role: '즐겨 듣는 가수',
            img: '/static/img/artist-mctm.jpeg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: '흩어지지 않게', desc: '', img: '/static/img/mctm-9th.jpeg' },
                { num: '2', title: '처음처럼', desc: '', img: '/static/img/mctm-ceremonia.jpeg' },
                { num: '3', title: '넘쳐흘러', desc: '', img: '/static/img/mctm-circular.jpeg' },
                { num: '4', title: 'One Love', desc: '', img: '/static/img/mctm-collage.jpeg' },
                { num: '5', title: '안녕을', desc: '', img: '/static/img/mctm-9th.jpeg' }
            ]
        },
        {
            title: '다비치',
            desc: '풍부한 감성과 깊은 목소리가 돋보이는 여성 듀오. 최고.',
            tags: 'Ballad',
            period: '2026',
            role: '즐겨 듣는 가수',
            img: '/static/img/artist-davichi.jpeg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: '너에게 못했던 내 마지막 말은', desc: '', img: '/static/img/davichi-noege.jpeg' },
                { num: '2', title: '나의 오랜 연인에게', desc: '', img: '/static/img/davichi-yeonin.jpeg' },
                { num: '3', title: '마치 우린 없었던 사이', desc: '', img: '/static/img/davichi-machi.jpeg' },
                { num: '4', title: '이 사랑', desc: '', img: '/static/img/davichi-isarang.jpeg' },
                { num: '5', title: '매일 크리스마스', desc: '', img: '/static/img/davichi-christmas.jpeg' },
                { num: '6', title: '팡파레', desc: '', img: '/static/img/davichi-fanfare.jpeg' },
                { num: '7', title: '거북이', desc: '', img: '/static/img/davichi-turtle.jpeg' }
            ]
        },
        {
            title: '한로로',
            desc: '담백한 목소리로 담담한 위로를 건네는 싱어송라이터 할로로.',
            tags: 'Indie, Folk',
            period: '2026',
            role: '즐겨 듣는 가수',
            img: '/static/img/artist-hanroro.jpeg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: '자처', desc: '', img: '/static/img/artist-hanroro.jpeg' },
                { num: '2', title: '입춘', desc: '', img: '/static/img/hanroro-ipchun.jpeg' },
                { num: '3', title: '금붕어', desc: '', img: '/static/img/hanroro-1st.jpeg' },
                { num: '4', title: '사랑하게 될 거야', desc: '', img: '/static/img/hanroro-1st.jpeg' },
                { num: '5', title: '0+0', desc: '', img: '/static/img/hanroro-3rd.jpeg' },
                { num: '6', title: '생존법', desc: '', img: '/static/img/hanroro-saengjon.jpeg' }
            ]
        }
    ],
    // "관심사" 행 — 지금은 틀만 잡아둔 예시 데이터야.
    // 카드 하나 = 관심사 하나. title/desc/tags/img 를 실제 관심사로 바꿔서 채우면 돼.
    // (강아지 사진/영상 자랑 행은 별도로 이름 정해서 추가할 예정 — 아직 미포함)
    interests: [
        {
            title: '관심사 이름을 입력하세요 (예시)',
            desc: '이 관심사에 대한 소개를 짧게 적어보세요.',
            tags: '관심사',
            period: '2026',
            role: '관심 있는 분야',
            img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
            displayTags: ['관심사']
        }
    ],
    // "자랑하고 싶은 콘텐츠" 행 — 반려견 소개 카드. 사진은 static/img/dog-*.jpg 실제 이미지 사용.
    showoff: [
        {
            title: '솜이',
            desc: '우리집 첫째 반려견 솜이를 소개합니다.',
            tags: '반려견',
            period: '2026',
            role: '우리집 첫째',
            img: '/static/img/dog-somi.jpg',
            displayTags: ['반려견']
        },
        {
            title: '이브',
            desc: '우리집 둘째 반려견 이브를 소개합니다.',
            tags: '반려견',
            period: '2026',
            role: '우리집 둘째',
            img: '/static/img/dog-eve.jpg',
            displayTags: ['반려견']
        }
    ]
};

// 시크릿 2 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret2Active = function () {
    console.log("🔑 [시크릿 2] 프로필 활성화됨: 딥 퍼플/매젠타 포인트 테마 적용");
    document.documentElement.style.setProperty('--netflix-red', '#ab47bc');
};
