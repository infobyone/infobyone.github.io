// Function to fetch and parse CSV data
async function fetchCSVData() {
    try {
        const response = await fetch('projects.csv');
        if (!response.ok) {
            throw new Error('Failed to fetch CSV data');
        }
        const csvData = await response.text();
        return csvData.trim().split('\n').slice(1).map(row => {
            const [Name ,Description ,GitHubLink ,ImageURL] = row.split(',');
            return { Name: Name.trim(), Description: Description.trim(), GitHubLink: GitHubLink.trim(), ImageURL: ImageURL.trim() };
        });
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        return [];
    }
}

// Generate project cards with images
async function generateProjectCards() {
    const projects = await fetchCSVData();
    if (projects.length === 0) {
        console.error('No projects found');
        return;
    }
    const projectsContainer = document.getElementById('projects-container');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <img src="${project.ImageURL}" alt="${project.Name}">
            <div class="project-overlay">
                <h2>${project.Name}</h2>
                <p>${project.Description}</p>
                <a href="${project.GitHubLink}" class="project-link" target="_blank">View on GitHub</a>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

// Call the function to generate project cards
generateProjectCards();
