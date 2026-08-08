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
    rowProjectsTitle: '김시은 님이 시청 중인 콘텐츠',
    rowHobbiesTitle: '김시은 님이 즐겨듣는 음악',
    rowMusicVideosTitle: '김시은 님이 추천하는 음악 영상',
    rowInterestsTitle: '김시은 님이 추천하는 재밌는 영상',
    rowShowoffTitle: '김시은 님이 자랑하고 싶은 콘텐츠',
    hero: {
        badge: '<i class="fa-solid fa-key" style="color:#ab47bc;"></i> SIEUN\'S ORIGINAL',
        title: '시은 오리지널 시리즈',
        desc: '김시은 님의 전용 콘텐츠 공간입니다.',
        bgYoutube: 'https://www.youtube.com/embed/22-ev5iBebo?autoplay=1&mute=1&loop=1&playlist=22-ev5iBebo&controls=0&showinfo=0&rel=0',
        bgImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80',
        demoYoutube: 'https://www.youtube.com/embed/22-ev5iBebo?autoplay=1',
        heroInfo: {
            title: '시크릿 2: 시네마틱 라이브러리',
            desc: '이 프로필의 주인장 김시은의 시크릿 공간입니다.',
            tags: '음주',
            period: '23세',
            role: '학생',
            periodLabel: '나이',
            roleLabel: '직업',
            tagsLabel: '취미',
            link: '',
            instagram: 'https://instagram.com/rloiw',
            img: '/static/img/secret2-info.jpg'
        }
    },
    // "시청 중인 콘텐츠" 행. 포스터는 static/img/poster-*.png 실제 이미지 사용.
    projects: [
        {
            title: '종이의 집',
            desc: '완벽한 계획을 세운 \'교수\'와 사연 많은 범죄자들이 조폐국을 점거하며 벌어지는 사상 최대의 인질극. 처음부터 끝까지 텐션이 안 떨어져서 그냥 전 시즌 정주행이 답입니다. (한국판은 취급 안함)',
            tags: 'Crime, Heist, Thriller',
            tagsLabel: '장르',
            period: '2017',
            role: '정주행 완료',
            img: '/static/img/poster-money-heist.png',
            displayTags: ['범죄', '스릴러']
        },
        {
            title: '브레이킹 배드',
            desc: '평범한 화학 교사가 가족을 위해 마약 제조에 손을 대며 돌이킬 수 없는 범죄의 세계로 빠져드는 이야기. 시즌 1의 답답한 구간만 딱 참고 넘기면, 시즌 3부터는 진짜 밤새우면서 보게 됨. 결말까지 완벽해서 깔 수 없는 명작.',
            tags: 'Crime, Drama',
            tagsLabel: '장르',
            period: '2008',
            role: '정주행 완료',
            img: '/static/img/poster-breaking-bad.png',
            displayTags: ['범죄', '드라마']
        },
        {
            title: '베터콜 사울',
            desc: '말솜씨 하나로 판을 뒤흔드는 삼류 변호사 지미 맥길이 악명 높은 \'사울 굿맨\'으로 타락해 가는 과정을 그린 《브레이킹 배드》의 프리퀄 겸 스핀오프. 총 6개 시즌으로 구성되어 있어서 본인을 히키코모리로 만드는 주범임',
            tags: 'Crime, Drama',
            tagsLabel: '장르',
            period: '2015',
            role: '시청 중',
            img: '/static/img/poster-saul.png',
            displayTags: ['범죄', '드라마']
        },
        {
            title: '기묘한 이야기',
            desc: '평범한 마을에서 소년이 사라지며 시작되는 비밀 실험과 초자연적 사건들. 작중 아역 배우들이 실제로 자라는 모습을 함께 보다 보면 나도 모르게 정 들 수가 있음. 특히 최근 《스파이더맨: 브랜드 뉴 데이》에 \'존 그레이\' 역으로 캐스팅된 세이디 싱크가 \'맥스\'로 나오는데, 너무 예쁨...',
            tags: 'Sci-Fi, Horror',
            tagsLabel: '장르',
            period: '2016',
            role: '정주행 완료',
            img: '/static/img/poster-stranger-things.png',
            displayTags: ['SF', '호러']
        },
        {
            title: '사이키 쿠스오의 재난',
            desc: '초능력만 빼면 평범하게 살고 싶은 고등학생 사이키 쿠스오와 이상한 친구들이 만드는 매일매일의 재난 연속극. 《짱구는 못말려》처럼 아무 생각 없이 멍하니 보기 딱 좋습니다. 밥 먹을 때 틀어두는 내 최애 \'밥친구\'.',
            tags: 'Anime, Comedy',
            tagsLabel: '장르',
            period: '2018',
            role: '정주행 완료',
            img: '/static/img/poster-saiki.png',
            displayTags: ['애니', '코미디']
        },
        {
            title: '카케구루이',
            desc: '공부가 아니라 도박 실력으로 모든 서열이 결정되는 명문 사립학교에 위험한 승부를 즐기는 광기 어린 전학생이 등장합니다. 등장하는 캐릭터 하나하나가 전부 매력 터지고, 도박 특유의 짜릿한 스릴을 미친 연출로 느낄 수 있습니다.',
            tags: 'Anime, Psychological',
            tagsLabel: '장르',
            period: '2017',
            role: '시청 중',
            img: '/static/img/poster-kakegurui.png',
            displayTags: ['애니', '심리']
        },
        {
            title: '스파이 패밀리',
            desc: '아냐. 와쿠와쿠',
            tags: 'Anime, Action, Comedy',
            tagsLabel: '장르',
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
            episodesLabel: '노래',
            tagsLabel: '장르',
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
            episodesLabel: '노래',
            tagsLabel: '장르',
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
            episodesLabel: '노래',
            tagsLabel: '장르',
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
            episodesLabel: '노래',
            tagsLabel: '장르',
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
            episodesLabel: '노래',
            tagsLabel: '장르',
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
            episodesLabel: '노래',
            tagsLabel: '장르',
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
    // "음악 영상" 행 — 카드 하나 = 추천 음악 관련 유튜브 영상 하나.
    // 카드를 누르면 모달이 뜨고, 그 안의 영상 항목을 누르면 바로 재생된다.
    musicVideos: [
        {
            title: 'IVE 리즈 X 권진아 - HOOK',
            desc: '뮤플리 HOOK 시리즈. 아이브 리즈와 권진아가 서로의 대표곡을 체인지해서 부르는 영상.',
            tags: 'Cover, Music',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/XFxxhYEIGEU/hqdefault.jpg',
            displayTags: ['음악'],
            episodes: [
                {
                    num: '1',
                    title: 'IVE 리즈 X 권진아 - HOOK (대표곡 체인지)',
                    desc: '',
                    youtubeVideo: 'https://www.youtube.com/embed/XFxxhYEIGEU?autoplay=1',
                    img: 'https://i.ytimg.com/vi/XFxxhYEIGEU/hqdefault.jpg'
                }
            ]
        },
        {
            title: 'IVE 장원영 직캠',
            desc: '아이브 월드투어 앵콜 무대 장원영 직캠 영상.',
            tags: 'K-POP, Fancam',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/XiqXW8kQoEM/hqdefault.jpg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: "IVE Wonyoung 'Off The Record' 직캠 - WORLD TOUR ENCORE", desc: '', youtubeVideo: 'https://www.youtube.com/embed/XiqXW8kQoEM?autoplay=1', img: 'https://i.ytimg.com/vi/XiqXW8kQoEM/hqdefault.jpg' }
            ]
        },
        {
            title: '백예린 커버 - 주호민 X 침착맨',
            desc: 'DF LIVE. 주호민이 부르고 침착맨이 피처링한 백예린 커버 영상.',
            tags: 'Cover, Music',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/xGevsZco2EM/hqdefault.jpg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: '백예린 커버 (Feat. 침착맨) - DF LIVE', desc: '', youtubeVideo: 'https://www.youtube.com/embed/xGevsZco2EM?autoplay=1', img: 'https://i.ytimg.com/vi/xGevsZco2EM/hqdefault.jpg' }
            ]
        },
        {
            title: '강민경 X 최정훈 - Because we loved',
            desc: 'STONE MUSIC 공식 뮤직비디오.',
            tags: 'MV, Ballad',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/HHLL9qiE2L4/hqdefault.jpg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: 'KANG MIN KYUNG X CHOI JUNG HOON - Because we loved MV', desc: '', youtubeVideo: 'https://www.youtube.com/embed/HHLL9qiE2L4?autoplay=1', img: 'https://i.ytimg.com/vi/HHLL9qiE2L4/hqdefault.jpg' }
            ]
        },
        {
            title: '선우정아 X 온유 - 너와 나의 거리',
            desc: 'JTBC 바라던 바다 7회 방송 영상.',
            tags: 'Music, Entertainment',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/iWTB6YgZUDc/hqdefault.jpg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: '선우정아 X 온유 - 너와 나의 거리 (바라던 바다 7회)', desc: '', youtubeVideo: 'https://www.youtube.com/embed/iWTB6YgZUDc?autoplay=1', img: 'https://i.ytimg.com/vi/iWTB6YgZUDc/hqdefault.jpg' }
            ]
        },
        {
            title: 'MUSE 레전드 콘서트 플레이리스트',
            desc: '온에잇 채널의 뮤즈 레전드 콘서트 & 라이브 영상 모음 (전곡 가사자막).',
            tags: 'Live, Rock',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/Pce6tezuYKw/hqdefault.jpg',
            displayTags: ['음악'],
            episodes: [
                { num: '1', title: '뮤즈 레전드 콘서트 & 라이브 영상 모음 (전곡 가사자막)', desc: '', youtubeVideo: 'https://www.youtube.com/embed/Pce6tezuYKw?autoplay=1', img: 'https://i.ytimg.com/vi/Pce6tezuYKw/hqdefault.jpg' }
            ]
        }
    ],
    // "재밌는 영상" 행 — 카드 하나 = 추천 예능/코미디 유튜브 영상 하나.
    interests: [
        {
            title: '침착맨 - 테라리아',
            desc: '침착맨 플러스 채널의 테라리아 관련 영상.',
            tags: 'Game, Entertainment',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/yBuJKZiTgDQ/hqdefault.jpg',
            displayTags: ['재밌는 영상'],
            episodes: [
                { num: '1', title: '아 내가 테라리아를 일찍 알았더라면', desc: '', youtubeVideo: 'https://www.youtube.com/embed/yBuJKZiTgDQ?autoplay=1', img: 'https://i.ytimg.com/vi/yBuJKZiTgDQ/hqdefault.jpg' }
            ]
        },
        {
            title: '침착맨 킬링벌스 모음',
            desc: 'DF 채널의 침착맨(이말년) 킬링벌스 편집 영상.',
            tags: 'Entertainment, Comedy',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/1Ckc0fD5jHg/hqdefault.jpg',
            displayTags: ['재밌는 영상'],
            episodes: [
                { num: '1', title: '침착맨 킬링벌스 완전 편집 모음 - DF ChimlingPerse', desc: '', youtubeVideo: 'https://www.youtube.com/embed/1Ckc0fD5jHg?autoplay=1', img: 'https://i.ytimg.com/vi/1Ckc0fD5jHg/hqdefault.jpg' }
            ]
        },
        {
            title: '빠니보틀 - 멕시코 온천',
            desc: '빠니보틀 아메리카 여행기 16편, 멕시코 온천 가보기.',
            tags: 'Travel, Vlog',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/VDiFELzovT0/hqdefault.jpg',
            displayTags: ['재밌는 영상'],
            episodes: [
                { num: '1', title: '멕시코 온천 가보기 [아메리카16] - 빠니보틀', desc: '', youtubeVideo: 'https://www.youtube.com/embed/VDiFELzovT0?autoplay=1', img: 'https://i.ytimg.com/vi/VDiFELzovT0/hqdefault.jpg' }
            ]
        },
        {
            title: '침착맨 - 나무위키 스피드런 대결',
            desc: '침착맨 공식 채널 영상. 나무위키 스피드런 대결.',
            tags: 'Entertainment, Game',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/EONlXsPEoJA/hqdefault.jpg',
            displayTags: ['재밌는 영상'],
            episodes: [
                { num: '1', title: '침철단 나무위키 스피드런 대결', desc: '', youtubeVideo: 'https://www.youtube.com/embed/EONlXsPEoJA?autoplay=1', img: 'https://i.ytimg.com/vi/EONlXsPEoJA/hqdefault.jpg' }
            ]
        },
        {
            title: '침착맨 - 상식과 과잉 지식',
            desc: '침착맨 공식 채널 영상.',
            tags: 'Entertainment, Talk',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/sOL5Kx351d4/hqdefault.jpg',
            displayTags: ['재밌는 영상'],
            episodes: [
                { num: '1', title: '내가 아는 건 상식, 모르는 건 과잉 지식', desc: '', youtubeVideo: 'https://www.youtube.com/embed/sOL5Kx351d4?autoplay=1', img: 'https://i.ytimg.com/vi/sOL5Kx351d4/hqdefault.jpg' }
            ]
        },
        {
            title: '침착맨 - MT의 꽃 마피아',
            desc: '침착맨 공식 채널 영상.',
            tags: 'Entertainment, Game',
            tagsLabel: '장르',
            period: '2026',
            role: '추천',
            episodesLabel: '영상',
            img: 'https://i.ytimg.com/vi/9BF_ZhmCY-U/hqdefault.jpg',
            displayTags: ['재밌는 영상'],
            episodes: [
                { num: '1', title: 'MT의 꽃 마피아', desc: '', youtubeVideo: 'https://www.youtube.com/embed/9BF_ZhmCY-U?autoplay=1', img: 'https://i.ytimg.com/vi/9BF_ZhmCY-U/hqdefault.jpg' }
            ]
        }
    ],
    // "자랑하고 싶은 콘텐츠" 행 — 반려견 소개 카드. 사진은 static/img/dog-*.jpg 실제 이미지 사용.
    showoff: [
        {
            title: '솜이',
            desc: '우리집 셋째 포메라니안 솜이.',
            tags: '초예민',
            period: '9살',
            role: '두 뼘',
            periodLabel: '나이',
            roleLabel: '크기',
            tagsLabel: '성격',
            img: '/static/img/dog-somi.jpg',
            displayTags: ['초예민'],
            episodes: [
                { num: '1', title: '산책하다가 여우냐는 질문을 들어봄', desc: '', img: '/static/img/somi-1.jpg' },
                { num: '2', title: '차에 타면 꼭 자야함', desc: '', img: '/static/img/somi-2.jpg' },
                { num: '3', title: '강아지 무서워함 (강아지 주제에)', desc: '', img: '/static/img/somi-3.jpg' },
                { num: '4', title: '맨바닥 싫어함', desc: '', img: '/static/img/somi-4.jpg' },
                { num: '5', title: '다 컸는데 2kg', desc: '', img: '/static/img/somi-5.jpg' }
            ]
        },
        {
            title: '이브',
            desc: '우리집 넷째 말티츄 이브.',
            tags: '바보',
            period: '2살',
            role: '솜이 1.5배',
            periodLabel: '나이',
            roleLabel: '크기',
            tagsLabel: '성격',
            img: '/static/img/dog-eve.jpg',
            displayTags: ['바보'],
            episodes: [
                { num: '1', title: '크리스마스 이브에 데려와서 이브', desc: '', img: '/static/img/eve-1.jpg' },
                { num: '2', title: '파랑 + 검정의 오드아이', desc: '', img: '/static/img/eve-2.jpg' },
                { num: '3', title: '둘이 사이 별로 좋지 않음', desc: '', img: '/static/img/eve-3.jpg' },
                { num: '4', title: '안정형 남친st.', desc: '', img: '/static/img/eve-4.jpg' },
                { num: '5', title: '머리만 댈 수 있다면 그곳이 침대임', desc: '', img: '/static/img/eve-5.jpg' }
            ]
        }
    ]
};

// 시크릿 2 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret2Active = function () {
    console.log("🔑 [시크릿 2] 프로필 활성화됨: 딥 퍼플/매젠타 포인트 테마 적용");
    document.documentElement.style.setProperty('--netflix-red', '#ab47bc');
};
