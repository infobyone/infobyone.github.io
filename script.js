// Function to fetch and parse CSV data
async function fetchCSVData() {
    try {
        // Fetch the CSV file
        const response = await fetch('projects.csv');

        // Convert response to text
        const csvData = await response.text();

        // Parse the CSV data and return an array of objects
        const projects = [];
        const rows = csvData.trim().split('\n').slice(1); // Remove header and split into rows
        rows.forEach(row => {
            const columns = row.split(','); // Split row into columns
            const project = {
                Name: columns[0].trim(),
                Description: columns[1].trim(),
                GitHubLink: columns[2].trim(),
                ImageURL: columns[3].trim()
            };
            projects.push(project);
        });
        return projects;
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        return []; // Return an empty array in case of error
    }
}
