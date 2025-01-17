document.addEventListener("DOMContentLoaded", function () {
    const manageProjectsContainer = document.querySelector(".manage-projects-container");

    manageProjectsContainer.addEventListener("click", function () {
        const targetPage = this.getAttribute("data-url");
        window.location.href = targetPage;
    });
});
