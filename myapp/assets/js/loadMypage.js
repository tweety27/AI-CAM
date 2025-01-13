document.addEventListener("DOMContentLoaded", function () {
    const manageProjectsContainer = document.querySelector(".manage-projects-container");

    manageProjectsContainer.addEventListener("click", function () {
        const targetPage = "../templates/mypage.html";
        window.location.href = targetPage;
    });
});
