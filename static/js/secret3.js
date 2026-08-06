/**
 * secret3.js - 시크릿 3 프로필 전용 커스텀 스크립트 및 데이터
 * 
 * 시크릿 3 프로필의 메인 테마, 프로젝트 목록, 취미 및 페이지 꾸미기 로직을 작성할 수 있습니다.
 */

window.secret3Data = {
    key: 'secret3',
    name: '남기제',
    avatarClass: 'avatar-secret3',
    emoji: '',
    rowProjectsTitle: '<i class="fa-solid fa-gamepad" style="color:#ff6f00;"></i> 시크릿 3 - 게이밍 & 애니 서브컬처',
    hero: {
        badge: '<i class="fa-solid fa-mask" style="color:#ff6f00;"></i> SECRET 3 CYBER LAB',
        title: '시크릿 3:<br>서브컬처 & 애니 라운지',
        desc: '강렬한 밴드 사운드와 게이밍 비주얼이 만나는 시크릿 3 전용 연구소입니다.',
        bgYoutube: 'https://www.youtube.com/embed/MSv7NbfbtU8?autoplay=1&mute=1&loop=1&playlist=MSv7NbfbtU8&controls=0&showinfo=0&rel=0',
        bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
        demoYoutube: 'https://www.youtube.com/embed/MSv7NbfbtU8?autoplay=1',
        heroInfo: {
            title: '시크릿 3: 서브컬처 & 애니 라운지',
            desc: '강렬한 밴드 사운드와 게이밍 비주얼이 만나는 시크릿 3 전용 연구소입니다.',
            tags: 'J-POP, GAMING, ANIME',
            period: '2026',
            role: '시크릿 3 마스터',
            link: 'https://github.com/',
            img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80'
        }
    },
    projects: [
        {
            title: '시크릿 3 J-POP & 애니 OST 모음집',
            desc: '특유의 감성과 폭발적인 멜로디라인이 돋보이는 J-POP 명곡 컬렉션입니다.',
            tags: 'J-POP, Anime OST',
            period: '2026',
            role: '시크릿 3 픽',
            img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
            displayTags: ['J-POP', 'Anime OST'],
            episodes: [
                {
                    num: '1',
                    title: 'King Gnu - 飛行艇(비행정)',
                    desc: '킹누 특유의 폭발적인 밴드 사운드와 그루브',
                    youtubeVideo: 'https://www.youtube.com/embed/MSv7NbfbtU8?autoplay=1',
                    img: 'https://i.ytimg.com/vi/MSv7NbfbtU8/maxresdefault.jpg'
                },
                {
                    num: '2',
                    title: 'King Gnu - SPECIALZ',
                    desc: '주술회전 2기 인왕의 전개와 함께하는 명곡',
                    youtubeVideo: 'https://www.youtube.com/embed/fhzKLBZJC3w?autoplay=1',
                    img: 'https://i.ytimg.com/vi/fhzKLBZJC3w/maxresdefault.jpg'
                }
            ]
        }
    ],
    hobbies: [
        {
            title: '서브컬처 게임 & 콘솔 어드벤처',
            desc: '붕괴:스타레일, 명조, 엘든링 등 몰입감 넘치는 세계관을 즐기는 게이머 공간.',
            tags: 'Gaming, RPG',
            period: 'Always',
            role: 'Pro Gamer',
            img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
            displayTags: ['Gaming', 'Subculture']
        }
    ]
};

// 시크릿 3 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret3Active = function () {
    console.log("🕵️ [시크릿 3] 프로필 활성화됨: 네온 오렌지 포인트 테마 적용");
    document.documentElement.style.setProperty('--netflix-red', '#ff6f00');
};
