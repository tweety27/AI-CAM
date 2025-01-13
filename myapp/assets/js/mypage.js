document.addEventListener('DOMContentLoaded', () => {
    // 뒤로 가기 버튼 클릭 이벤트
    const backButton = document.getElementById('back-btn');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'main.html'; // main.html로 연결
        });
    }

    // 행 클릭 시 상세 페이지로 이동 (옵션)
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row) => {
        row.addEventListener('click', () => {
            // 상세 페이지 URL 설정
            const projectId = row.firstElementChild.textContent; // 첫 번째 열의 값을 ID로 사용
            window.location.href = `project_detail.html?projectId=${projectId}`;
        });
    });
});
