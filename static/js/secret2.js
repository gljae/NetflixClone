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
            desc: '천재적인 두뇌를 가진 \'교수\'와 8인의 도둑이 스페인 조폐국과 국립은행을 터는 이야기.',
            tags: 'Crime, Heist, Thriller',
            period: '2017',
            role: '정주행 완료',
            img: '/static/img/poster-money-heist.png',
            displayTags: ['범죄', '스릴러']
        },
        {
            title: '브레이킹 배드',
            desc: '평범한 고등학교 화학 교사가 마약 제조에 손을 대며 벌어지는 파멸의 서사.',
            tags: 'Crime, Drama',
            period: '2008',
            role: '정주행 완료',
            img: '/static/img/poster-breaking-bad.png',
            displayTags: ['범죄', '드라마']
        },
        {
            title: '베터콜 사울',
            desc: '브레이킹 배드의 프리퀄. 소시민 변호사 지미 맥길이 사울 굿맨이 되어가는 과정.',
            tags: 'Crime, Drama',
            period: '2015',
            role: '시청 중',
            img: '/static/img/poster-saul.png',
            displayTags: ['범죄', '드라마']
        },
        {
            title: '기묘한 이야기',
            desc: '작은 마을 호킨스에서 벌어지는 초자연적 실종 사건과 그 이면의 또 다른 세계.',
            tags: 'Sci-Fi, Horror',
            period: '2016',
            role: '정주행 완료',
            img: '/static/img/poster-stranger-things.png',
            displayTags: ['SF', '호러']
        },
        {
            title: '사이키 쿠스오의 재난',
            desc: '모든 초능력을 가진 고등학생 사이키 쿠스오의 평범해지고 싶은 일상 개그 애니메이션.',
            tags: 'Anime, Comedy',
            period: '2018',
            role: '정주행 완료',
            img: '/static/img/poster-saiki.png',
            displayTags: ['애니', '코미디']
        },
        {
            title: '카케구루이',
            desc: '도박 실력으로 서열이 결정되는 명문고, 그 판을 뒤흔드는 전학생 야메코의 이야기.',
            tags: 'Anime, Psychological',
            period: '2017',
            role: '시청 중',
            img: '/static/img/poster-kakegurui.png',
            displayTags: ['애니', '심리']
        },
        {
            title: '스파이 패밀리',
            desc: '스파이, 암살자, 초능력자가 정체를 숨긴 채 가짜 가족이 되어 살아가는 액션 코미디.',
            tags: 'Anime, Action, Comedy',
            period: '2022',
            role: '정주행 완료',
            img: '/static/img/poster-spy-family.png',
            displayTags: ['애니', '액션']
        }
    ],
    // "즐겨듣는 음악" 행 — 지금은 틀만 잡아둔 예시 데이터야.
    // 카드 하나 = 가수 한 명, episodes 배열 = 그 가수의 노래 목록(눌렀을 때 회차처럼 나열됨).
    // title/desc/img/episodes 안의 값들을 실제 좋아하는 가수·노래로 바꿔서 채우면 돼.
    // youtubeVideo 는 뮤직비디오나 라이브 영상의 유튜브 링크를 넣으면 카드 안에서 바로 재생돼.
    hobbies: [
        {
            title: '아티스트 이름을 입력하세요 (예시 1)',
            desc: '이 가수를 좋아하는 이유를 짧게 적어보세요.',
            tags: 'K-POP',
            period: '2026',
            role: '즐겨 듣는 가수',
            img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80',
            displayTags: ['음악'],
            episodes: [
                {
                    num: '1',
                    title: '노래 제목을 입력하세요',
                    desc: '이 곡을 좋아하는 이유나 소개를 적어보세요.',
                    youtubeVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
                    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
                },
                {
                    num: '2',
                    title: '노래 제목을 입력하세요',
                    desc: '이 곡을 좋아하는 이유나 소개를 적어보세요.',
                    youtubeVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
                    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
                }
            ]
        },
        {
            title: '아티스트 이름을 입력하세요 (예시 2)',
            desc: '이 가수를 좋아하는 이유를 짧게 적어보세요.',
            tags: 'K-POP',
            period: '2026',
            role: '즐겨 듣는 가수',
            img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
            displayTags: ['음악'],
            episodes: [
                {
                    num: '1',
                    title: '노래 제목을 입력하세요',
                    desc: '이 곡을 좋아하는 이유나 소개를 적어보세요.',
                    youtubeVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
                    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80'
                }
            ]
        }
    ]
};

// 시크릿 2 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret2Active = function () {
    console.log("🔑 [시크릿 2] 프로필 활성화됨: 딥 퍼플/매젠타 포인트 테마 적용");
    document.documentElement.style.setProperty('--netflix-red', '#ab47bc');
};
