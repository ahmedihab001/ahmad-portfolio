/* ==================== MOBILE MENU ==================== */

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });

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

    const projectsGrid =
        document.getElementById("projects-grid");

    if (!projectsGrid) {
        return;
    }

    try {

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
        These projects already exist manually
        in the portfolio.

        They should NOT be added again
        from GitHub.
        */

        const manuallyListedProjects = [

            "compound-security-system",

            "dental-fluorosis-prediction-system"

        ];


        /*
        Only use public repositories
        that are not forks.
        */

        const projects =
            repositories.filter(
                repo => !repo.fork
            );


        projects.forEach(repo => {

            /*
            Get repository name
            */

            const repositoryName =
                repo.name
                    .toLowerCase()
                    .trim();


            /*
            Don't duplicate manually
            created project cards.
            */

            if (
                manuallyListedProjects.includes(
                    repositoryName
                )
            ) {

                return;

            }


            /*
            Default description.
            */

            let description =
                repo.description ||
                "A software project developed as part of my university and programming work.";


            /*
            Custom description for
            Cipher Wheel Decoder.
            */

            if (
                repositoryName ===
                "cipher-wheel-decoder"
            ) {

                description =
                    "A C++ console application that implements a cipher wheel for encrypting and decrypting text using a user-selected code.";

            }


            /*
            Create the project card.
            */

            const projectCard =
                document.createElement(
                    "article"
                );


            projectCard.className =
                "project-card";


            /*
            GitHub language.
            For Cipher Wheel Decoder,
            this should normally be C++.
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
            Create the project card HTML.
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
            Add the GitHub project
            to the SAME projects grid.
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

    }

}


/*
Load GitHub projects
when the page opens.
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
