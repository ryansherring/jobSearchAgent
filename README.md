# JobSearchAgent

WARNING: I just started putting this together so it's very WIP. If you add sources, be sure to read up on the ethics of scraping that specific source. I may switch this from a scraper API to instead connect to my own containerized python scraper soon.

JobSearchAgent is a tool designed to help you scrape job listings from various job boards and websites for myself and other job searching friends. Using a third-party API, it collects job data—such as job titles, descriptions, company names, and locations—for further analysis. In addition, it leverages AI agents to suggest improvements for resumes and LinkedIn profiles (but not make them to prevent AI slop). 

## Features

- Scrape job listings from multiple sources via a scraper API.
- Extract job details including title, description, company, and location.
- Use AI agents to suggest changes to resumes and profiles.
- Save scraped data to a Postgres DB.
- Use multiple AI Agents to evaluate the jobs, narrow them down to your experience, and suggest resume alterations (but not make them)

## Installation

To install JobSearchAgent, clone the repository and install the required dependencies:

```bash
git clone https://github.com/yourusername/jobSearchAgent.git
cd jobsearchAgent
npm install
```

## Usage

1. **Configure the scraper API and AI agents**: Edit the `.env` file to specify the API keys and other environmental variables.

2. **add your resume via a txt file**: Copy and paste your resume into a resume.txt at root to simply get going. Best practice is to keep resume's in ATS readable format so this shouldn't be much of an issue, but i should add text encoding and decoding for good measure...

3. **Run the pipeline**: Execute the following command to start job hunting:

```bash
npm run dev
```

## Configuration

The `.env` file allows you to customize the API endpoints and other settings.

## TODO:
- devops
- monitoring
- jest unit tests
- additional sources
- additional ai agents
- vector db, RAG, and ollama support 

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any questions or issues, please open an issue on the GitHub repository or contact the maintainer at your.email@example.com.