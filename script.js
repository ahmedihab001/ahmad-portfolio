/* ==================== MOBILE MENU ==================== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });


    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}


/* ==================== CURRENT YEAR ==================== */

const currentYear = document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ==================== GITHUB PROJECTS ==================== */

async function loadGitHubProjects() {

    const container =
        document.getElementById("github-projects");


    if (!container) {

        return;

    }


    try {

        const response = await fetch(
            "https://api.github.com/users/ahmedihab001/repos?sort=updated&per_page=100"
        );


        if (!response.ok) {

            throw new Error(
                "Unable to load GitHub repositories."
            );

        }


        const repositories = await response.json();


        /*
         * Remove the loading message.
         */

        container.innerHTML = "";


        /*
         * Remove forked repositories.
         */

        const projects = repositories.filter(
            repo => !repo.fork
        );


        /*
         * Check if there are no projects.
         */

        if (projects.length === 0) {

            container.innerHTML = `
                <div class="github-error">
                    No GitHub projects found.
                </div>
            `;

            return;

        }


        /*
         * Create a card for every GitHub repository.
         */

        projects.forEach(repo => {


            const projectCard =
                document.createElement("article");


            projectCard.className =
                "project-card";


            /*
             * Programming language.
             */

            const language =
                repo.language
                    ? `
                        <span>
                            ${repo.language}
                        </span>
                    `
                    : "";


            /*
             * Description.
             */

            const description =
                repo.description
                    ? repo.description
                    : "No description available.";


            /*
             * Stars.
             */

            const stars = `
                <span>
                    <i class="fas fa-star"></i>
                    ${repo.stargazers_count}
                </span>
            `;


            /*
             * Create project card.
             */

            projectCard.innerHTML = `

                <div class="project-icon">

                    <i class="fab fa-github"></i>

                </div>


                <h3>
                    ${repo.name}
                </h3>


                <p>
                    ${description}
                </p>


                <div class="project-tags">

                    ${language}

                    ${stars}

                    <span>
                        GitHub
                    </span>

                </div>


                <a
                    href="${repo.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                >

                    <i class="fab fa-github"></i>

                    View on GitHub

                </a>

            `;


            container.appendChild(projectCard);

        });


    } catch (error) {

        console.error(
            "GitHub API Error:",
            error
        );


        container.innerHTML = `

            <div class="github-error">

                <i class="fas fa-triangle-exclamation"></i>

                <p>
                    Unable to load GitHub projects right now.
                </p>

            </div>

        `;

    }

}


/*
 * Load GitHub projects when the page opens.
 */

loadGitHubProjects();


/* ==================== SCROLL ANIMATION ==================== */

const animatedElements =
    document.querySelectorAll(
        ".project-card, .skill-card, .education-card, .certificate-card, .contact-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});
