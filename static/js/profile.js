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

    // 2. Profile Data & Dynamic Rendering (Loaded from secret1.js, secret2.js, secret3.js)
    const profileData = {
        secret1: window.secret1Data,
        secret2: window.secret2Data,
        secret3: window.secret3Data
    };

    let currentHeroInfo = (profileData.secret1 && profileData.secret1.hero) ? profileData.secret1.hero.heroInfo : null;
    let currentDemoYoutube = (profileData.secret1 && profileData.secret1.hero) ? profileData.secret1.hero.demoYoutube : 'https://www.youtube.com/embed/L_LUpnjgPso?autoplay=1';

    function renderProfile(type) {
        const data = profileData[type];
        if (!data || !data.hero) return;

        // Execute active profile JS hook if present
        if (type === 'secret1' && typeof window.onSecret1Active === 'function') window.onSecret1Active();
        if (type === 'secret2' && typeof window.onSecret2Active === 'function') window.onSecret2Active();
        if (type === 'secret3' && typeof window.onSecret3Active === 'function') window.onSecret3Active();

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
        // 행 제목도 프로필별로 바꿀 수 있게: data.rowHobbiesTitle 이 없으면
        // HTML에 원래 있던 문구("내가 찜한 콘텐츠...")를 그대로 쓴다.
        const rowHobbiesTitleEl = document.getElementById('rowHobbiesTitle');
        if (rowHobbiesTitleEl && data.rowHobbiesTitle) {
            rowHobbiesTitleEl.innerHTML = data.rowHobbiesTitle;
        }

        const rowHobbiesEl = document.getElementById('row-hobbies');
        const hobbiesContainer = document.querySelector('#row-hobbies .row-cards');

        if (data.hobbies && data.hobbies.length > 0) {
            if (rowHobbiesEl) rowHobbiesEl.style.display = 'block';
            if (hobbiesContainer) {
                hobbiesContainer.innerHTML = data.hobbies.map(h => {
                    // projects 카드와 마찬가지로, episodes 가 있으면(예: 가수 -> 노래 목록)
                    // 카드를 눌렀을 때 회차 목록이 뜨도록 data-episodes 를 실어 보낸다.
                    const episodesAttr = h.episodes ? `data-episodes="${encodeURIComponent(JSON.stringify(h.episodes))}"` : '';
                    return `
                    <div class="card"
                        data-title="${h.title}"
                        data-desc="${h.desc}"
                        data-tags="${h.tags}"
                        data-period="${h.period}"
                        data-role="${h.role}"
                        data-episodes-label="${h.episodesLabel || ''}"
                        ${episodesAttr}>
                        <img src="${h.img}" class="card-img" style="${h.imgStyle || ''}">
                        <div class="card-body">
                            <div class="card-title">${h.title}</div>
                            <div class="card-tags">
                                ${h.displayTags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                }).join('');
            }
        } else {
            if (rowHobbiesEl) rowHobbiesEl.style.display = 'none';
        }

        // Render Interests Row (3번째 커스텀 행. data.interests 가 있는 프로필만 노출)
        const rowInterestsTitleEl = document.getElementById('rowInterestsTitle');
        if (rowInterestsTitleEl && data.rowInterestsTitle) {
            rowInterestsTitleEl.innerHTML = data.rowInterestsTitle;
        }

        const rowInterestsEl = document.getElementById('row-interests');
        const interestsContainer = document.querySelector('#row-interests .row-cards');

        if (data.interests && data.interests.length > 0) {
            if (rowInterestsEl) rowInterestsEl.style.display = 'block';
            if (interestsContainer) {
                interestsContainer.innerHTML = data.interests.map(it => {
                    const episodesAttr = it.episodes ? `data-episodes="${encodeURIComponent(JSON.stringify(it.episodes))}"` : '';
                    return `
                    <div class="card"
                        data-title="${it.title}"
                        data-desc="${it.desc}"
                        data-tags="${it.tags}"
                        data-period="${it.period}"
                        data-role="${it.role}"
                        ${episodesAttr}>
                        <img src="${it.img}" class="card-img" style="${it.imgStyle || ''}">
                        <div class="card-body">
                            <div class="card-title">${it.title}</div>
                            <div class="card-tags">
                                ${it.displayTags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                }).join('');
            }
        } else {
            if (rowInterestsEl) rowInterestsEl.style.display = 'none';
        }

        // Render Showoff Row (4번째 커스텀 행. data.showoff 가 있는 프로필만 노출)
        const rowShowoffTitleEl = document.getElementById('rowShowoffTitle');
        if (rowShowoffTitleEl && data.rowShowoffTitle) {
            rowShowoffTitleEl.innerHTML = data.rowShowoffTitle;
        }

        const rowShowoffEl = document.getElementById('row-showoff');
        const showoffContainer = document.querySelector('#row-showoff .row-cards');

        if (data.showoff && data.showoff.length > 0) {
            if (rowShowoffEl) rowShowoffEl.style.display = 'block';
            if (showoffContainer) {
                showoffContainer.innerHTML = data.showoff.map(s => {
                    const episodesAttr = s.episodes ? `data-episodes="${encodeURIComponent(JSON.stringify(s.episodes))}"` : '';
                    return `
                    <div class="card"
                        data-title="${s.title}"
                        data-desc="${s.desc}"
                        data-tags="${s.tags}"
                        data-period="${s.period}"
                        data-role="${s.role}"
                        data-period-label="${s.periodLabel || ''}"
                        data-role-label="${s.roleLabel || ''}"
                        data-tags-label="${s.tagsLabel || ''}"
                        ${episodesAttr}>
                        <img src="${s.img}" class="card-img" style="${s.imgStyle || ''}">
                        <div class="card-body">
                            <div class="card-title">${s.title}</div>
                            <div class="card-tags">
                                ${s.displayTags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                }).join('');
            }
        } else {
            if (rowShowoffEl) rowShowoffEl.style.display = 'none';
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
    const modalPeriodLabel = document.getElementById('modalPeriodLabel');
    const modalRoleLabel = document.getElementById('modalRoleLabel');
    const modalTagsLabel = document.getElementById('modalTagsLabel');
    const modalLink = document.getElementById('modalLink');
    const modalInstagramLink = document.getElementById('modalInstagramLink');
    const modalBanner = document.getElementById('modalBanner');

    function openModal(data) {
        modalTitle.textContent = data.title || '프로젝트 상세';
        modalDesc.innerHTML = data.desc || '상세 설명이 없습니다.';
        modalPeriod.textContent = data.period || '2026';
        modalRole.textContent = data.role || '개발자';

        // 카드별로 "기간/역할/기술 스택" 라벨을 다른 말(예: 나이/크기/성격)로
        // 바꿔서 쓰고 싶을 때를 위한 오버라이드. 없으면 원래 라벨 그대로.
        if (modalPeriodLabel) modalPeriodLabel.textContent = data.periodLabel || '기간';
        if (modalRoleLabel) modalRoleLabel.textContent = data.roleLabel || '역할';
        if (modalTagsLabel) modalTagsLabel.textContent = data.tagsLabel || '기술 스택';

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
            const modalEpisodesLabel = document.getElementById('modalEpisodesLabel');
            if (modalEpisodesLabel) modalEpisodesLabel.textContent = data.episodesLabel || '회차 (에피소드)';
            episodesList.innerHTML = data.episodes.map(ep => `
                <div class="episode-item" data-youtube-video="${ep.youtubeVideo || ''}">
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

            // Click episode -> 유튜브 링크가 있으면 영상 재생, 없으면 사진을 크게 보여준다.
            episodesList.querySelectorAll('.episode-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const youtubeVideo = item.dataset.youtubeVideo;
                    if (youtubeVideo) {
                        openVideoModal(youtubeVideo);
                        return;
                    }
                    const thumbImg = item.querySelector('.episode-thumb-img');
                    if (thumbImg && thumbImg.src) {
                        openImageModal(thumbImg.src, thumbImg.alt);
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

    // 4-1. Image Lightbox Modal (회차 사진을 원본 크기로 크게 보기)
    const imageModalOverlay = document.getElementById('imageModalOverlay');
    const imageModalCloseBtn = document.getElementById('imageModalCloseBtn');
    const imageModalImg = document.getElementById('imageModalImg');

    function openImageModal(src, alt) {
        if (!imageModalOverlay || !imageModalImg) return;
        imageModalImg.src = src;
        imageModalImg.alt = alt || '';
        imageModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
        if (!imageModalOverlay) return;
        imageModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (imageModalImg) imageModalImg.src = '';
        }, 300);
    }

    if (imageModalCloseBtn) {
        imageModalCloseBtn.addEventListener('click', closeImageModal);
    }
    if (imageModalOverlay) {
        imageModalOverlay.addEventListener('click', (e) => {
            if (e.target === imageModalOverlay) closeImageModal();
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
                    periodLabel: card.dataset.periodLabel,
                    roleLabel: card.dataset.roleLabel,
                    tagsLabel: card.dataset.tagsLabel,
                    episodesLabel: card.dataset.episodesLabel,
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

    // Restore last selected profile from localStorage if exists, default to 'secret1'
    const savedProfile = localStorage.getItem('selectedProfile') || 'secret1';
    if (profileData[savedProfile] && profileData[savedProfile].hero) {
        renderProfile(savedProfile);
    } else {
        renderProfile('secret1');
    }
});

