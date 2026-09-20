/* ==================== MOBILE MENU ==================== */

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle("active");

        }
    );


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "active"
                );

            }
        );

    });

}



/* ==================== CURRENT YEAR ==================== */

const currentYear =
    document.getElementById("current-year");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* ==================== GITHUB PROJECTS ==================== */

async function loadGitHubProjects() {


    /*
     * Get the SAME projects grid
     * that contains your manual projects.
     */

    const projectsGrid =
        document.getElementById(
            "projects-grid"
        );


    if (!projectsGrid) {

        return;

    }


    try {


        /*
         * Get Ahmad's public repositories.
         */

        const response =
            await fetch(
                "https://api.github.com/users/ahmedihab001/repos?sort=updated&per_page=100"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load GitHub repositories."
            );

        }


        const repositories =
            await response.json();



        /*
         * Ignore forked repositories.
         */

        const projects =
            repositories.filter(
                repo => !repo.fork
            );



        /*
         * These repositories already have
         * their own custom cards above.
         *
         * Therefore we don't create a second
         * copy of them from GitHub.
         */

        const manuallyListedProjects = [

            "compound-security-system",

            "dental-fluorosis-prediction-system",

            "cipher-wheel-decoder"

        ];



        /*
         * Add GitHub repositories to the
         * SAME projects grid.
         */

        projects.forEach(repo => {


            /*
             * Don't add a duplicate if the
             * repository has the same name as
             * one of the manual projects.
             */

            const repositoryName =
                repo.name
                    .toLowerCase()
                    .replace(/\s+/g, "-");


            if (
                manuallyListedProjects.includes(
                    repositoryName
                )
            ) {

                return;

            }



            /*
             * Create the project card.
             */

            const projectCard =
                document.createElement(
                    "article"
                );


            projectCard.className =
                "project-card";



            /*
             * Get programming language.
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
             * Get description.
             */

            const description =
                repo.description ||
                "No description available.";



            /*
             * Create GitHub project card.
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


                    <span>

                        <i class="fas fa-star"></i>

                        ${repo.stargazers_count}

                    </span>


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



            /*
             * Add the new card to the
             * SAME Projects grid.
             */

            projectsGrid.appendChild(
                projectCard
            );

        });


    } catch (error) {


        console.error(
            "GitHub API Error:",
            error
        );


        /*
         * We don't show an error card
         * to visitors if GitHub is
         * temporarily unavailable.
         *
         * Your manually written projects
         * will still remain visible.
         */

    }

}



/*
 * Load GitHub projects.
 */

loadGitHubProjects();



/* ==================== SCROLL ANIMATION ==================== */

const animatedElements =
    document.querySelectorAll(
        ".project-card, " +
        ".skill-card, " +
        ".education-card, " +
        ".certificate-card, " +
        ".contact-card"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },

        {
            threshold: 0.1
        }

    );


animatedElements.forEach(
    element => {

        element.style.opacity =
            "0";


        element.style.transform =
            "translateY(20px)";


        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";


        observer.observe(
            element
        );

    }
);
