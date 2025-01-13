// project_detail.js
function showTab(tabId) {
    // 모든 탭 콘텐츠 숨기기
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // 모든 탭 버튼의 활성화 클래스 제거
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // 선택한 탭 콘텐츠와 탭 버튼 활성화
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // 뒤로 가기 버튼 동작
    document.getElementById('back-btn').addEventListener('click', () => {
        window.location.href = 'mypage.html'; // main.html로 이동
    });

    // 탭 전환
    function showTab(tabId) {
        const tabs = document.querySelectorAll('.tab-content');
        const tabButtons = document.querySelectorAll('.tab');

        tabs.forEach(tab => tab.classList.remove('active'));
        tabButtons.forEach(button => button.classList.remove('active'));

        document.getElementById(tabId).classList.add('active');
        document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // 모든 버튼과 탭 내용을 비활성화
            tabButtons.forEach((btn) => btn.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));

            // 클릭한 버튼과 관련된 탭 활성화
            button.classList.add("active");
            const targetTab = button.getAttribute("data-tab");
            document.getElementById(targetTab).classList.add("active");
        });
    });
});
