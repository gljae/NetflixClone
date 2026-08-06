/**
 * secret1.js - 시크릿 1 프로필 전용 커스텀 스크립트 및 데이터
 * 
 * 시크릿 1 프로필의 메인 테마, 프로젝트 목록, 취미 및 페이지 꾸미기 로직을 작성할 수 있습니다.
 */

window.secret1Data = {
    key: 'secret1',
    name: '김건우',
    avatarClass: 'avatar-secret1',
    emoji: '',
    rowProjectsTitle: '<i class="fa-solid fa-fire" style="color:#00e676;"></i> 시크릿 1 - K-HIPHOP / K-POP / J-POP 플레이리스트',
    hero: {
        badge: '<i class="fa-solid fa-user-secret" style="color:#00e676;"></i> SECRET 1 SPECIAL ARCHIVE',
        title: '시크릿 1:<br>비밀의 사운드 트랙',
        desc: '트렌디한 비트와 K-POP, J-POP 명곡으로 가득 채워진 시크릿 1만의 전용 공간입니다.',
        bgYoutube: 'https://www.youtube.com/embed/oCvA-i9OTyg?autoplay=1&mute=1&loop=1&playlist=oCvA-i9OTyg&controls=0&showinfo=0&rel=0',
        bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
        demoYoutube: 'https://www.youtube.com/embed/oCvA-i9OTyg?autoplay=1',
        heroInfo: {
            title: '시크릿 1: 비밀의 사운드 트랙',
            desc: '트렌디한 비트와 K-POP, J-POP 명곡으로 가득 채워진 시크릿 1만의 전용 공간입니다.',
            tags: 'HIPHOP, K-POP, J-POP',
            period: '2026',
            role: '시크릿 1 프로듀서',
            link: 'https://github.com/',
            img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80'
        }
    },
    projects: [
        {
            title: '시크릿 1 K-HIPHOP 명곡 컬렉션',
            desc: '강렬한 808 비트와 독창적인 신스 사운드가 돋보이는 대표곡 모음입니다.',
            tags: 'K-HipHop, Playlist',
            period: '2026',
            role: '시크릿 1 픽',
            img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
            displayTags: ['K-HIPHOP', '비트 픽'],
            episodes: [
                {
                    num: '1',
                    title: '식케이(Sik-K), Lil Moshpit - LOV3 (Feat. Bryan Chase, Okasian)',
                    desc: '트렌디하고 파워풀한 레이지 사운드의 정수',
                    youtubeVideo: 'https://www.youtube.com/embed/oCvA-i9OTyg?autoplay=1',
                    img: 'https://i.ytimg.com/vi/oCvA-i9OTyg/maxresdefault.jpg'
                },
                {
                    num: '2',
                    title: '창모(CHANGMO) - Hyperstar',
                    desc: '에너지 넘치는 피아노 리프와 창모 특유의 랩핑',
                    youtubeVideo: 'https://www.youtube.com/embed/bL4KyoQWspM?autoplay=1',
                    img: 'https://i.ytimg.com/vi/bL4KyoQWspM/maxresdefault.jpg'
                },
                {
                    num: '3',
                    title: '키드밀리 - 25 (Feat. YANGHONGWON)',
                    desc: '레이지 장르의 신선함을 보여주는 트랙',
                    youtubeVideo: 'https://www.youtube.com/embed/1JS5Td0MeNE?autoplay=1',
                    img: 'https://i.ytimg.com/vi/1JS5Td0MeNE/hqdefault.jpg'
                },
                {
                    num: '4',
                    title: '씨잼 - Pokerface (포커페이스)',
                    desc: '드라이브 할 때 이만한 곡이 없음',
                    youtubeVideo: 'https://www.youtube.com/embed/yrJSc3NKNfc?autoplay=1',
                    img: 'https://i.ytimg.com/vi/yrJSc3NKNfc/hqdefault.jpg'
                }
            ]
        },
        {
            title: '시크릿 1 K-POP 플레이리스트',
            desc: '세련된 감성과 트렌디한 사운드의 K-POP 대표 추천곡들입니다.',
            tags: 'K-POP, Trending',
            period: '2026',
            role: '시크릿 1 픽',
            img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
            displayTags: ['K-POP', 'Trending'],
            episodes: [
                {
                    num: '1',
                    title: 'NMIXX(엔믹스) - Papillon',
                    desc: '엔믹스 팬이라면 모를 수 없는 숨겨진 띵곡.',
                    youtubeVideo: 'https://www.youtube.com/embed/qQhEwaHszKo?autoplay=1',
                    img: 'https://i.ytimg.com/vi/qQhEwaHszKo/maxresdefault.jpg'
                },
                {
                    num: '2',
                    title: 'STAYC(스테이씨) - BEBE',
                    desc: '재이의 미친 도입부와 시은의 보컬이 돋보이는 곡.',
                    youtubeVideo: 'https://www.youtube.com/embed/z-xfGoabprU?autoplay=1',
                    img: 'https://i.ytimg.com/vi/z-xfGoabprU/maxresdefault.jpg'
                },
                {
                    num: '3',
                    title: 'CORTIS (코르티스) - FaSHioN',
                    desc: '외국힙합 사운드를 K-POP에 완성도 있게 녹여낸 트랙.',
                    youtubeVideo: 'https://www.youtube.com/embed/42wfEs7oIP8?autoplay=1',
                    img: 'https://i.ytimg.com/vi/42wfEs7oIP8/maxresdefault.jpg'
                }
            ]
        },
        {
            title: '시크릿 1 J-POP & 애니 OST 플레이리스트',
            desc: '특유의 감성과 멜로디라인이 돋보이는 힐링 J-POP 추천곡입니다.',
            tags: 'J-POP, Anime OST',
            period: '2026',
            role: '시크릿 1 픽',
            img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
            displayTags: ['J-POP', 'Anime OST'],
            episodes: [
                {
                    num: '1',
                    title: 'King Gnu - 飛行艇(비행정)',
                    desc: '킹누 특유의 강력한 밴드 사운드가 매력적인 곡.',
                    youtubeVideo: 'https://www.youtube.com/embed/MSv7NbfbtU8?autoplay=1',
                    img: 'https://i.ytimg.com/vi/MSv7NbfbtU8/maxresdefault.jpg'
                },
                {
                    num: '2',
                    title: 'King Gnu - SPECIALZ',
                    desc: '주술회전 2기 시부야 사변 오프닝.',
                    youtubeVideo: 'https://www.youtube.com/embed/fhzKLBZJC3w?autoplay=1',
                    img: 'https://i.ytimg.com/vi/fhzKLBZJC3w/maxresdefault.jpg'
                },
                {
                    num: '3',
                    title: 'KANA-BOON - Silhouette',
                    desc: '그 시절 우리는 모두 닌자였다.',
                    youtubeVideo: 'https://www.youtube.com/embed/dlFA0Zq1k2A?autoplay=1',
                    img: 'https://i.ytimg.com/vi/dlFA0Zq1k2A/maxresdefault.jpg'
                },
                {
                    num: '4',
                    title: 'Vaundy - 飛ぶ時(날아오를때)',
                    desc: '믿고 듣는 바운디의 명곡.',
                    youtubeVideo: 'https://www.youtube.com/embed/ARj1adoUoEU?autoplay=1',
                    img: 'https://i.ytimg.com/vi/ARj1adoUoEU/maxresdefault.jpg'
                }
            ]
        }
    ],
    hobbies: [
        {
            title: 'DJing & 스튜디오 세팅',
            desc: '나만의 공간에서 자유롭게 비트를 믹싱하는 라이프스타일',
            tags: 'Audio, Production',
            period: 'Always',
            role: 'Music Creator',
            img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
            displayTags: ['DJing', 'Music']
        }
    ]
};

// 시크릿 1 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret1Active = function () {
    console.log("🔒 [시크릿 1] 프로필 활성화됨: 에메랄드 그린 포인트 테마 적용");
    document.documentElement.style.setProperty('--netflix-red', '#00c853');
};
