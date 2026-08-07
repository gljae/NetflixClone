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
    rowProjectsTitle: '<i class="fa-solid fa-music" style="color:#00e676;"></i> 건우의 K-POP 플레이리스트',
    hero: {
        badge: '<i class="fa-solid fa-user-secret" style="color:#00e676;"></i> SECRET 1 SPECIAL ARCHIVE',
        title: '건우s pick :<br>내 맘대로 플레이리스트',
        desc: '주인장의 취향이 씨게 들어간 플리입니다',
        bgYoutube: 'https://www.youtube.com/embed/oCvA-i9OTyg?autoplay=1&mute=1&loop=1&playlist=oCvA-i9OTyg&controls=0&showinfo=0&rel=0',
        bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
        demoYoutube: 'https://www.youtube.com/embed/oCvA-i9OTyg?autoplay=1',
        heroInfo: {
            title: '건우s pick :내 맘대로 플레이리스트',
            desc: '제가 좋아하는 장르들을 다 담았으니 즐겁게 감상하시기 바랍니다.',
            tags: 'K-POP, HIPHOP, J-POP',
            period: '2026',
            role: '플레이리스트',

            link: 'https://github.com/gljae/NetflixClone',
            img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80'
        }
    },
    projects: [
        {
            title: '여돌 K-POP 플레이리스트',
            desc: '여돌 노래들 모아놨습니다. 감상하세요.',
            tags: 'K-POP, Trending',
            period: '2026',
            role: '플레이리스트',
            img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
            displayTags: ['K-POP', 'girl group'],
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
                    desc: '재이의 미친 도입부와 시은의 보컬이 돋보이는 곡. 개인적으로 못 떠서 아쉽다.',
                    youtubeVideo: 'https://www.youtube.com/embed/z-xfGoabprU?autoplay=1',
                    img: 'https://i.ytimg.com/vi/z-xfGoabprU/maxresdefault.jpg'
                },
                {
                    num: '3',
                    title: 'I-DLE(아이들) - 말리지 마',
                    desc: '아이들이 (G)를 떼기 전 낸 곡 중에서 젤 좋아하는 곡. 가끔 아이들의 이런 감성이 그리워짐.',
                    youtubeVideo: 'https://www.youtube.com/embed/SuMnpTc8zoU?autoplay=1',
                    img: 'https://i.ytimg.com/vi/SuMnpTc8zoU/maxresdefault.jpg'
                },
                {
                    num: '4',
                    title: 'BABYMONSTER - DRIP',
                    desc: 'BRRR A-SA~~',
                    youtubeVideo: 'https://www.youtube.com/embed/Zp-Jhuhq0bQ?autoplay=1',
                    img: 'https://i.ytimg.com/vi/Zp-Jhuhq0bQ/maxresdefault.jpg'
                },
                {
                    num: '5',
                    title: 'ITZY(있지) - 달라달라',
                    desc: '데뷔곡 GOAT.',
                    youtubeVideo: 'https://www.youtube.com/embed/pNfTK39k55U?autoplay=1',
                    img: 'https://i.ytimg.com/vi/pNfTK39k55U/maxresdefault.jpg'
                },
                {
                    num: '6',
                    title: 'NewJeans (뉴진스) - Attention',
                    desc: '처음 들었을때 그 충격을 잊을 수가 없다. 지금도 이 감성과 사운드는 뉴진스를 따라올 수 없음.',
                    youtubeVideo: 'https://www.youtube.com/embed/js1CtxSY38I?autoplay=1',
                    img: 'https://i.ytimg.com/vi/js1CtxSY38I/maxresdefault.jpg'
                }
            ]
        },
        {
            title: '남돌 K-POP 플레이리스트',
            desc: '남돌 추천곡 모음입니다.',
            tags: 'K-POP, Boy Group',
            period: '2026',
            role: '플레이리스트',
            img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
            displayTags: ['남돌', 'Boy Group'],
            episodes: [
                {
                    num: '1',
                    title: 'ATEEZ(에이티즈) - BOUNCY',
                    desc: '청양고추 바이브~',
                    youtubeVideo: 'https://www.youtube.com/embed/U0G5OA6ZH5w?autoplay=1',
                    img: 'https://i.ytimg.com/vi/U0G5OA6ZH5w/maxresdefault.jpg'
                },
                {
                    num: '2',
                    title: 'NCT DREAM(엔시티 드림) - 버퍼링(Glitch Mode)',
                    desc: '제목대로 버퍼링 걸린 듯한 퍼포먼스와 멜로디가 킬포인트.',
                    youtubeVideo: 'https://www.youtube.com/embed/oZP2h3WIzqk?autoplay=1',
                    img: 'https://i.ytimg.com/vi/oZP2h3WIzqk/maxresdefault.jpg'
                },
                {
                    num: '3',
                    title: 'SEVENTEEN(세븐틴) - 손오공 (Super)',
                    desc: '웅장한 비트와 독보적인 메가 크루 퍼포먼스.',
                    youtubeVideo: 'https://www.youtube.com/embed/-GQg25oP0S4?autoplay=1',
                    img: 'https://i.ytimg.com/vi/-GQg25oP0S4/maxresdefault.jpg'
                },
                {
                    num: '4',
                    title: 'Stray Kids(스트레이 키즈) - MANIAC',
                    desc: '매우 중독적인 훅.',
                    youtubeVideo: 'https://www.youtube.com/embed/OvioeS1ZZ7o?autoplay=1',
                    img: 'https://i.ytimg.com/vi/OvioeS1ZZ7o/maxresdefault.jpg'
                },
                {
                    num: '5',
                    title: 'CORTIS (코르티스) - FaSHioN',
                    desc: '외국힙합 사운드를 kpop에 잘 녹여놓음. 아직 10대들이라 앞으로가 기대되는 아티스트.',
                    youtubeVideo: 'https://www.youtube.com/embed/42wfEs7oIP8?autoplay=1',
                    img: 'https://i.ytimg.com/vi/42wfEs7oIP8/maxresdefault.jpg'
                }
            ]
        }
    ],

    hobbies: [
        {
            title: '건우의 국힙 플레이리스트',
            desc: '비트 좋은 국힙 추천 모음.',
            tags: 'K-HipHop, Playlist',
            period: '2026',
            role: '플레이리스트',
            img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
            displayTags: ['국힙', 'Beat Pick']
        },
        {
            title: '건우의 외힙 플레이리스트',
            desc: '트렌디한 비트와 힙한 사운드의 외힙 명곡 모음.',
            tags: 'US HipHop, Playlist',
            period: '2026',
            role: '플레이리스트',
            img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
            displayTags: ['외힙', 'US HipHop']
        }
    ]
};

// 힙합 플레이리스트 상세 데이터 (국힙 & 외힙)
window.secret1KhiphopData = [
    {
        title: '건우의 국힙 플레이리스트',
        desc: '비트 좋은 국힙 추천 모음.',
        tags: 'K-HipHop, Playlist',
        period: '2026',
        role: '플레이리스트',
        img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        displayTags: ['국힙', 'Beat Pick'],
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
            },
            {
                num: '5',
                title: 'Just Music - Rain Showers Remix ',
                desc: '젓뮤 전성기를 연 곡 중 하나. 이 곡이 수록된 파급효과 앨범도 명반이니 꼭 들어보는걸 추천.',
                youtubeVideo: 'https://www.youtube.com/embed/K32MnQSxSFM?autoplay=1',
                img: 'https://i.ytimg.com/vi/K32MnQSxSFM/hqdefault.jpg'
            },
            {
                num: '6',
                title: 'JUSTHIS - Welcome to My HOME ',
                desc: '주인장이 젤 좋아하는 래퍼. 1집 겁나 명반이니 들어보세요.',
                youtubeVideo: 'https://www.youtube.com/embed/KEDYtwOmdtU?autoplay=1',
                img: 'https://i.ytimg.com/vi/KEDYtwOmdtU/hqdefault.jpg'
            },
            {
                num: '7',
                title: 'ILLIONAIRE RECORDS - 연결고리',
                desc: '국힙 트랩의 시초.',
                youtubeVideo: 'https://www.youtube.com/embed/Q7AbIQHYidQ?autoplay=1',
                img: 'https://i.ytimg.com/vi/Q7AbIQHYidQ/hqdefault.jpg'
            },
            {
                num: '8',
                title: '빈지노 - Always Awake ',
                desc: '청춘을 노래로 표현한다면 이노래가 아닐까?',
                youtubeVideo: 'https://www.youtube.com/embed/iGWKNrtbF9I?autoplay=1',
                img: 'https://i.ytimg.com/vi/iGWKNrtbF9I/hqdefault.jpg'
            },
            {
                num: '9',
                title: 'DPR LIVE -To Myself ',
                desc: 'COMING TO YOU LIVE.',
                youtubeVideo: 'https://www.youtube.com/embed/oMQkDkCBmmM?autoplay=1',
                img: 'https://i.ytimg.com/vi/oMQkDkCBmmM/hqdefault.jpg'
            },
            {
                num: '10',
                title: "DEAN - I'm Not Sorry (feat. Eric Bellinger)",
                desc: '앨 범 쳐 내 라 고',
                youtubeVideo: 'https://www.youtube.com/embed/wzvRxguTPa4?autoplay=1',
                img: 'https://i.ytimg.com/vi/wzvRxguTPa4/hqdefault.jpg'
            },
            {
                num: '11',
                title: '키드밀리 - PUMPS (feat. OKASHII) ',
                desc: '키드밀리의 따끈따끈한 신보. 사운드가 너무 내 스타일.',
                youtubeVideo: 'https://www.youtube.com/embed/ZnwMsjGPYL4?autoplay=1',
                img: 'https://i.ytimg.com/vi/ZnwMsjGPYL4/hqdefault.jpg'
            },
            {
                num: '12',
                title: 'ZENE THE ZILLA, Hash Swan, Nosun - 130 메트로놈 ',
                desc: '요즘 폼 바짝 오른 제네더질라, 항상 상수인 해쉬스완, 랩퍼블릭과 쇼미로 증명한 노선까지 거를게 없는 싱글.',
                youtubeVideo: 'https://www.youtube.com/embed/cB068G7jseg?autoplay=1',
                img: 'https://i.ytimg.com/vi/cB068G7jseg/hqdefault.jpg'
            },
        ]
    },
    {
        title: '건우의 외힙 플레이리스트',
        desc: '트렌디한 비트와 힙한 사운드의 외힙 명곡 모음.',
        tags: 'HipHop, Playlist',
        period: '2026',
        role: '플레이리스트',
        img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
        displayTags: ['외힙', 'US HipHop'],
        episodes: [
            {
                num: '1',
                title: 'Travis Scott - SICKO MODE (ft. Drake)',
                desc: '변주 사운드의 미친 충격. 외힙의 대표적인 트랩 명곡.',
                youtubeVideo: 'https://www.youtube.com/embed/6ONRf7h3Mdk?autoplay=1',
                img: 'https://i.ytimg.com/vi/6ONRf7h3Mdk/hqdefault.jpg'
            },
            {
                num: '2',
                title: 'Kendrick Lamar - HUMBLE.',
                desc: '묵직한 피아노 훅과 켄드릭 라마의 날카로운 래핑.',
                youtubeVideo: 'https://www.youtube.com/embed/tvTRZJ-4EyI?autoplay=1',
                img: 'https://i.ytimg.com/vi/tvTRZJ-4EyI/maxresdefault.jpg'
            },
            {
                num: '3',
                title: 'Playboi Carti - ILoveUIHateU',
                desc: '원조가 말아주는 레이지는 다르다.',
                youtubeVideo: 'https://www.youtube.com/embed/pZ6oeHV28b0?autoplay=1',
                img: 'https://i.ytimg.com/vi/pZ6oeHV28b0/maxresdefault.jpg'
            },
            {
                num: '4',
                title: 'Migos - Bad and Boujee ft Lil Uzi Vert',
                desc: '외힙 역사상 최고의 도입부, 트랩을 전세계적으로 유행시킨 곡.',
                youtubeVideo: 'https://www.youtube.com/embed/S-sJp1FfG7Q?autoplay=1',
                img: 'https://i.ytimg.com/vi/S-sJp1FfG7Q/hqdefault.jpg'
            },
            {
                num: '5',
                title: 'Kanye West - Runaway (feat. Pusha T)',
                desc: '올드 칸예의 정수가 들어간 최고의 곡.',
                youtubeVideo: 'https://www.youtube.com/embed/EMnQwBTJnMM?autoplay=1',
                img: 'https://i.ytimg.com/vi/EMnQwBTJnMM/hqdefault.jpg'
            },
            {
                num: '6',
                title: 'Drake - God’s Plan',
                desc: '드레이크의 대표곡. 외힙 입문용으로 추천.',
                youtubeVideo: 'https://www.youtube.com/embed/m1a_GqJf02M?autoplay=1',
                img: 'https://i.ytimg.com/vi/m1a_GqJf02M/hqdefault.jpg'
            },
            {
                num: '7',
                title: 'Travis Scott - FE!N ft. Playboi Carti',
                desc: '라이브에서 지진을 일으킨 전설의 곡.',
                youtubeVideo: 'https://www.youtube.com/embed/B9synWjqBn8?autoplay=1',
                img: 'https://i.ytimg.com/vi/B9synWjqBn8/hqdefault.jpg'
            },
            {
                num: '8',
                title: 'Lil Uzi Vert - 20 Min',
                desc: '비트가 너무 맛있는 곡.',
                youtubeVideo: 'https://www.youtube.com/embed/bnFa4Mq5PAM?autoplay=1',
                img: 'https://i.ytimg.com/vi/bnFa4Mq5PAM/hqdefault.jpg'
            },
            {
                num: '9',
                title: 'Central Cee - Doja',
                desc: 'UK Drill 장르를 전세계적으로 알린 곡.',
                youtubeVideo: 'https://www.youtube.com/embed/_VuJA-VQRcY?autoplay=1',
                img: 'https://i.ytimg.com/vi/_VuJA-VQRcY/hqdefault.jpg'
            },
        ]
    }
];

// J-POP & 애니 OST 플레이리스트 상세 데이터
window.secret1JpopData = [
    {
        title: '건우의 J-POP 플레이리스트',
        desc: '특유의 감성과 멜로디라인이 돋보이는 힐링 J-POP 추천곡입니다.',
        tags: 'J-POP, Band',
        period: '2026',
        role: '플레이리스트',
        img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
        displayTags: ['J-POP', 'Band Sound'],
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
                title: 'ZUTOMAYO – STUDY ME',
                desc: 'ACAね의 도입부 보컬이 너무 매력적인 곡.',
                youtubeVideo: 'https://www.youtube.com/embed/Atvsg_zogxo?autoplay=1&enablejsapi=1&rel=0',
                img: 'https://i.ytimg.com/vi/Atvsg_zogxo/maxresdefault.jpg'
            },
            {
                num: '3',
                title: 'Official髭男dism - Pretender',
                desc: '히게단 특유의 감성적이고 애절한 팝 록 명곡.',
                youtubeVideo: 'https://www.youtube.com/embed/TQ8WlA2GXbk?autoplay=1',
                img: 'https://i.ytimg.com/vi/TQ8WlA2GXbk/maxresdefault.jpg'
            },
            {
                num: '4',
                title: 'YOASOBI - 群青(군청)',
                desc: '청량한 사운드가 돋보이는 요아소비 대표곡.',
                youtubeVideo: 'https://www.youtube.com/embed/Y4nEEZwckuU?autoplay=1&enablejsapi=1&rel=0',
                img: 'https://i.ytimg.com/vi/Y4nEEZwckuU/maxresdefault.jpg'
            }
        ]
    },
    {
        title: '건우의 애니 OST 플레이리스트',
        desc: '가슴 벅찬 감성과 벅차오르는 명작 애니메이션 주제가 모음.',
        tags: 'Anime OST, Classic',
        period: '2026',
        role: '플레이리스트',
        img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
        displayTags: ['애니 OST', 'Anime'],
        episodes: [
            {
                num: '1',
                title: 'King Gnu - SPECIALZ',
                desc: '주술회전 2기 시부야 사변 오프닝.',
                youtubeVideo: 'https://www.youtube.com/embed/fhzKLBZJC3w?autoplay=1',
                img: 'https://i.ytimg.com/vi/fhzKLBZJC3w/maxresdefault.jpg'
            },
            {
                num: '2',
                title: 'KANA-BOON - Silhouette',
                desc: '그 시절 우리는 모두 닌자였다. 나루토 질풍전 16기 OP.',
                youtubeVideo: 'https://www.youtube.com/embed/hIwGBOexa5w?autoplay=1',
                img: 'https://i.ytimg.com/vi/hIwGBOexa5w/maxresdefault.jpg'
            },
            {
                num: '3',
                title: 'LiSA - 홍련화',
                desc: '귀멸의 칼날 1기 오프닝. 폭발적인 가창력의 대표 OST.',
                youtubeVideo: 'https://www.youtube.com/embed/JoUayamxUtI?autoplay=1',
                img: 'https://i.ytimg.com/vi/JoUayamxUtI/maxresdefault.jpg'
            },
            {
                num: '4',
                title: 'Ado - 역광',
                desc: '원피스 필름 레드 삽입곡. 상징적인 가사가 돋보이는 곡.',
                youtubeVideo: 'https://www.youtube.com/embed/gt-v_YCkaMY?autoplay=1',
                img: 'https://i.ytimg.com/vi/gt-v_YCkaMY/maxresdefault.jpg'
            },
            {
                num: '5',
                title: 'Vaundy - 飛ぶ時(날아오를때)',
                desc: '황천의 츠가이 op. 믿고 듣는 바운디.',
                youtubeVideo: 'https://www.youtube.com/embed/ARj1adoUoEU?autoplay=1',
                img: 'https://i.ytimg.com/vi/ARj1adoUoEU/maxresdefault.jpg'
            },
            {
                num: '6',
                title: 'SPYAIR - 사무라이하트',
                desc: '씹덕들 척추 기립.',
                youtubeVideo: 'https://www.youtube.com/embed/2sy3H9rnk9A?autoplay=1',
                img: 'https://i.ytimg.com/vi/2sy3H9rnk9A/maxresdefault.jpg'
            },
            {
                num: '7',
                title: 'Mrs. GREEN APPLE - Inferno',
                desc: '주인장이 미세스 그린에 입문한 곡. 불꽃 소방대 2기 op.',
                youtubeVideo: 'https://www.youtube.com/embed/wfCcs0vLysk?autoplay=1&enablejsapi=1&rel=0',
                img: 'https://i.ytimg.com/vi/wfCcs0vLysk/maxresdefault.jpg'
            },
            {
                num: '7',
                title: '폴카닷 스팅레이 - 역양',
                desc: '얼음 성벽 보다가 엔딩 나오는 타이밍과 노래가 좋아서 찾아본 곡.',
                youtubeVideo: 'https://www.youtube.com/embed/qbcqvrV6-2Q?autoplay=1&enablejsapi=1&rel=0',
                img: 'https://i.ytimg.com/vi/qbcqvrV6-2Q/maxresdefault.jpg'
            },
        ]
    }
];

// 시크릿 1 전용 커스텀 비디오 모달 오픈 함수
function openSecret1VideoModal(youtubeVideo) {
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const bgIframe = document.getElementById('billboardVideoIframe');

    if (bgIframe && bgIframe.src) {
        bgIframe.src = '';
    }

    let videoId = '';
    if (youtubeVideo.includes('/embed/')) {
        videoId = youtubeVideo.split('/embed/')[1].split('?')[0];
    } else if (youtubeVideo.includes('v=')) {
        videoId = youtubeVideo.split('v=')[1].split('&')[0];
    } else if (youtubeVideo.includes('youtu.be/')) {
        videoId = youtubeVideo.split('youtu.be/')[1].split('?')[0];
    }

    const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`
        : youtubeVideo;

    if (videoModalOverlay) {
        videoModalOverlay.style.display = 'flex';
        videoModalOverlay.style.opacity = '1';
        videoModalOverlay.style.visibility = 'visible';
        videoModalOverlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        if (youtubePlayer) {
            youtubePlayer.src = embedUrl;
        }
    }, 50);
}

// 시크릿 1 전용 커스텀 모달 오픈 지원 함수
function openSecret1CustomModal(data) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const modalPeriod = document.getElementById('modalPeriod');
    const modalRole = document.getElementById('modalRole');
    const modalBanner = document.getElementById('modalBanner');
    const modalEpisodesSection = document.getElementById('modalEpisodesSection');
    const episodesList = document.getElementById('episodesList');

    if (modalTitle) modalTitle.textContent = data.title || '';
    if (modalDesc) modalDesc.innerHTML = data.desc || '';
    if (modalPeriod) modalPeriod.textContent = data.period || '2026';
    if (modalRole) modalRole.textContent = data.role || '시크릿 1 픽';

    if (modalTags) {
        modalTags.innerHTML = '';
        if (data.tags) {
            data.tags.split(',').forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag.trim();
                modalTags.appendChild(tagSpan);
            });
        }
    }

    if (modalBanner && data.img) {
        modalBanner.style.backgroundImage = `linear-gradient(180deg, rgba(24,24,24,0.2) 0%, rgba(24,24,24,1) 100%), url('${data.img}')`;
    }

    if (data.episodes && data.episodes.length > 0 && modalEpisodesSection && episodesList) {
        modalEpisodesSection.style.display = 'block';
        episodesList.innerHTML = data.episodes.map(ep => `
            <div class="episode-item" data-youtube-video="${ep.youtubeVideo}">
                <div class="episode-num">${ep.num}</div>
                <div class="episode-thumb-box">
                    <img src="${ep.img}" class="episode-thumb-img" alt="${ep.title}">
                    <div class="episode-play-overlay">
                        <i class="fa-solid fa-play episode-play-icon"></i>
                    </div>
                </div>
                <div class="episode-info">
                    <div class="episode-title-row">
                        <div class="episode-title">${ep.title}</div>
                    </div>
                    <div class="episode-desc">${ep.desc}</div>
                </div>
            </div>
        `).join('');

        episodesList.querySelectorAll('.episode-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const youtubeVideo = item.dataset.youtubeVideo;
                if (youtubeVideo) {
                    openSecret1VideoModal(youtubeVideo);
                }
            });
        });
    } else if (modalEpisodesSection) {
        modalEpisodesSection.style.display = 'none';
    }

    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 시크릿 1 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret1Active = function () {
    console.log("🔒 [시크릿 1] 프로필 활성화됨: K-POP / 힙합 / J-POP 3개 단락 완전 분리 적용");
    document.documentElement.style.setProperty('--netflix-red', '#00c853');

    setTimeout(() => {
        // 1. Row 2 (힙합 - 국힙 & 외힙) 셋업
        const rowHobbiesEl = document.getElementById('row-hobbies');
        if (rowHobbiesEl) {
            const hobbiesTitle = rowHobbiesEl.querySelector('.row-title');
            if (hobbiesTitle) {
                hobbiesTitle.innerHTML = '<i class="fa-solid fa-fire" style="color:#00e676;"></i> 건우의 힙합 플레이리스트';
            }
            rowHobbiesEl.style.display = 'block';

            const hobbiesCards = rowHobbiesEl.querySelectorAll('.card');
            hobbiesCards.forEach((card, index) => {
                const khiphopData = window.secret1KhiphopData[index] || window.secret1KhiphopData[0];
                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openSecret1CustomModal(khiphopData);
                });
            });
        }

        // 2. Row 3 (J-POP & 애니 OST) 동적 생성 및 셋업
        let jpopRow = document.getElementById('row-secret1-jpop');
        if (!jpopRow) {
            jpopRow = document.createElement('section');
            jpopRow.className = 'row';
            jpopRow.id = 'row-secret1-jpop';

            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.appendChild(jpopRow);
            }
        }

        jpopRow.style.display = 'block';
        jpopRow.innerHTML = `
            <div class="row-header">
                <h2 class="row-title"><i class="fa-solid fa-compact-disc" style="color:#00e676;"></i> 건우의 J-POP & 애니 OST 플레이리스트</h2>
            </div>
            <div class="row-container">
                <div class="row-cards">
                    ${window.secret1JpopData.map((p, idx) => `
                        <div class="card" data-jpop-index="${idx}">
                            <img src="${p.img}" alt="${p.title}" class="card-img">
                            <div class="card-body">
                                <div class="card-title">${p.title}</div>
                                <div class="card-tags">
                                    ${p.displayTags.map(t => `<span class="tag">${t}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        jpopRow.querySelectorAll('.card').forEach(card => {
            const idx = card.dataset.jpopIndex;
            const data = window.secret1JpopData[idx] || window.secret1JpopData[0];
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                openSecret1CustomModal(data);
            });
        });
    }, 50);
};

// 타 프로필 클릭 시 시크릿 1 전용 동적 행 정리 및 제목 원복
function cleanupSecret1ExtraRows() {
    const jpopRow = document.getElementById('row-secret1-jpop');
    if (jpopRow) {
        jpopRow.style.display = 'none';
    }
    const rowHobbiesEl = document.getElementById('row-hobbies');
    const hobbiesTitle = rowHobbiesEl ? rowHobbiesEl.querySelector('.row-title') : null;
    if (hobbiesTitle) {
        hobbiesTitle.innerHTML = '<i class="fa-solid fa-heart" style="color:#e50914;"></i> 내가 찜한 콘텐츠 (취미 & 관심사)';
    }
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.profile-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.dataset.profile !== 'secret1') {
                    cleanupSecret1ExtraRows();
                }
            });
        });
    });
}
