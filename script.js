// script.js

// DOM elements
const mainSectionTabs = document.getElementById('main-section-tabs'); // Main section tabs container
const mainSectionTabButtons = document.querySelectorAll('.main-section-tab-btn'); // All main section tab buttons

const gameTabs = document.getElementById('game-tabs'); // Game tabs container
const headerTitle = document.querySelector('.header-title'); // Reference to the new header title
const gameSelectBtn = document.getElementById('game-select-btn'); // "게임 선택" button
const gameDropdownMenu = document.getElementById('game-dropdown-menu'); // Dropdown menu container
const dropdownGameItems = document.querySelectorAll('.dropdown-game-item'); // Individual game items in dropdown
const myProfileTopNavBtn = document.getElementById('my-profile-top-nav-btn'); // New My Profile top nav button
const myChatHistoryTopNavBtn = document.getElementById('my-chat-history-top-nav-btn'); // New My Chat History top nav button

const recommendedProfilesSection = document.getElementById('recommended-profiles-section'); // Recommended profiles section
const recommendedProfileList = document.getElementById('recommended-profile-list'); // List for recommended profiles

const profileSection = document.getElementById('profile-section');
const nicknameInput = document.getElementById('nickname');
const gameSelect = document.getElementById('game');
const tierSelect = document.getElementById('tier');
const preferredRoleInput = document.getElementById('preferred-role');
const playStyleInput = document.getElementById('play-style');
const regionInput = document.getElementById('region');
const saveProfileBtn = document.getElementById('save-profile-btn');
const backToMainFromProfileBtn = document.getElementById('back-to-main-from-profile');

const aiGeneratedBioTextarea = document.getElementById('ai-generated-bio'); // AI bio textarea
const generateBioBtn = document.getElementById('generate-bio-btn'); // AI bio generation button
const bioLoadingSpinner = document.getElementById('bio-loading-spinner'); // AI bio loading spinner

const findFriendSection = document.getElementById('find-friend-section'); // This section is now hidden by default on main view
const friendList = document.getElementById('friend-list');
const backToMainFromFindBtn = document.getElementById('back-to-main-from-find');

const matchNowSection = document.getElementById('match-now-section');
const startMatchingBtn = document.getElementById('start-matching-btn');
const matchingStatus = document.getElementById('matching-status');
const matchingResult = document.getElementById('matching-result');
const matchedPartnerInfo = document.getElementById('matched-partner-info');
const startChatMatchedBtn = document.getElementById('start-chat-matched');
const backToMainFromMatchBtn = document.getElementById('back-to-main-from-match');

const gameStrategySection = document.getElementById('game-strategy-section'); // New game strategy section
const generateStrategyBtn = document.getElementById('generate-strategy-btn'); // New strategy generation button
const strategyLoadingSpinner = document.getElementById('strategy-loading-spinner'); // New strategy loading spinner
const generatedStrategyText = document.getElementById('generated-strategy-text'); // New strategy textarea
const backToMainFromStrategyBtn = document.getElementById('back-to-main-from-strategy'); // New back button

const chatHistorySection = document.getElementById('chat-history-section'); // New Chat History Section
const chatHistoryList = document.getElementById('chat-history-list'); // List for chat history
const backToMainFromChatHistoryBtn = document.getElementById('back-to-main-from-chat-history'); // Back from chat history


const chatModal = document.getElementById('chat-modal');
const chatPartnerName = document.getElementById('chat-partner-name');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const closeChatBtn = document.getElementById('close-chat-btn');

const gameIdInput = document.getElementById('game-id');

// User profile data (mock)
let userProfile = {
    id: 'user-shinji', // User unique ID
    nickname: '신지',
    game: 'LoL',
    tier: '골드',
    preferredRole: '미드',
    playStyle: '공격적, 소통 위주',
    region: '서울 강남구',
    gameId: '', // 게임 내 닉네임/ID
    mannerTemperature: 36.5, // Initial manner temperature (numeric)
    praisedFriends: [] // Array to store IDs of friends already praised by this user
};

// Currently selected game (for updating friend search button text)
let currentSelectedGameForSearch = '리그 오브 레전드'; // Default value, matching the first game tab

// Mock friend data (with manner temperature)
const mockFriends = [
    { id: 1, nickname: '게임고수민수', game: 'LoL', tier: '플래티넘', preferredRole: '정글', playStyle: '캐리형, 공격적', region: '서울 송파구', mannerTemperature: 38.0 },
    { id: 2, nickname: '즐겜유저하나', game: 'LoL', tier: '실버', preferredRole: '서포터', playStyle: '즐겜, 유쾌함', region: '경기 성남시', mannerTemperature: 36.0 },
    { id: 3, nickname: '롤매니아준', game: 'LoL', tier: '골드', preferredRole: '원딜', playStyle: '안정적, 파밍 위주', region: '서울 서초구', mannerTemperature: 37.5 },
    { id: 4, nickname: '오버워치고수', game: 'Overwatch', tier: '다이아몬드', preferredRole: '딜러', playStyle: '에임 좋음, 공격적', region: '서울 강남구', mannerTemperature: 39.0 },
    { id: 5, nickname: '발로란트장인', game: 'Valorant', tier: '레디언트', preferredRole: '타격대', playStyle: '브레이킹, 피지컬', region: '인천 연수구', mannerTemperature: 39.5 },
    { id: 6, nickname: '칼바람장인', game: 'LoL', tier: '골드', preferredRole: '올라운더', playStyle: '칼바람 위주, 친목', region: '인천 연수구', mannerTemperature: 39.2 },
    { id: 7, nickname: '배그1등', game: 'PUBG', tier: '에이스', preferredRole: '스나이퍼', playStyle: '은신, 헤드샷', region: '부산 해운대구', mannerTemperature: 38.8 },
    { id: 8, nickname: '피파장인', game: 'FC Online', tier: '챌린저', preferredRole: '공격수', playStyle: '개인기, 침투', region: '대구 수성구', mannerTemperature: 37.0 },
    { id: 9, nickname: '메이플전사', game: 'MapleStory', tier: '250', preferredRole: '전사', playStyle: '보스, 사냥', region: '광주 서구', mannerTemperature: 36.8 }
];

// Current matched partner (mock)
let currentMatchedPartner = null;

// 후기 작성 관련 변수
let reviewWritten = false;

// --- UI state management functions ---
function hideAllContentSections() {
    [recommendedProfilesSection, profileSection, findFriendSection, matchNowSection, chatModal, gameStrategySection, chatHistorySection].forEach(sec => sec.classList.add('hidden'));
}

function showSection(sectionElement) {
    hideAllContentSections();
    // mainSectionTabs.classList.add('hidden'); // Main section tabs should remain visible for content navigation
    // gameTabs.classList.add('hidden'); // Game tabs (including title and dropdown) should remain visible
    sectionElement.classList.remove('hidden'); // Show specific section

    // Deactivate all main section tabs, activate none when a top-level section is clicked
    mainSectionTabButtons.forEach(btn => btn.classList.remove('active'));

    // Deactivate all top-nav-tabs
    document.querySelectorAll('.top-nav-tab').forEach(btn => btn.classList.remove('active'));
    document.getElementById('game-select-btn').classList.remove('active'); // Deactivate game select button
}

function showMainView() {
    hideAllContentSections();
    mainSectionTabs.classList.remove('hidden'); // Show main section tabs
    gameTabs.classList.remove('hidden'); // Show game tabs (including title and dropdown)
    recommendedProfilesSection.classList.remove('hidden'); // Show recommended profiles section
    loadRecommendedProfiles(); // Load recommended profiles for the main view
    
    // Ensure the "친구 찾기" tab is active when returning to main view
    mainSectionTabButtons.forEach(btn => btn.classList.remove('active'));
    document.getElementById('find-friend-tab-btn').classList.add('active');

    // Deactivate all top-nav-tabs
    document.querySelectorAll('.top-nav-tab').forEach(btn => btn.classList.remove('active'));
    // Keep game-select-btn as active if it's the default main view
    document.getElementById('game-select-btn').classList.add('active');
}

// --- Profile management ---
function loadProfile() {
    nicknameInput.value = userProfile.nickname;
    gameSelect.value = userProfile.game;
    tierSelect.value = userProfile.tier;
    preferredRoleInput.value = userProfile.preferredRole;
    playStyleInput.value = userProfile.playStyle;
    regionInput.value = userProfile.region;
    gameIdInput.value = userProfile.gameId || '';
    // Clear AI generated bio when loading profile
    aiGeneratedBioTextarea.value = '';
}

function saveProfile() {
    userProfile.nickname = nicknameInput.value;
    userProfile.game = gameSelect.value;
    userProfile.tier = tierSelect.value;
    userProfile.preferredRole = preferredRoleInput.value;
    userProfile.playStyle = playStyleInput.value;
    userProfile.region = regionInput.value;
    userProfile.gameId = gameIdInput.value;
    alertMessage('프로필이 성공적으로 저장되었습니다!', 'success');

    const savedGameName = document.querySelector(`.dropdown-game-item[data-game-id="${userProfile.game}"]`)?.dataset.gameName || '리그 오브 레전드';
    currentSelectedGameForSearch = savedGameName;
    
    // Update the text of the main navigation buttons (which are now tabs)
    document.getElementById('find-friend-tab-btn').textContent = `${savedGameName} 친구 찾기`;
    document.getElementById('match-now-tab-btn').textContent = `${savedGameName} 지금 매칭`;

    // Update the active state of the dropdown item
    dropdownGameItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.dropdown-game-item[data-game-id="${userProfile.game}"]`)?.classList.add('active');
}

// --- Gemini API Call for AI Profile Bio Generation ---
async function generateProfileBio() {
    // Show loading spinner and disable button
    generateBioBtn.disabled = true;
    bioLoadingSpinner.classList.remove('hidden');
    aiGeneratedBioTextarea.value = 'AI가 프로필 문구를 생성 중입니다...';

    // Get game name from the select element's option text
    const selectedGameOption = document.querySelector(`#game option[value="${userProfile.game}"]`);
    const gameName = selectedGameOption ? selectedGameOption.textContent.split('(')[0].trim() : userProfile.game;

    const prompt = `
    다음 사용자 프로필 정보를 바탕으로 게임 친구 매칭 앱에서 사용할 매력적이고 친근한 자기소개 문구를 50자 이내로 생성해 주세요.
    사용자 닉네임: ${userProfile.nickname}
    주요 게임: ${gameName}
    티어: ${userProfile.tier}
    선호 포지션: ${userProfile.preferredRole}
    플레이 스타일: ${userProfile.playStyle}
    지역: ${userProfile.region || '정보 없음'}

    예시:
    "안녕하세요! 롤 골드 미드 유저입니다. 공격적이고 소통 위주 플레이를 선호해요. 같이 즐겜하실 분 찾아요!"
    "오버워치 다이아 딜러, 에임 좋고 공격적인 플레이 좋아해요! 팀워크 중시하는 듀오 환영합니다."
    `;

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const generatedText = result.candidates[0].content.parts[0].text;
            aiGeneratedBioTextarea.value = generatedText.trim();
            alertMessage('프로필 문구가 성공적으로 생성되었습니다!', 'success');
        } else {
            aiGeneratedBioTextarea.value = '문구 생성에 실패했습니다. 다시 시도해주세요.';
            alertMessage('문구 생성 실패!', 'error');
            console.error('Gemini API response structure unexpected:', result);
        }
    } catch (error) {
        aiGeneratedBioTextarea.value = '문구 생성 중 오류가 발생했습니다.';
        alertMessage('오류 발생!', 'error');
        console.error('Error calling Gemini API:', error);
    } finally {
        // Hide loading spinner and enable button
        bioLoadingSpinner.classList.add('hidden');
        generateBioBtn.disabled = false;
    }
}

// --- Gemini API Call for Game Strategy Generation (New Feature) ---
async function generateGameStrategy() {
    // Show loading spinner and disable button
    generateStrategyBtn.disabled = true;
    strategyLoadingSpinner.classList.remove('hidden');
    generatedStrategyText.value = 'AI가 전략 팁을 생성 중입니다...';
    document.getElementById('strategy-result').classList.add('hidden'); // Hide previous result

    // Get game name from the select element's option text
    const selectedGameOption = document.querySelector(`#game option[value="${userProfile.game}"]`);
    const gameName = selectedGameOption ? selectedGameOption.textContent.split('(')[0].trim() : userProfile.game;

    const prompt = `
    당신은 인기 게임의 전략 전문가입니다. 다음 게임 정보에 기반하여, ${gameName} 게임의 ${userProfile.tier} 티어 ${userProfile.preferredRole} 포지션 플레이어를 위한 실용적인 게임 전략 팁 3가지를 생성해주세요. 각 팁은 25자 이내로 간결하게 작성하고, 번호가 매겨진 목록으로 제공해주세요.

    예시 출력 형식:
    1. 초반 라인전 압박
    2. 오브젝트 싸움 합류
    3. 시야 장악 중요성
    `;

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const generatedTips = result.candidates[0].content.parts[0].text;
            generatedStrategyText.value = generatedTips.trim();
            document.getElementById('strategy-result').classList.remove('hidden'); // Show result
            alertMessage('전략 팁이 성공적으로 생성되었습니다!', 'success');
        } else {
            generatedStrategyText.value = '전략 팁 생성에 실패했습니다. 다시 시도해주세요.';
            alertMessage('전략 팁 생성 실패!', 'error');
            console.error('Gemini API response structure unexpected:', result);
        }
    } catch (error) {
        generatedStrategyText.value = '전략 팁 생성 중 오류가 발생했습니다.';
        alertMessage('오류 발생!', 'error');
        console.error('Error calling Gemini API:', error);
    } finally {
        // Hide loading spinner and enable button
        strategyLoadingSpinner.classList.add('hidden');
        generateStrategyBtn.disabled = false;
    }
}


// --- Load recommended profiles section ---
function loadRecommendedProfiles() {
    recommendedProfileList.innerHTML = ''; // Clear existing list
    // Show recommended profiles based on the currently selected game tab
    const profilesToShow = mockFriends.filter(friend => friend.game === userProfile.game).slice(0, 6); 

    if (profilesToShow.length === 0) {
        recommendedProfileList.innerHTML = `<p class="text-center text-gray-500 text-lg">추천 프로필이 없습니다.</p>`;
        return;
    }

    profilesToShow.forEach(friend => {
        const isPraised = userProfile.praisedFriends.includes(friend.id);
        const praiseButtonText = isPraised ? '칭찬 취소' : '칭찬하기 (+0.5°C)';
        const praiseButtonClass = isPraised ? 'btn-secondary' : 'btn-primary';

        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.innerHTML = `
            <p class="font-bold text-xl text-gray-900">${friend.nickname}</p>
            <p class="text-gray-700">게임 ID: <span class="font-mono">${friend.gameId || '-'}</span></p>
            <p class="text-gray-700">게임: ${friend.game}</p>
            <p class="text-gray-700">티어: ${friend.tier}</p>
            <p class="text-gray-700">포지션: ${friend.preferredRole}</p>
            <p class="text-gray-700">스타일: ${friend.playStyle}</p>
            <p class="text-gray-700">지역: ${friend.region}</p>
            <p class="text-gray-700 font-semibold text-blue-600">매너 온도: ${friend.mannerTemperature.toFixed(1)}°C</p>
            <div class="grid grid-cols-2 gap-2 mt-4">
                <button class="btn btn-secondary chat-btn" data-friend-id="${friend.id}" data-friend-name="${friend.nickname}">채팅하기</button>
                <button class="btn ${praiseButtonClass} feedback-btn" data-friend-id="${friend.id}">${praiseButtonText}</button>
                <button class="btn btn-outline add-friend-btn col-span-1" data-friend-id="${friend.id}">친구추가</button>
                <button class="btn btn-success quick-match-btn col-span-1" data-friend-id="${friend.id}">바로매칭</button>
            </div>
        `;
        recommendedProfileList.appendChild(profileCard);
    });

    document.querySelectorAll('#recommended-profile-list .chat-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const friendId = event.target.dataset.friendId;
            const friendName = event.target.dataset.friendName;
            openChatModal(friendId, friendName);
        });
    });

    document.querySelectorAll('#recommended-profile-list .feedback-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const friendId = parseInt(event.target.dataset.friendId);
            const target = mockFriends.find(f => f.id === friendId);
            const isPraised = userProfile.praisedFriends.includes(friendId);
            if (!isPraised) {
                giveFeedback(friendId, 'positive');
                userProfile.praisedFriends.push(friendId);
                event.target.textContent = '칭찬 취소';
                event.target.classList.remove('btn-primary');
                event.target.classList.add('btn-secondary');
                alertMessage(`${target.nickname}님을 칭찬했습니다!`, 'success');
            } else {
                target.mannerTemperature = Math.max(30.0, target.mannerTemperature - 0.5);
                userProfile.praisedFriends = userProfile.praisedFriends.filter(id => id !== friendId);
                event.target.textContent = '칭찬하기 (+0.5°C)';
                event.target.classList.remove('btn-secondary');
                event.target.classList.add('btn-primary');
                alertMessage(`${target.nickname}님의 칭찬이 취소되었습니다. (${target.mannerTemperature.toFixed(1)}°C)`, 'info');
            }
        });
    });
}

// --- Load friend search section ---
function loadFriendList() {
    friendList.innerHTML = ''; // Clear existing list
    const filteredFriends = mockFriends.filter(friend => friend.game === userProfile.game);

    if (filteredFriends.length === 0) {
        friendList.innerHTML = `<p class="text-center text-gray-500 text-lg">아직 ${userProfile.game} 친구가 없습니다.</p>`;
        return;
    }

    filteredFriends.forEach(friend => {
        const isPraised = userProfile.praisedFriends.includes(friend.id);
        const praiseButtonText = isPraised ? '칭찬 취소' : '칭찬하기 (+0.5°C)';
        const praiseButtonClass = isPraised ? 'btn-secondary' : 'btn-primary';

        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.innerHTML = `
            <p class="font-bold text-xl text-gray-900">${friend.nickname}</p>
            <p class="text-gray-700">게임: ${friend.game}</p>
            <p class="text-gray-700">티어: ${friend.tier}</p>
            <p class="text-gray-700">포지션: ${friend.preferredRole}</p>
            <p class="text-gray-700">스타일: ${friend.playStyle}</p>
            <p class="text-gray-700">지역: ${friend.region}</p>
            <p class="text-gray-700 font-semibold text-blue-600">매너 온도: ${friend.mannerTemperature.toFixed(1)}°C</p>
            <div class="grid grid-cols-2 gap-2 mt-4">
                <button class="btn btn-secondary chat-btn" data-friend-id="${friend.id}" data-friend-name="${friend.nickname}">채팅하기</button>
                <button class="btn ${praiseButtonClass} feedback-btn" data-friend-id="${friend.id}">${praiseButtonText}</button>
                <button class="btn btn-outline add-friend-btn col-span-1" data-friend-id="${friend.id}">친구추가</button>
                <button class="btn btn-success quick-match-btn col-span-1" data-friend-id="${friend.id}">바로매칭</button>
            </div>
        `;
        friendList.appendChild(profileCard);
    });

    document.querySelectorAll('#friend-list .chat-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const friendId = event.target.dataset.friendId;
            const friendName = event.target.dataset.friendName;
            openChatModal(friendId, friendName);
        });
    });

    document.querySelectorAll('#friend-list .feedback-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const friendId = parseInt(event.target.dataset.friendId);
            const target = mockFriends.find(f => f.id === friendId);
            const isPraised = userProfile.praisedFriends.includes(friendId);
            if (!isPraised) {
                giveFeedback(friendId, 'positive');
                userProfile.praisedFriends.push(friendId);
                event.target.textContent = '칭찬 취소';
                event.target.classList.remove('btn-primary');
                event.target.classList.add('btn-secondary');
                alertMessage(`${target.nickname}님을 칭찬했습니다!`, 'success');
            } else {
                target.mannerTemperature = Math.max(30.0, target.mannerTemperature - 0.5);
                userProfile.praisedFriends = userProfile.praisedFriends.filter(id => id !== friendId);
                event.target.textContent = '칭찬하기 (+0.5°C)';
                event.target.classList.remove('btn-secondary');
                event.target.classList.add('btn-primary');
                alertMessage(`${target.nickname}님의 칭찬이 취소되었습니다. (${target.mannerTemperature.toFixed(1)}°C)`, 'info');
            }
        });
    });
}

// --- Manner temperature feedback function ---
function giveFeedback(targetId, type) {
    const target = mockFriends.find(f => f.id === targetId);
    if (target) {
        if (type === 'positive') {
            target.mannerTemperature = Math.min(40.0, target.mannerTemperature + 0.5); // Max 40 degrees Celsius
            userProfile.praisedFriends.push(targetId); // Add friend to praised list
            alertMessage(`${target.nickname}님의 매너 온도가 상승했습니다! (${target.mannerTemperature.toFixed(1)}°C)`, 'success');
        } else if (type === 'negative') {
            target.mannerTemperature = Math.max(30.0, target.mannerTemperature - 1.0); // Min 30 degrees Celsius
            alertMessage(`${target.nickname}님의 매너 온도가 감소했습니다. (${target.mannerTemperature.toFixed(1)}°C)`, 'error');
        }
    }
}

// --- Match Now section ---
function startMatching() {
    const teamSizeSelect = document.getElementById('team-size');
    const teamSize = parseInt(teamSizeSelect ? teamSizeSelect.value : '1', 10);
    // 매칭 조건 값 읽기
    const matchTier = document.getElementById('match-tier')?.value || '';
    const matchRole = document.getElementById('match-role')?.value.trim() || '';
    const matchRegion = document.getElementById('match-region')?.value.trim() || '';

    matchingStatus.classList.remove('hidden');
    matchingResult.classList.add('hidden');
    startMatchingBtn.classList.add('hidden');

    setTimeout(() => {
        matchingStatus.classList.add('hidden');
        matchingResult.classList.remove('hidden');
        startMatchingBtn.classList.remove('hidden');

        // 조건에 맞는 후보 필터링
        let candidates = mockFriends.filter(f => f.game === userProfile.game);
        if (matchTier) candidates = candidates.filter(f => f.tier === matchTier);
        if (matchRole) candidates = candidates.filter(f => f.preferredRole && f.preferredRole.includes(matchRole));
        if (matchRegion) candidates = candidates.filter(f => f.region && f.region.includes(matchRegion));

        if (teamSize === 1) {
            // 1:1 매칭
            currentMatchedPartner = candidates.find(f => f.tier === userProfile.tier && Math.abs(f.mannerTemperature - userProfile.mannerTemperature) < 2) ||
                                    candidates.find(f => f.tier === userProfile.tier) ||
                                    candidates[0];
            if (!currentMatchedPartner) {
                matchedPartnerInfo.innerHTML = `<p class="text-red-600 font-bold">조건에 맞는 파트너를 찾을 수 없습니다.</p>`;
                alertMessage('조건에 맞는 파트너가 없습니다.', 'error');
                return;
            }
            const isPraisedMatched = userProfile.praisedFriends.includes(currentMatchedPartner.id);
            const praiseButtonStateMatched = isPraisedMatched ? 'disabled' : '';
            const praiseButtonTextMatched = isPraisedMatched ? '칭찬 완료' : '칭찬하기 (+0.5°C)';

            matchedPartnerInfo.innerHTML = `
                <p class="font-bold text-xl text-gray-900">${currentMatchedPartner.nickname}</p>
                <p class="text-gray-700">게임: ${currentMatchedPartner.game}</p>
                <p class="text-gray-700">티어: ${currentMatchedPartner.tier}</p>
                <p class="text-gray-700">포지션: ${currentMatchedPartner.preferredRole}</p>
                <p class="text-gray-700">스타일: ${currentMatchedPartner.playStyle}</p>
                <p class="text-gray-700">지역: ${currentMatchedPartner.region}</p>
                <p class="text-gray-700 font-semibold text-blue-600">매너 온도: ${currentMatchedPartner.mannerTemperature.toFixed(1)}°C</p>
                <div class="flex gap-3 mt-4" id="feedback-btn-group" style="display:none;">
                    <button class="btn btn-primary flex-1 feedback-btn-matched" data-friend-id="${currentMatchedPartner.id}">칭찬하기 (+0.5°C)</button>
                    <button class="btn btn-danger flex-1 report-btn-matched" data-friend-id="${currentMatchedPartner.id}">비매너 신고 (-1.0°C)</button>
                </div>
                <div class="flex gap-3 mt-2" id="undo-btn-group" style="display:none;">
                    <button class="btn btn-secondary flex-1 undo-feedback-btn">평가 취소</button>
                </div>
            `;
        } else {
            // 다대다(팀) 매칭
            if (candidates.length < teamSize - 1) {
                matchedPartnerInfo.innerHTML = `<p class="text-red-600 font-bold">조건에 맞는 팀원을 충분히 찾을 수 없습니다.</p>`;
                alertMessage('조건에 맞는 팀원이 부족합니다.', 'error');
                return;
            }
            const shuffled = [...candidates].sort(() => 0.5 - Math.random());
            const team = [userProfile, ...shuffled.slice(0, teamSize - 1)];
            matchedPartnerInfo.innerHTML = `
                <p class="font-bold text-xl text-gray-900">팀 매칭 결과 (${teamSize}인 팀)</p>
                <ul class="mt-4">
                    ${team.map(member => `
                        <li class="mb-2">
                            <span class="font-semibold">${member.nickname}</span> (${member.tier || member.tier === 0 ? member.tier : ''}, ${member.preferredRole || ''}, ${member.region || ''})
                        </li>
                    `).join('')}
                </ul>
            `;
        }
        alertMessage('매칭이 완료되었습니다!', 'success');

        // 1:1 매칭일 때만 칭찬/신고 버튼 이벤트 (채팅 후에만 활성화)
        if (teamSize === 1 && currentMatchedPartner) {
            // 채팅 시작 버튼 클릭 시 평가 버튼 활성화
            startChatMatchedBtn.addEventListener('click', () => {
                document.getElementById('feedback-btn-group').style.display = 'flex';
            });
            // 칭찬/신고 버튼 이벤트
            let lastFeedback = null;
            document.querySelector('.feedback-btn-matched').addEventListener('click', (event) => {
                const friendId = parseInt(event.target.dataset.friendId);
                giveFeedback(friendId, 'positive');
                lastFeedback = { type: 'positive', friendId };
                event.target.disabled = true;
                document.querySelector('.report-btn-matched').disabled = true;
                document.getElementById('undo-btn-group').style.display = 'flex';
            });
            document.querySelector('.report-btn-matched').addEventListener('click', (event) => {
                const friendId = parseInt(event.target.dataset.friendId);
                giveFeedback(friendId, 'negative');
                lastFeedback = { type: 'negative', friendId };
                event.target.disabled = true;
                document.querySelector('.feedback-btn-matched').disabled = true;
                document.getElementById('undo-btn-group').style.display = 'flex';
            });
            // 평가 취소 버튼 이벤트
            document.querySelector('.undo-feedback-btn').addEventListener('click', () => {
                if (lastFeedback) {
                    const target = mockFriends.find(f => f.id === lastFeedback.friendId);
                    if (lastFeedback.type === 'positive') {
                        target.mannerTemperature = Math.max(30.0, target.mannerTemperature - 0.5);
                        // 칭찬 취소 시 praisedFriends에서 제거
                        userProfile.praisedFriends = userProfile.praisedFriends.filter(id => id !== lastFeedback.friendId);
                        alertMessage(`${target.nickname}님의 칭찬이 취소되었습니다. (${target.mannerTemperature.toFixed(1)}°C)`, 'info');
                    } else if (lastFeedback.type === 'negative') {
                        target.mannerTemperature = Math.min(40.0, target.mannerTemperature + 1.0);
                        alertMessage(`${target.nickname}님의 신고가 취소되었습니다. (${target.mannerTemperature.toFixed(1)}°C)`, 'info');
                    }
                    // 버튼 상태 복구
                    document.querySelector('.feedback-btn-matched').disabled = false;
                    document.querySelector('.report-btn-matched').disabled = false;
                    document.getElementById('undo-btn-group').style.display = 'none';
                }
            });
        }
    }, 3000);
}

// --- Chat History Section ---
function loadChatHistory() {
    // This is a mock-up. In a real app, this would load actual chat data.
    chatHistoryList.innerHTML = '';
    const chatPartners = mockFriends.slice(0, 3); // Just show a few for mock history

    chatPartners.forEach(partner => {
        const chatHistoryCard = document.createElement('div');
        chatHistoryCard.className = 'profile-card';
        chatHistoryCard.innerHTML = `
            <p class="font-bold text-xl text-gray-900">${partner.nickname} 님</p>
            <p class="text-gray-700">마지막 대화: "안녕하세요! 같이 게임하실래요?" (${Math.floor(Math.random() * 7) + 1}일 전)</p>
            <button class="btn btn-secondary mt-4 chat-btn" data-friend-id="${partner.id}" data-friend-name="${partner.nickname}">채팅 계속하기</button>
        `;
        chatHistoryList.appendChild(chatHistoryCard);
    });

    document.querySelectorAll('#chat-history-list .chat-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const friendId = event.target.dataset.friendId;
            const friendName = event.target.dataset.friendName;
            openChatModal(friendId, friendName);
        });
    });
}


// --- Chat Modal ---
function openChatModal(partnerId, partnerName) {
    // Hide all main content sections and then show the chat modal
    hideAllContentSections();
    chatModal.classList.remove('hidden');

    chatPartnerName.textContent = `${partnerName}님과의 채팅`;
    chatMessages.innerHTML = '';
    addChatMessage('other', `${partnerName}님: 안녕하세요! 같이 게임하실래요?`);
    addChatMessage('user', `${userProfile.nickname}: 네 좋아요! 어떤 챔피언 주로 하시나요?`);
}

function addChatMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addChatMessage('user', `${userProfile.nickname}: ${message}`);
        chatInput.value = '';
        setTimeout(() => {
            addChatMessage('other', `${chatPartnerName.textContent.split('님')[0]}님: 네! 저도 좋아요. 곧 시작할까요?`);
        }, 1000);
    }
}

// --- Message box (replaces alert) ---
function alertMessage(message, type = 'info') {
    const container = document.querySelector('body');
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed bottom-8 right-8 p-4 rounded-lg shadow-lg text-white z-50 alert-message`;

    if (type === 'success') {
        alertDiv.classList.add('success');
    } else if (type === 'error') {
        alertDiv.classList.add('error');
    } else {
        alertDiv.classList.add('info');
    }
    alertDiv.textContent = message;
    container.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.transform = 'translateY(0)';
        alertDiv.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        alertDiv.style.transform = 'translateY(100%)';
        alertDiv.style.opacity = '0';
        alertDiv.addEventListener('transitionend', () => alertDiv.remove());
    }, 3000);
}

// --- Event Listeners ---

// Top navigation tab clicks
myProfileTopNavBtn.addEventListener('click', () => {
    showSection(profileSection);
    loadProfile();
    // Deactivate other top-nav-tabs and game-select-btn
    document.querySelectorAll('.top-nav-tab').forEach(btn => btn.classList.remove('active'));
    document.getElementById('game-select-btn').classList.remove('active');
    myProfileTopNavBtn.classList.add('active'); // Activate this tab
});

myChatHistoryTopNavBtn.addEventListener('click', () => {
    showSection(chatHistorySection);
    loadChatHistory(); // Load mock chat history
    // Deactivate other top-nav-tabs and game-select-btn
    document.querySelectorAll('.top-nav-tab').forEach(btn => btn.classList.remove('active'));
    document.getElementById('game-select-btn').classList.remove('active');
    myChatHistoryTopNavBtn.classList.add('active'); // Activate this tab
});


// Main section tab click event
mainSectionTabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        mainSectionTabButtons.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');

        // Deactivate all top-nav-tabs
        document.querySelectorAll('.top-nav-tab').forEach(btn => btn.classList.remove('active'));
        document.getElementById('game-select-btn').classList.add('active'); // Keep game select active if it's main content

        const targetSectionId = event.currentTarget.dataset.section;
        const targetSectionElement = document.getElementById(targetSectionId);

        // Show only the selected section, hide others
        hideAllContentSections();
        targetSectionElement.classList.remove('hidden');

        // For "친구 찾기" tab, specifically load friend list if it's the target
        if (targetSectionId === 'recommended-profiles-section') {
            loadRecommendedProfiles();
        } else if (targetSectionId === 'find-friend-section') { // This is actually 'recommended-profiles-section' now, but keeping for clarity
            document.querySelector('#find-friend-section .section-title').textContent = `${currentSelectedGameForSearch} 친구 찾기`;
            loadFriendList();
        } else if (targetSectionId === 'match-now-section') {
            document.querySelector('#match-now-section .section-title').textContent = `${userProfile.game} 지금 매칭`;
        } else if (targetSectionId === 'game-strategy-section') {
            // Reset strategy section when entering it
            generatedStrategyText.value = '';
            document.getElementById('strategy-result').classList.add('hidden');
            document.querySelector('#game-strategy-section .section-title').textContent = `✨ ${userProfile.game} 전략 & 팁`;
            document.querySelector('#game-strategy-section p.text-xl').textContent = `현재 프로필을 기반으로 ${userProfile.game} 게임의 전략 팁을 생성합니다.`;
        }
    });
});

// Game Select button hover/click to toggle dropdown
gameSelectBtn.addEventListener('mouseenter', () => {
    gameDropdownMenu.classList.add('visible');
});

gameDropdownMenu.addEventListener('mouseleave', () => {
    gameDropdownMenu.classList.remove('visible');
});

// Hide dropdown if clicked outside
document.addEventListener('click', (event) => {
    if (!gameSelectBtn.contains(event.target) && !gameDropdownMenu.contains(event.target)) {
        gameDropdownMenu.classList.remove('visible');
    }
});


// Dropdown game item click event
dropdownGameItems.forEach(button => {
    button.addEventListener('click', (event) => {
        // Remove 'active' class from all dropdown items
        dropdownGameItems.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked dropdown item
        event.currentTarget.classList.add('active');

        const gameName = event.currentTarget.dataset.gameName;
        const gameId = event.currentTarget.dataset.gameId;
        currentSelectedGameForSearch = gameName;
        userProfile.game = gameId; // Update user's main game in profile

        // Update the text of the main navigation buttons (which are now tabs)
        document.getElementById('find-friend-tab-btn').textContent = `추천 프로필`; // Revert to generic for recommended
        document.getElementById('match-now-tab-btn').textContent = `${gameName} 지금 매칭`;

        // If currently on the recommended profiles section, reload it with the new game filter
        if (!recommendedProfilesSection.classList.contains('hidden')) {
            loadRecommendedProfiles();
        } else if (!findFriendSection.classList.contains('hidden')) {
            // If currently on the "친구 찾기" section, reload it with the new game filter
            document.querySelector('#find-friend-section .section-title').textContent = `${gameName} 친구 찾기`;
            loadFriendList();
        } else if (!gameStrategySection.classList.contains('hidden')) {
            // If currently on the game strategy section, update its title and clear previous results
            document.querySelector('#game-strategy-section .section-title').textContent = `✨ ${gameName} 전략 & 팁`;
            document.querySelector('#game-strategy-section p.text-xl').textContent = `현재 프로필을 기반으로 ${gameName} 게임의 전략 팁을 생성합니다.`;
            generatedStrategyText.value = '';
            document.getElementById('strategy-result').classList.add('hidden');
        }
        alertMessage(`${gameName} 친구 찾기 및 지금 매칭으로 변경되었습니다!`, 'info');
        gameDropdownMenu.classList.remove('visible'); // Hide dropdown after selection
    });
});

// Profile section buttons
saveProfileBtn.addEventListener('click', saveProfile);
backToMainFromProfileBtn.addEventListener('click', showMainView);

// AI Bio Generator button event listener
generateBioBtn.addEventListener('click', generateProfileBio);

// Game Strategy Generator button event listener
generateStrategyBtn.addEventListener('click', generateGameStrategy);
backToMainFromStrategyBtn.addEventListener('click', showMainView);

// Chat History back button
backToMainFromChatHistoryBtn.addEventListener('click', showMainView);


// Find Friend section buttons
backToMainFromFindBtn.addEventListener('click', showMainView);

// Match Now section buttons
startMatchingBtn.addEventListener('click', startMatching);
startChatMatchedBtn.addEventListener('click', () => {
    if (currentMatchedPartner) {
        openChatModal(currentMatchedPartner.id, currentMatchedPartner.nickname);
    }
});
backToMainFromMatchBtn.addEventListener('click', showMainView);

// Chat Modal buttons
sendChatBtn.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
});
closeChatBtn.addEventListener('click', showMainView);

// Initial load: load profile info and set initial button texts
window.onload = () => {
    loadProfile();
    // Set initial text for main section tabs based on userProfile.game
    const initialGameName = document.querySelector(`.dropdown-game-item[data-game-id="${userProfile.game}"]`)?.dataset.gameName || '리그 오브 레전드';
    currentSelectedGameForSearch = initialGameName;
    document.getElementById('find-friend-tab-btn').textContent = `추천 프로필`; // Revert to generic for recommended
    document.getElementById('match-now-tab-btn').textContent = `${initialGameName} 지금 매칭`;

    // Ensure the correct dropdown item is active on load
    document.querySelector(`.dropdown-game-item[data-game-id="${userProfile.game}"]`)?.classList.add('active');

    // Show the main view (recommended profiles) on initial load
    showMainView();
}; 