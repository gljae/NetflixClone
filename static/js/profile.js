document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Profile Selection
    const profileOverlay = document.getElementById('profileOverlay');
    const profileCards = document.querySelectorAll('.profile-card');
    const currentProfileName = document.getElementById('currentProfileName');
    const currentMiniAvatar = document.getElementById('currentMiniAvatar');

    // 2. Profile Data & Dynamic Rendering
    const profileData = {
        dev: {
            name: '김건우',
            avatarClass: 'avatar-dev',
            emoji: '💻',
            rowProjectsTitle: '<i class="fa-solid fa-clapperboard" style="color:#E50914;"></i> 지금 뜨는 주요 프로젝트',
            hero: {
                badge: '<i class="fa-solid fa-fire"></i> 오늘 대한민국의 TOP 1 개발자',
                title: '김건우:<br>나의 성장스토리',
                desc: '아직 초보입니다. 잘 부탁드립니다',
                bgYoutube: null,
                bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
                demoYoutube: 'https://www.youtube.com/embed/L_LUpnjgPso?autoplay=1',
                heroInfo: {
                    title: '김건우: 나의 성장스토리',
                    desc: '아직 초보 개발자이지만 끊임없이 배우고 성장하고 있습니다. 잘 부탁드립니다!',
                    tags: 'HTML5, CSS3, JavaScript, Flask, Python',
                    period: '2026',
                    role: '개발자',
                    link: 'https://github.com/hasam031',
                    instagram: 'https://www.instagram.com/rjsdn_0527/',
                    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80'
                }
            },
            projects: [
                {
                    title: 'GEONWOOFLIX 포트폴리오',
                    desc: '넷플릭스 UX/UI를 모티브로 한 나만의 반응형 포트폴리오 웹사이트입니다. 다크 모드, CSS 애니메이션, 모달 상호작용을 적용했습니다.',
                    tags: 'HTML5, CSS3, JavaScript, Flask',
                    period: '2026.08',
                    role: '프론트엔드/기획',
                    link: 'https://github.com/hasam031/GEONWOOFLIX',
                    img: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80',
                    displayTags: ['Vanilla CSS', 'JS ES6']
                }
            ],
            hobbies: [
                {
                    title: '축구',
                    desc: '해외축구를 주로 봅니다. 레스터시티 팬이고 최애 선수는 제이미 바디입니다.',
                    tags: 'Tech Trends, Open Source',
                    period: 'Always',
                    role: 'Explorer',
                    img: 'https://i.ytimg.com/vi/4TNfLrRDIOo/maxresdefault.jpg',
                    displayTags: ['football']
                },
                {
                    title: '음악',
                    desc: '국힙을 주로 듣습니다. 레이지 장르를 제일 좋아하고 요즘은 식케이가 있는 kc 애들 음악을 자주 듣습니다.',
                    tags: 'Tech Trends, Open Source',
                    period: 'Always',
                    role: 'Explorer',
                    img: 'https://i.namu.wiki/i/-CkzYFdfrZRhXsd563liOrktAYOfelR9c1TK1568td0Efxc36v8cQiFXhkzR6IWu2iEJ8Z7wJUDWPJ2198juCw.webp',
                    imgStyle: 'object-position: top center;',
                    displayTags: ['music']
                },
                {
                    title: '게임',
                    desc: '축구 시뮬게임인 fm, 서브컬쳐 게임인 붕괴:스타레일, 명조, 액션 rpg인 엘든링, 몬스터 헌터 등을 좋아합니다.',
                    tags: 'Gaming, UI Experience',
                    period: 'Hobby',
                    role: 'Gamer',
                    img: '/static/img/game_collage.png',
                    displayTags: ['Hobby']
                }
            ]
        },
        guest: {
            name: '시크릿',
            avatarClass: 'avatar-guest',
            emoji: '🔒',
            rowProjectsTitle: '<i class="fa-solid fa-music" style="color:#ffd700;"></i> 🎧 오늘의 추천 플레이리스트',
            hero: {
                badge: '<i class="fa-solid fa-lock" style="color:#ffd700;"></i> SECRET SPECIAL CONTENT',
                title: '시크릿:<br>내맘대로 페이지',
                desc: '아무 컨텐츠나 막 담습니다.',
                bgYoutube: 'https://www.youtube.com/embed/oCvA-i9OTyg?autoplay=1&mute=1&loop=1&playlist=oCvA-i9OTyg&controls=0&showinfo=0&rel=0',
                bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
                demoYoutube: 'https://www.youtube.com/embed/oCvA-i9OTyg?autoplay=1',
                heroInfo: {
                    title: '시크릿: 내맘대로 페이지',
                    desc: '아무 컨텐츠나 막 담습니다.',
                    tags: 'freedom',
                    period: '2026',
                    role: 'Specialist',
                    link: 'https://github.com/gljae/NetflixClone',
                    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80'
                }
            },
            projects: [
                {
                    title: '시크릿 K-HIPHOP 플레이리스트',
                    desc: '시크릿이 엄선한 최고의 명곡 K-힙합 플레이리스트 모음집입니다. 아래 회차 리스트에서 음악을 감상해 보세요!',
                    tags: 'K-HipHop, Playlist',
                    period: '2026',
                    role: '시크릿 픽',
                    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
                    displayTags: ['K-HIPHOP', '시크릿 픽'],
                    episodes: [
                        {
                            num: '1',
                            title: '식케이(Sik-K), Lil Moshpit - LOV3 (Feat. Bryan Chase, Okasian)',
                            desc: 'ㄸㄷㅅ ㅂㅇㅈㅇ ㄷ',
                            youtubeVideo: 'https://www.youtube.com/embed/oCvA-i9OTyg?autoplay=1',
                            img: 'https://i.ytimg.com/vi/oCvA-i9OTyg/maxresdefault.jpg'
                        },
                        {
                            num: '2',
                            title: '창모(CHANGMO) - Hyperstar',
                            desc: '창모의 정규 2집 UGRS의 수록곡, 이 앨범의 최고 뱅어 트랙',
                            youtubeVideo: 'https://www.youtube.com/embed/bL4KyoQWspM?autoplay=1',
                            img: 'https://i.ytimg.com/vi/bL4KyoQWspM/maxresdefault.jpg'
                        },
                        {
                            num: '3',
                            title: 'JUSTHIS(저스디스) - LIT',
                            desc: '이것까지가 lit.',
                            youtubeVideo: 'https://www.youtube.com/embed/mZ1IMxgzzPY?autoplay=1',
                            img: 'https://i.ytimg.com/vi/mZ1IMxgzzPY/hqdefault.jpg'
                        },
                        {
                            num: '4',
                            title: '키드밀리 - 25 (Feat. YANGHONGWON)',
                            desc: '정규 2집 BEIGE 레이지 입문 강추 트랙',
                            youtubeVideo: 'https://www.youtube.com/embed/1JS5Td0MeNE?autoplay=1',
                            img: 'https://i.ytimg.com/vi/1JS5Td0MeNE/hqdefault.jpg'
                        },
                        {
                            num: '5',
                            title: '씨잼 - Pokerface (포커페이스)',
                            desc: '드라이브 할 때 이만한 곡이 없음',
                            youtubeVideo: 'https://www.youtube.com/embed/yrJSc3NKNfc?autoplay=1',
                            img: 'https://i.ytimg.com/vi/yrJSc3NKNfc/hqdefault.jpg'
                        }
                    ]
                },
                {
                    title: '시크릿 K-POP 플레이리스트',
                    desc: '세련된 감성과 트렌디한 사운드의 K-POP 대표 추천곡들입니다.',
                    tags: 'K-POP, Trending',
                    period: '2026',
                    role: '시크릿 픽',
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
                            title: 'STAYC(스테이씨) - BEBE ',
                            desc: '재이의 미친 도입부와 시은의 보컬이 돋보이는 곡. <br> 개인적으로 이 곡이 잘 못뜬게 아쉽다.',
                            youtubeVideo: 'https://www.youtube.com/embed/z-xfGoabprU?autoplay=1',
                            img: 'https://i.ytimg.com/vi/z-xfGoabprU/maxresdefault.jpg'
                        },
                        {
                            num: '3',
                            title: 'CORTIS (코르티스) - FaSHioN',
                            desc: '외국힙합 사운드를 이정도로 k-pop에 완성도 있게 잘 녹여놓은것이 대단하다. <br> 앞으로가 기대되는 아티스트.',
                            youtubeVideo: 'https://www.youtube.com/embed/42wfEs7oIP8?autoplay=1',
                            img: 'https://i.ytimg.com/vi/42wfEs7oIP8/maxresdefault.jpg'
                        }
                    ]
                },
                {
                    title: '시크릿 J-POP & 애니 OST 플레이리스트',
                    desc: '특유의 감성과 멜로디라인이 돋보이는 힐링 J-POP 추천곡입니다.',
                    tags: 'J-POP, Anime OST',
                    period: '2026',
                    role: '시크릿 픽',
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
                            title: 'KANA-BOON - Silhouette',
                            desc: '그 시절 우리는 모두 닌자였다.',
                            youtubeVideo: 'https://www.youtube.com/embed/dlFA0Zq1k2A?autoplay=1',
                            img: 'https://i.ytimg.com/vi/dlFA0Zq1k2A/maxresdefault.jpg'
                        },
                        {
                            num: '3',
                            title: 'Vaundy -飛ぶ時(날아오를때)',
                            desc: '믿고듣는 바운디.',
                            youtubeVideo: 'https://www.youtube.com/embed/ARj1adoUoEU?autoplay=1',
                            img: 'https://i.ytimg.com/vi/ARj1adoUoEU/maxresdefault.jpg'
                        }
                    ]
                }
            ]
        },
        si: { name: '김시은', avatarClass: 'avatar-si', emoji: '💻' },
        nam: { name: '남기제', avatarClass: 'avatar-nam', emoji: '💻' }
    };

    let currentHeroInfo = profileData.dev.hero.heroInfo;
    let currentDemoYoutube = profileData.dev.hero.demoYoutube;

    function renderProfile(type) {
        const data = profileData[type];
        if (!data || !data.hero) return;

        // Save selected profile in localStorage
        localStorage.setItem('selectedProfile', type);

        // Update Navbar Avatar & Name
        currentProfileName.textContent = data.name;
        currentMiniAvatar.className = `mini-avatar ${data.avatarClass}`;
        currentMiniAvatar.textContent = data.emoji;

        // Update Hero Billboard Section
        document.querySelector('.billboard-badge').innerHTML = data.hero.badge;
        document.querySelector('.billboard-title').innerHTML = data.hero.title;
        document.querySelector('.billboard-desc').textContent = data.hero.desc;
        currentHeroInfo = data.hero.heroInfo;
        currentDemoYoutube = data.hero.demoYoutube || 'https://www.youtube.com/embed/L_LUpnjgPso?autoplay=1';

        // Update Billboard Background Video & Image (Secret: Video, Dev: Image)
        const bgContainer = document.getElementById('billboardVideoContainer');
        const bgIframe = document.getElementById('billboardVideoIframe');
        const bgImgEl = document.getElementById('billboardBgImage');

        if (data.hero.bgYoutube && bgContainer && bgIframe) {
            bgIframe.src = data.hero.bgYoutube;
            bgContainer.style.display = 'block';
            if (bgImgEl) bgImgEl.style.opacity = '0';
        } else {
            if (bgContainer) bgContainer.style.display = 'none';
            if (bgIframe) bgIframe.src = '';
            if (bgImgEl) {
                const bgImgUrl = data.hero.bgImage || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80';
                bgImgEl.style.backgroundImage = `url('${bgImgUrl}')`;
                bgImgEl.style.opacity = '1';
            }
        }

        // Update Row Projects Title dynamically (e.g. "오늘의 추천 플레이리스트" for Secret)
        const rowProjectsTitle = document.getElementById('rowProjectsTitle');
        if (rowProjectsTitle && data.rowProjectsTitle) {
            rowProjectsTitle.innerHTML = data.rowProjectsTitle;
        }

        // Render Projects Row
        const projectsContainer = document.querySelector('#row-projects .row-cards');
        if (projectsContainer && data.projects) {
            projectsContainer.innerHTML = data.projects.map(p => {
                const episodesAttr = p.episodes ? `data-episodes="${encodeURIComponent(JSON.stringify(p.episodes))}"` : '';
                return `
                    <div class="card" 
                        data-title="${p.title}"
                        data-desc="${p.desc}"
                        data-tags="${p.tags}"
                        data-period="${p.period}"
                        data-role="${p.role}"
                        data-link="${p.link || ''}"
                        data-instagram="${p.instagram || ''}"
                        ${episodesAttr}>
                        <img src="${p.img}" alt="${p.title}" class="card-img">
                        <div class="card-body">
                            <div class="card-title">${p.title}</div>
                            <div class="card-tags">
                                ${p.displayTags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Render Hobbies Row (Show if data.hobbies exists, hide row if missing)
        const rowHobbiesEl = document.getElementById('row-hobbies');
        const hobbiesContainer = document.querySelector('#row-hobbies .row-cards');

        if (data.hobbies && data.hobbies.length > 0) {
            if (rowHobbiesEl) rowHobbiesEl.style.display = 'block';
            if (hobbiesContainer) {
                hobbiesContainer.innerHTML = data.hobbies.map(h => `
                    <div class="card" 
                        data-title="${h.title}"
                        data-desc="${h.desc}"
                        data-tags="${h.tags}"
                        data-period="${h.period}"
                        data-role="${h.role}">
                        <img src="${h.img}" class="card-img" style="${h.imgStyle || ''}">
                        <div class="card-body">
                            <div class="card-title">${h.title}</div>
                            <div class="card-tags">
                                ${h.displayTags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        } else {
            if (rowHobbiesEl) rowHobbiesEl.style.display = 'none';
        }

        // Rebind click events for newly created cards
        bindCardEvents();
    }

    profileCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const href = card.getAttribute('href');
            if (href && href !== '#') {
                return;
            }

            e.preventDefault();
            const type = card.dataset.profile;
            if (profileData[type] && profileData[type].hero) {
                renderProfile(type);
            }
            profileOverlay.classList.add('hidden');
        });
    });

    // Switch profile when clicking nav avatar
    document.getElementById('profileSwitchBtn').addEventListener('click', () => {
        profileOverlay.classList.remove('hidden');
    });

    // 3. Modal Functionality (Info Modal)
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const modalPeriod = document.getElementById('modalPeriod');
    const modalRole = document.getElementById('modalRole');
    const modalLink = document.getElementById('modalLink');
    const modalInstagramLink = document.getElementById('modalInstagramLink');
    const modalBanner = document.getElementById('modalBanner');

    function openModal(data) {
        modalTitle.textContent = data.title || '프로젝트 상세';
        modalDesc.innerHTML = data.desc || '상세 설명이 없습니다.';
        modalPeriod.textContent = data.period || '2026';
        modalRole.textContent = data.role || '개발자';

        // Set tags
        modalTags.innerHTML = '';
        if (data.tags) {
            data.tags.split(',').forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag.trim();
                modalTags.appendChild(tagSpan);
            });
        }

        // Set GitHub link
        if (modalLink) {
            if (data.link) {
                modalLink.href = data.link;
                modalLink.style.display = 'inline-flex';
            } else {
                modalLink.style.display = 'none';
            }
        }

        // Set Instagram link
        if (modalInstagramLink) {
            if (data.instagram) {
                modalInstagramLink.href = data.instagram;
                modalInstagramLink.style.display = 'inline-flex';
            } else {
                modalInstagramLink.style.display = 'none';
            }
        }

        // Set Banner Image
        if (data.img) {
            modalBanner.style.backgroundImage = `linear-gradient(180deg, rgba(24,24,24,0.2) 0%, rgba(24,24,24,1) 100%), url('${data.img}')`;
        }

        // Render Episodes Section (Netflix Style 1화, 2화, 3화 List)
        const modalEpisodesSection = document.getElementById('modalEpisodesSection');
        const episodesList = document.getElementById('episodesList');

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

            // Click episode -> open video player modal instantly!
            episodesList.querySelectorAll('.episode-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const youtubeVideo = item.dataset.youtubeVideo;
                    if (youtubeVideo) {
                        openVideoModal(youtubeVideo);
                    }
                });
            });
        } else if (modalEpisodesSection) {
            modalEpisodesSection.style.display = 'none';
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // 4. Video Player Modal Functionality (YouTube)
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const videoModalCloseBtn = document.getElementById('videoModalCloseBtn');
    const youtubePlayer = document.getElementById('youtubePlayer');

    function formatYoutubeEmbedUrl(url) {
        if (!url) return '';
        let videoId = '';
        if (url.includes('/embed/')) {
            videoId = url.split('/embed/')[1].split('?')[0];
        } else if (url.includes('v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
        }
        return url;
    }

    let tempBgYoutubeSrc = '';

    function openVideoModal(youtubeUrl) {
        const embedUrl = formatYoutubeEmbedUrl(youtubeUrl);

        // Pause background billboard video to prevent lag & double audio playback
        const bgIframe = document.getElementById('billboardVideoIframe');
        if (bgIframe && bgIframe.src) {
            tempBgYoutubeSrc = bgIframe.src;
            bgIframe.src = '';
        }

        // 1. Show modal instantly with inline style guarantees
        if (videoModalOverlay) {
            videoModalOverlay.style.display = 'flex';
            videoModalOverlay.style.opacity = '1';
            videoModalOverlay.style.visibility = 'visible';
            videoModalOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';

        // 2. Load YouTube iframe unconditionally so video updates 100% reliably
        setTimeout(() => {
            if (youtubePlayer) {
                youtubePlayer.src = embedUrl;
            }
        }, 50);
    }

    function closeVideoModal() {
        if (videoModalOverlay) {
            videoModalOverlay.style.opacity = '0';
            videoModalOverlay.style.visibility = 'hidden';
            videoModalOverlay.classList.remove('active');
        }
        document.body.style.overflow = 'auto';

        // Stop video playback after modal transition completes
        setTimeout(() => {
            if (videoModalOverlay) {
                videoModalOverlay.style.display = 'none';
            }
            if (youtubePlayer) {
                youtubePlayer.src = '';
            }

            // Restore background billboard video if it was running
            const bgIframe = document.getElementById('billboardVideoIframe');
            const currentProfile = localStorage.getItem('selectedProfile');
            if (bgIframe && currentProfile === 'guest' && tempBgYoutubeSrc) {
                bgIframe.src = tempBgYoutubeSrc;
            }
        }, 300);
    }

    if (videoModalCloseBtn) {
        videoModalCloseBtn.addEventListener('click', closeVideoModal);
    }
    if (videoModalOverlay) {
        videoModalOverlay.addEventListener('click', (e) => {
            if (e.target === videoModalOverlay) closeVideoModal();
        });
    }

    function bindCardEvents() {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                let episodes = null;
                if (card.dataset.episodes) {
                    try {
                        episodes = JSON.parse(decodeURIComponent(card.dataset.episodes));
                    } catch (e) {
                        try {
                            episodes = JSON.parse(card.dataset.episodes);
                        } catch (err) { }
                    }
                }

                const data = {
                    title: card.dataset.title,
                    desc: card.dataset.desc,
                    tags: card.dataset.tags,
                    period: card.dataset.period,
                    role: card.dataset.role,
                    link: card.dataset.link,
                    instagram: card.dataset.instagram,
                    img: card.querySelector('img')?.src,
                    episodes: episodes
                };
                openModal(data);
            });
        });
    }

    // Initial card event binding
    bindCardEvents();

    // Hero Billboard buttons
    document.getElementById('heroInfoBtn').addEventListener('click', () => {
        if (currentHeroInfo) {
            openModal(currentHeroInfo);
        }
    });

    document.getElementById('heroPlayBtn').addEventListener('click', () => {
        openVideoModal(currentDemoYoutube);
    });

    // Restore last selected profile from localStorage if exists, default to 'dev'
    const savedProfile = localStorage.getItem('selectedProfile') || 'dev';
    if (profileData[savedProfile] && profileData[savedProfile].hero) {
        renderProfile(savedProfile);
    }
});

