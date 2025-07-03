let isLoggedIn = false; // 로그인 상태를 추적하는 전역 변수

// --- Functions (Globally accessible) ---
const openModal = (content) => {
    console.log("openModal called with content:", content);
    const modalBody = document.getElementById('modal-body');
    const modal = document.getElementById('modal');
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
    console.log("Modal display style after open:", modal.style.display);
};

const closeModal = () => {
    console.log("closeModal called.");
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    console.log("Modal display style after close:", modal.style.display);
};

const updateLoginButtonState = () => {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) { // Check if the button exists on the current page
        if (isLoggedIn) {
            loginBtn.textContent = '로그아웃';
            loginBtn.removeEventListener('click', showLoginModal);
            loginBtn.addEventListener('click', showLogoutConfirmationModal);
        } else {
            loginBtn.textContent = '로그인';
            loginBtn.removeEventListener('click', showLogoutConfirmationModal);
            loginBtn.addEventListener('click', showLoginModal);
        }
    }
};

const createPlayerCard = (player) => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
        <div class="player-status ${player.online ? 'online' : 'offline'}"></div>
        <img src="${player.imageUrl}" alt="${player.name}" class="player-profile-img">
        <img src="https://opgg-static.akamaized.net/images/medals_new/${player.tier.toLowerCase()}_1.png" alt="${player.tier}" class="player-tier-icon">
        <h4 class="player-name">${player.name}</h4>
        <p class="player-info">${player.tier} | ${player.position}</p>
        <div class="manner-temp">
            <span>매너온도</span>
            <strong class="${player.manner >= 90 ? 'text-success' : 'text-warning'}">${player.manner}°C</strong>
        </div>
    `;
    card.addEventListener('click', () => showPlayerProfile(player));
    return card;
};

const showPlayerProfile = (player) => {
    const profileContent = `
        <h2>${player.name}님의 프로필</h2>
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${player.imageUrl}" alt="${player.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary-color);">
        </div>
        <p>티어: ${player.tier}</p>
        <p>주 포지션: ${player.position}</p>
        <p>매너온도: ${player.manner}°C</p>
        <button class="action-btn primary-action">채팅하기</button>
    `;
    openModal(profileContent);
};

const showMatchingOptions = () => {
    console.log('showMatchingOptions called (for #지금바로 듀오 찾기).');
    // Directly show the 1v1 match criteria form
    showMatchCriteriaForm('1v1');
};

const showMatchCriteriaForm = (teamSize) => {
    const criteriaContent = `
        <h2>${teamSize} 매칭</h2>
        <p style="text-align: center;">원하는 매칭 조건을 선택하세요.</p>
        <form id="start-duo-matching-form">
            <div style="margin-bottom: 15px;">
                <label for="matchTier" style="display: block; margin-bottom: 5px;">티어</label>
                <select id="matchTier" name="tier" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 5px;">
                    <option value="any">모든 티어</option>
                    <option value="Challenger">챌린저</option>
                    <option value="Grandmaster">그랜드마스터</option>
                    <option value="Master">마스터</option>
                    <option value="Diamond">다이아몬드</option>
                    <option value="Platinum">플래티넘</option>
                    <option value="Gold">골드</option>
                    <option value="Silver">실버</option>
                    <option value="Bronze">브론즈</option>
                    <option value="Iron">아이언</option>
                </select>
            </div>
            <div style="margin-bottom: 20px;">
                <label for="matchPosition" style="display: block; margin-bottom: 5px;">라인</label>
                <select id="matchPosition" name="position" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 5px;">
                    <option value="any">모든 라인</option>
                    <option value="TOP">탑</option>
                    <option value="JUNGLE">정글</option>
                    <option value="MID">미드</option>
                    <option value="ADC">원딜</option>
                    <option value="SUPPORT">서포터</option>
                </select>
            </div>
            <button type="submit" class="action-btn primary-action" style="width: 100%;">매칭 시작!</button>
        </form>
    `;
    openModal(criteriaContent);

    document.getElementById('start-duo-matching-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedTier = document.getElementById('matchTier').value;
        const selectedPosition = document.getElementById('matchPosition').value;

        const mockPlayers = [
            { name: '페이커', tier: 'Challenger', position: 'MID', manner: 95, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '데프트', tier: 'Grandmaster', position: 'ADC', manner: 88, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '케리아', tier: 'Challenger', position: 'SUPPORT', manner: 92, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '오너', tier: 'Master', position: 'JUNGLE', manner: 85, online: false, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '제우스', tier: 'Challenger', position: 'TOP', manner: 90, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '쵸비', tier: 'Challenger', position: 'MID', manner: 89, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '룰러', tier: 'Grandmaster', position: 'ADC', manner: 91, online: false, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '쇼메이커', tier: 'Master', position: 'MID', manner: 87, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '구마유시', tier: 'Diamond', position: 'ADC', manner: 80, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '제리', tier: 'Platinum', position: 'ADC', manner: 75, online: false, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '아리', tier: 'Gold', position: 'MID', manner: 70, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '가렌', tier: 'Silver', position: 'TOP', manner: 65, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '럭스', tier: 'Bronze', position: 'SUPPORT', manner: 60, online: false, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
            { name: '티모', tier: 'Iron', position: 'TOP', manner: 55, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        ];

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="spinner"></div>
            <p style="text-align: center; margin-top: 20px;">매칭 중... (${selectedTier !== 'any' ? selectedTier : '모든'} 티어, ${selectedPosition !== 'any' ? selectedPosition : '모든'} 라인)</p>
        `;

        setTimeout(() => {
            const filteredPlayers = mockPlayers.filter(player => {
                const tierMatch = (selectedTier === 'any' || player.tier.toLowerCase() === selectedTier.toLowerCase());
                const positionMatch = (selectedPosition === 'any' || player.position.toLowerCase() === selectedPosition.toLowerCase());
                return tierMatch && positionMatch;
            });

            if (filteredPlayers.length > 0) {
                const matchedPlayer = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
                modalBody.innerHTML = `
                    <h2>매칭 성공!</h2>
                    <p style="text-align: center;">다음 플레이어와 매칭되었습니다:</p>
                    <div class="player-card" style="margin: 20px auto; max-width: 250px;">
                        <div class="player-status ${matchedPlayer.online ? 'online' : 'offline'}"></div>
                        <img src="${matchedPlayer.imageUrl}" alt="${matchedPlayer.name}" class="player-profile-img">
                        <img src="https://opgg-static.akamaized.net/images/medals_new/${matchedPlayer.tier.toLowerCase()}_1.png" alt="${matchedPlayer.tier}" class="player-tier-icon">
                        <h4 class="player-name">${matchedPlayer.name}</h4>
                        <p class="player-info">${matchedPlayer.tier} | ${matchedPlayer.position}</p>
                        <div class="manner-temp">
                            <span>매너온도</span>
                            <strong class="${matchedPlayer.manner >= 90 ? 'text-success' : 'text-warning'}">${matchedPlayer.manner}°C</strong>
                        </div>
                    </div>
                    <button class="action-btn primary-action" style="width: 100%;">채팅 시작</button>
                `;
            } else {
                modalBody.innerHTML = `
                    <h2>매칭 실패</h2>
                    <p style="text-align: center;">선택하신 조건에 맞는 플레이어를 찾을 수 없습니다.</p>
                    <button class="action-btn primary-action" style="width: 100%;" onclick="showMatchCriteriaForm('${teamSize}')">다시 시도</button>
                `;
            }
        }, 3000);
    });
};

const showConditionSearch = () => {
    console.log('showConditionSearch called (for #조건에 맞는 친구 찾기).');
    const searchContent = `
        <h2>조건으로 친구 찾기</h2>
        <form id="condition-search-form" style="margin-bottom: 20px;">
            <label for="searchTier" style="display: block; margin-bottom: 5px;">티어</label>
            <select id="searchTier" name="tier" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                <option value="any">모든 티어</option>
                <option value="Challenger">챌린저</option>
                <option value="Grandmaster">그랜드마스터</option>
                <option value="Master">마스터</option>
                <option value="Diamond">다이아몬드</option>
                <option value="Platinum">플래티넘</option>
                <option value="Gold">골드</option>
                <option value="Silver">실버</option>
                <option value="Bronze">브론즈</option>
                <option value="Iron">아이언</option>
            </select>
            <label for="searchPosition" style="display: block; margin-bottom: 5px;">포지션</label>
            <select id="searchPosition" name="position" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                <option value="any">모든 포지션</option>
                <option value="TOP">탑</option>
                <option value="JUNGLE">정글</option>
                <option value="MID">미드</option>
                <option value="ADC">원딜</option>
                <option value="SUPPORT">서포터</option>
            </select>
            <button type="submit" class="action-btn primary-action" style="width: 100%;">검색</button>
        </form>
        <div id="search-results-container">
            <!-- Search results will be displayed here -->
        </div>
    `;
    openModal(searchContent);

    document.getElementById('condition-search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedTier = document.getElementById('searchTier').value;
        const selectedPosition = document.getElementById('searchPosition').value;

        const filtered = mockPlayers.filter(player => {
            const tierMatch = (selectedTier === 'any' || player.tier.toLowerCase() === selectedTier.toLowerCase());
            const positionMatch = (selectedPosition === 'any' || player.position.toLowerCase() === selectedPosition.toLowerCase());
            return tierMatch && positionMatch;
        });

        closeModal(); // Close the modal after search
        renderPlayersToMain(filtered); // Render filtered players to the main page
    });
};

const renderPlayersToMain = (playersToRender) => {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = ''; // Clear current players
    if (playersToRender.length === 0) {
        playerList.innerHTML = '<p style="text-align: center; padding: 20px;">조건에 맞는 친구를 찾을 수 없습니다.</p>';
    } else {
        playersToRender.forEach(player => {
            playerList.appendChild(createPlayerCard(player));
        });
    }
};

const showMyProfileModal = () => {
    if (isLoggedIn) {
        const profileContent = `
            <h2>내 프로필</h2>
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg" alt="My Profile Icon" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary-color);">
            </div>
            <h3>신지#KR1</h3>
            <p>티어: 플래티넘 I</p>
            <p>주 포지션: 미드, 서포터</p>
            <div class="manner-temp" style="justify-content: center;">
                <span>매너온도</span>
                <strong class="text-success">98°C</strong>
            </div>
            <p>자기소개: 안녕하세요! 즐겜 유저입니다. 같이 듀오하실 분 찾아요~</p>
            <button class="action-btn primary-action" style="width: 100%; margin-top: 20px;">프로필 수정</button>
        `;
        openModal(profileContent);
    } else {
        openModal(`
            <h2>로그인이 필요합니다</h2>
            <p style="text-align: center;">내 프로필을 보려면 먼저 로그인해주세요.</p>
            <button class="action-btn primary-action" style="width: 100%;" onclick="showLoginModal()">로그인하기</button>
        `);
    }
};

const showLoginModal = () => {
    const loginContent = `
        <h2>로그인</h2>
        <form id="login-form">
            <div style="margin-bottom: 15px;">
                <label for="username" style="display: block; margin-bottom: 5px;">아이디</label>
                <input type="text" id="username" placeholder="아이디를 입력하세요" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 5px;">
            </div>
            <div style="margin-bottom: 20px;">
                <label for="password" style="display: block; margin-bottom: 5px;">비밀번호</label>
                <input type="password" id="password" placeholder="비밀번호를 입력하세요" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 5px;">
            </div>
            <button type="submit" class="action-btn primary-action" style="width: 100%;">로그인</button>
            <p style="text-align: center; margin-top: 20px;">계정이 없으신가요? <a href="#" onclick="alert('회원가입 기능은 개발 중입니다!')">회원가입</a></p>
        </form>
    `;
    openModal(loginContent);

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // 가상 로그인 성공 처리
        isLoggedIn = true;
        updateLoginButtonState();
        closeModal();
        alert('로그인 성공! 환영합니다.');
    });
};

const showLogoutConfirmationModal = () => {
    openModal(`
        <h2>로그아웃</h2>
        <p style="text-align: center;">정말 로그아웃하시겠습니까?</p>
        <div style="display: flex; justify-content: space-around; margin-top: 20px;">
            <button class="action-btn secondary-action" onclick="closeModal()">취소</button>
            <button class="action-btn primary-action" id="confirm-logout-btn">로그아웃</button>
        </div>
    `);

    document.getElementById('confirm-logout-btn').addEventListener('click', () => {
        isLoggedIn = false;
        updateLoginButtonState();
        closeModal();
        alert('로그아웃되었습니다.');
    });
};

// New function for LoL Search
const showLoLSearchModal = () => {
    const lolSearchContent = `
        <h2>롤 전적검색</h2>
        <form id="lol-search-form" style="margin-bottom: 20px;">
            <div style="margin-bottom: 15px;">
                <label for="summonerNameInput" style="display: block; margin-bottom: 5px;">소환사 이름 + #태그</label>
                <input type="text" id="summonerNameInput" placeholder="예: Faker#KR1" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 5px;">
            </div>
            <button type="submit" class="action-btn primary-action" style="width: 100%;">검색</button>
        </form>
        <div id="lol-search-results">
            <!-- LoL search results will be displayed here -->
        </div>
    `;
    openModal(lolSearchContent);

    document.getElementById('lol-search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const fullSummonerName = document.getElementById('summonerNameInput').value;
        const [name, tag] = fullSummonerName.split('#');

        const searchResultsDiv = document.getElementById('lol-search-results');
        searchResultsDiv.innerHTML = '<div class="spinner"></div><p style="text-align: center; margin-top: 20px;">전적 검색 중...</p>';

        setTimeout(() => {
            if (name && tag) {
                const mockMatchHistory = `
                    <h3>${name}#${tag}님의 최근 전적</h3>
                    <div class="match-history-item">
                        <p><strong>승리</strong> - 챔피언: 아리, KDA: 10/2/5</p>
                        <p><small>2024-07-01</small></p>
                    </div>
                    <div class="match-history-item">
                        <p><strong>패배</strong> - 챔피언: 이즈리얼, KDA: 3/8/2</p>
                        <p><small>2024-06-30</small></p>
                    </div>
                    <div class="match-history-item">
                        <p><strong>승리</strong> - 챔피언: 가렌, KDA: 7/1/12</p>
                        <p><small>2024-06-29</small></p>
                    </div>
                `;
                searchResultsDiv.innerHTML = mockMatchHistory;
            } else {
                searchResultsDiv.innerHTML = '<p style="color: var(--danger-color); text-align: center;">소환사 이름과 태그를 올바른 형식으로 입력해주세요. (예: Faker#KR1)</p>';
            }
        }, 1500);
    });
};

// New function for Community
const showCommunityPage = () => {
    // Redirect to community.html
    window.location.href = 'community.html';
};

// --- Initial Load (for index.html) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('index.html DOMContentLoaded event fired.');
    const playerList = document.getElementById('player-list');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    // Mock data for players (re-declared for clarity, but ideally shared)
    const mockPlayers = [
        { name: '페이커', tier: 'Challenger', position: 'MID', manner: 95, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '데프트', tier: 'Grandmaster', position: 'ADC', manner: 88, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '케리아', tier: 'Challenger', position: 'SUPPORT', manner: 92, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '오너', tier: 'Master', position: 'JUNGLE', manner: 85, online: false, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '제우스', tier: 'Challenger', position: 'TOP', manner: 90, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '쵸비', tier: 'Challenger', position: 'MID', manner: 89, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '룰러', tier: 'Grandmaster', position: 'ADC', manner: 91, online: false, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '쇼메이커', tier: 'Master', position: 'MID', manner: 87, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '구마유시', tier: 'Diamond', position: 'ADC', manner: 80, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '제리', tier: 'Platinum', position: 'ADC', manner: 75, online: false, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '아리', tier: 'Gold', position: 'MID', manner: 70, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '가렌', tier: 'Silver', position: 'TOP', manner: 65, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '럭스', tier: 'Bronze', position: 'SUPPORT', manner: 60, online: false, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
        { name: '티모', tier: 'Iron', position: 'TOP', manner: 55, online: true, imageUrl: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon4027.jpg' },
    ];

    renderPlayersToMain(mockPlayers); // Render all players initially

    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('modal')) {
            closeModal();
        }
    });

    // Main action buttons
    document.querySelector('.primary-action').addEventListener('click', showMatchingOptions);
    document.querySelector('.secondary-action').addEventListener('click', showConditionSearch);

    // Navigation and Login buttons for index.html
    document.getElementById('community-link-main').addEventListener('click', (e) => { e.preventDefault(); showCommunityPage(); });
    document.getElementById('lol-search-link-main').addEventListener('click', (e) => { e.preventDefault(); showLoLSearchModal(); });
    document.getElementById('my-profile-link-main').addEventListener('click', (e) => { e.preventDefault(); showMyProfileModal(); });
    
    updateLoginButtonState();
});
