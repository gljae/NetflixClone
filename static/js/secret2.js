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
    rowProjectsTitle: '<i class="fa-solid fa-compact-disc" style="color:#ab47bc;"></i> 시크릿 2 - K-POP & 시네마틱 픽',
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
    projects: [
        {
            title: '시크릿 2 트렌디 K-POP 컬렉션',
            desc: '세련된 감성과 트렌디한 사운드의 K-POP 대표 추천곡들입니다.',
            tags: 'K-POP, Trending',
            period: '2026',
            role: '시크릿 2 픽',
            img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
            displayTags: ['K-POP', 'Trending'],
            episodes: [
                {
                    num: '1',
                    title: 'STAYC(스테이씨) - BEBE',
                    desc: '감각적인 보컬라인과 인상적인 도입부 사운드',
                    youtubeVideo: 'https://www.youtube.com/embed/z-xfGoabprU?autoplay=1',
                    img: 'https://i.ytimg.com/vi/z-xfGoabprU/maxresdefault.jpg'
                },
                {
                    num: '2',
                    title: 'NMIXX(엔믹스) - Papillon',
                    desc: '세련된 보컬과 다채로운 곡 전개',
                    youtubeVideo: 'https://www.youtube.com/embed/qQhEwaHszKo?autoplay=1',
                    img: 'https://i.ytimg.com/vi/qQhEwaHszKo/maxresdefault.jpg'
                },
                {
                    num: '3',
                    title: 'CORTIS (코르티스) - FaSHioN',
                    desc: '트렌디한 비트와 팝 스타일의 독창적인 결합',
                    youtubeVideo: 'https://www.youtube.com/embed/42wfEs7oIP8?autoplay=1',
                    img: 'https://i.ytimg.com/vi/42wfEs7oIP8/maxresdefault.jpg'
                }
            ]
        }
    ],
    hobbies: [
        {
            title: '영화 감상 & 영상 디렉팅',
            desc: '클래식 영화 감상과 영상 연출을 연구하는 명품 보라빛 취미 공간입니다.',
            tags: 'Film, Cinema',
            period: 'Always',
            role: 'Cinephile',
            img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
            displayTags: ['Cinema', 'Purple Vibe']
        }
    ]
};

// 시크릿 2 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret2Active = function () {
    console.log("🔑 [시크릿 2] 프로필 활성화됨: 딥 퍼플/매젠타 포인트 테마 적용");
    document.documentElement.style.setProperty('--netflix-red', '#ab47bc');
};
