document.addEventListener('DOMContentLoaded', () => {
    // 뒤로 가기 버튼 클릭 이벤트
    const backButton = document.getElementById("back-btn");

    if (backButton) {
        backButton.addEventListener("click", (event) => {
            event.preventDefault();

            const url = backButton.getAttribute("data-url");

            if (url) {
                window.location.href = url;
            } else {
                console.error("URL not found in data-url attribute");
            }
        });
    }

    // 행 클릭 시 상세 페이지로 이동
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach(row => {
        row.addEventListener("click", (event) => {
            if (event.target.closest("a")) return;
            event.preventDefault(); 
            
            const url = row.getAttribute("data-url");
            if (url) {
                window.location.href = url;
            }
        });
    });

    // CSRF 토큰 가져오는 함수
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === `${name}=`) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
