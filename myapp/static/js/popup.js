document.addEventListener('DOMContentLoaded', () => {
    // 팝업 요소 가져오기
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
    const generateProjectContainer = document.querySelector(".generate-project-container");
    const submitButton = document.getElementById("submit-button");

    // generate-project-container 클릭 시 팝업 열기
    generateProjectContainer.addEventListener("click", () => {
        popup.style.display = "block";
    });

    // 닫기 버튼 클릭 시 팝업 닫기
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // 팝업 바깥 영역 클릭 시 팝업 닫기
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });

    // 생성하기 버튼 클릭 시 페이지 이동
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        const targetUrl = submitButton.getAttribute("data-url");

        if (targetUrl) {
            window.location.href = targetUrl;
        } else {
            console.error("URL not found in data-url attribute");
        }
    });
});
