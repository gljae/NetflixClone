/**
 * secret3.js - 시크릿 3 프로필 전용 커스텀 스크립트 및 데이터
 * 
 * 시크릿 3 프로필의 메인 테마, 프로젝트 목록, 취미 및 페이지 꾸미기 로직을 작성할 수 있습니다.
 */

window.secret3Data = {
    key: 'secret3',
    name: '남기재',
    avatarClass: 'avatar-secret3',
    emoji: '',
    rowProjectsTitle: '<i class="fa-solid fa-gamepad" style="color:#ff6f00;"></i> 좋아하는',
    hero: {
        badge: '<i class="fa-solid fa-mask" style="color:#ff6f00;"></i> SECRET 3 CYBER LAB',
        title: 'AI개발자 & 자취',
        desc: '자취생 AI개발자의 연구소입니다.',
        bgYoutube: 'https://www.youtube.com/embed/MSv7NbfbtU8?autoplay=1&mute=1&loop=1&playlist=MSv7NbfbtU8&controls=0&showinfo=0&rel=0',
        bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
        demoYoutube: 'https://www.youtube.com/embed/MSv7NbfbtU8?autoplay=1',
        heroInfo: {
            title: 'Qwen 3.6 35B-A3B 로컬 운영',
            desc: '로컬 모델을 이용해 최적화 AI 연구',
            tags: 'Local, Q4_K_M, MoE',
            period: '2026',
            role: '해보고 싶은 것',
            link: 'https://github.com/',
            img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80'
        }
    },
    projects: [
        {
            title: '자취남 영상 모음집',
            desc: '자취남 영상 중 재미있던 영상만 추려봤습니다.',
            tags: '자취',
            period: '2026',
            role: '시크릿 3 픽',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXI3MS26Gsj_go6Z-wpndIpdOr6wJaJI6ycN3Iz0Gwcg&s=10',
            displayTags: ['Studio', 'livingAlone'],
            episodes: [
                {
                    num: '1',
                    title: '인테리어와 정리정돈이 이정도면 예술이라 부르자 ll 논현 11평 전세',
                    desc: '모든걸 외워서 소개하는',
                    youtubeVideo: 'https://www.youtube.com/watch?v=50BYXr4Bcec',
                    img: '/static/img/gijae01.jpg'
                },
                {
                    num: '2',
                    title: '요즘 강남 하이엔드 오피스텔 근황 l 11평 관리비가 50만원이요..? l 강남 오피스텔 전세',
                    desc: '관리비가 50만원!?',
                    youtubeVideo: 'https://www.youtube.com/watch?v=9L2VzlM-ej8',
                    img: '/static/img/gijae02.jpg'
                }
            ]
        },
        {
            title: 'G무비',
            desc: '영화 드라마 요약',
            tags: '드라마, 영화',
            period: '2026',
            role: '시크릿 3 픽',
            img: '/static/img/gijae13.jpg',
            displayTags: ['Studio', 'livingAlone'],
            episodes: [
                {
                    num: '1',
                    title: '≪유부녀 킬러≫',
                    desc: '미친.. 1억뷰 원작 웹툰 시나리오 보자마자, 공효진이 배우 경력 27년 만에 처음으로 실사 드라마 출연 결심해버린, 싱크로율 58000% 신작',
                    youtubeVideo: 'https://www.youtube.com/watch?v=Zl3U-9QX-38',
                    img: '/static/img/gijae03.jpg'
                },
                {
                    num: '2',
                    title: '≪킬러들의 쇼핑몰≫',
                    desc: '전 세계를 휩쓴 대한민국 최고의 킬러물 1위..',
                    youtubeVideo: 'https://www.youtube.com/watch?v=D9pGhSMT44A',
                    img: '/static/img/gijae05.jpg'
                }
            ]
        }
    ],
    hobbies: [
        {
            title: '노래',
            desc: '좋은 노래들',
            tags: 'Song, artist',
            period: 'Always',
            role: 'Vocalist',
            img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
            displayTags: ['Studio', 'Subculture'],
            episodes: [
                {
                    num: '1',
                    title: '입춘 - 한로로',
                    desc: '나의 발화(發花)를 기록하기 위한 곡입니다. 불확실한 봄맞이를 결심해 준 그대에게 이 곡을 전합니다.',
                    youtubeVideo: 'https://www.youtube.com/watch?v=pNi9PjmbUrI',
                    img: '/static/img/gijae11.jpg'
                },
                {
                    num: '2',
                    title: '탈출속도 - 경서',
                    desc: '지구 중력의 영향을 벗어나 지구를 탈출할 수 있는 속도 초속 11.2km. 너에게 도달하기 위해서는 얼마나의 속도가 필요할까. 누구에게나 앞으로 나아가는 것을 방해하는 것들이 있다. 힘들었던 기억, 상처, 아픔 모든 것을 끊어내고 너에게로 달려가는 지금 우리는 탈출속도에 결국 도달한다.',
                    youtubeVideo: 'https://www.youtube.com/watch?v=YBX9efP15eU&list=RDYBX9efP15eU&start_radio=1',
                    img: '/static/img/gijae12.jpg'
                },
                {
                    num: '2',
                    title: 'I DO ME - KiiiKiii',
                    desc: '지구 중력의 영향을 벗어나 지구를 탈출할 수 있는 속도 초속 11.2km. 너에게 도달하기 위해서는 얼마나의 속도가 필요할까. 누구에게나 앞으로 나아가는 것을 방해하는 것들이 있다. 힘들었던 기억, 상처, 아픔 모든 것을 끊어내고 너에게로 달려가는 지금 우리는 탈출속도에 결국 도달한다.',
                    youtubeVideo: 'https://www.youtube.com/watch?v=hAEfi_SKTEU',
                    img: '/static/img/gijae04.jpg'
                }
            ]
        }
    ]
};

/**
 * hobbies 카드에 episodes 를 붙인다.
 *
 * profile.js 의 hobbies 렌더러는 projects 와 달리 data-episodes 속성을
 * 만들어 주지 않는다. 그래서 hobbies 에 episodes 를 적어도 모달의 회차
 * 목록까지 값이 전달되지 않는다. 렌더링이 끝난 뒤 카드에 직접 채워 넣어
 * 그 간극을 메운다.
 *
 * profile.js 를 고칠 수 있게 되면 이 함수는 통째로 지워도 된다.
 */
function attachHobbyEpisodes() {
    const hobbies = (window.secret3Data && window.secret3Data.hobbies) || [];
    const cards = document.querySelectorAll('#row-hobbies .row-cards .card');

    cards.forEach(card => {
        const hobby = hobbies.find(h => h.title === card.dataset.title);
        if (hobby && hobby.episodes && hobby.episodes.length > 0) {
            // profile.js 가 decodeURIComponent + JSON.parse 로 읽는다.
            card.dataset.episodes = encodeURIComponent(JSON.stringify(hobby.episodes));
        }
    });
}

// 시크릿 3 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret3Active = function () {
    console.log("🕵️ [시크릿 3] 프로필 활성화됨: 네온 오렌지 포인트 테마 적용");
    document.documentElement.style.setProperty('--netflix-red', '#ff6f00');

    // 이 훅은 카드가 그려지기 전에 호출된다. 렌더링이 끝난 뒤로 미룬다.
    setTimeout(attachHobbyEpisodes, 0);
};
