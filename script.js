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
        These projects already exist
        manually in the portfolio.
        */

        const manuallyListedProjects = [

            "compound-security-system",

            "dental-fluorosis-prediction-system"

        ];


        /*
        Custom descriptions for GitHub projects.
        */

        const projectDescriptions = {

            "cipher-wheel-decoder":
                "A C++ console application that implements a cipher wheel for encrypting and decrypting text using a user-selected code.",


            "pegasus-club":
                "A full-stack web project developed to provide a digital platform for the Pegasus Club, combining frontend and backend functionality.",


            "nexes-hotel-website":
                "A university team project for a hotel and resort website with rooms, bookings, users, payments, administration, and location information.",


            "ahmad-portfolio":
                "My personal portfolio website showcasing my software engineering projects, skills, education, experience, and certificates."

        };


        /*
        Only load public repositories
        that are not forks.
        */

        const projects =
            repositories.filter(
                repo => !repo.fork
            );


        projects.forEach(repo => {

            const repositoryName =
                repo.name
                    .toLowerCase()
                    .trim();


            /*
            Don't add projects that
            already exist manually.
            */

            if (
                manuallyListedProjects.includes(
                    repositoryName
                )
            ) {

                return;

            }


            /*
            Use custom description if we
            have one. Otherwise use the
            GitHub repository description.
            */

            const description =
                projectDescriptions[
                    repositoryName
                ] ||
                repo.description ||
                "A software project developed as part of my university and programming work.";


            /*
            GitHub detects the main language
            of each repository.
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
            Create project card.
            */

            const projectCard =
                document.createElement(
                    "article"
                );


            projectCard.className =
                "project-card";


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
            Add the project to the
            SAME Projects grid.
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
Load GitHub projects.
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
