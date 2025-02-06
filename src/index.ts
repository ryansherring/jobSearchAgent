
import { config } from './config';
import { LinkedInScraper } from './API/linkedin/LinkedInScraper';
import { LinkedInRequest } from './API/linkedin/types/LinkedInRequest';
import { DatabaseService } from './database/dbService';
import { JobEvaluatorAgent } from './ai-agent/JobEvaluatorAgent';
import { InterviewMatcherAgent } from './ai-agent/InterviewMatcherAgent';
import { MatchedJobsService } from './database/matchedJobsService';
import { IJobListing } from './types';
import fs from 'fs';

async function main(): Promise<void> {
  try {
    const requests = [
      new LinkedInRequest(
        "US",
        "node developer", // keyword for search
        "",
        "Past Week",   // not going to bother with jobs that are too old with a quintillion AI Generated apps
        "Full-time",
        "Entry level",
        "Remote",
        "",            // company (normally empty, let's not be picky)
        false,          // selective_search: true to filter out jobs that don't include "the keyword" in the title
        50            // limit set to whatever
      ),
    ];

    const scraper = new LinkedInScraper(config.brightdataApiKey, config.brightdataEndpoint);
    const jobListings: IJobListing[] = await scraper.fetchData(requests);

    const resume = fs.readFileSync('resume.txt', 'utf8');

    const evaluatorAgent = new JobEvaluatorAgent(config.openaiApiKey);

    const dbService = new DatabaseService(config.databaseUrl);
    await dbService.init();

    for (const job of jobListings) {
      const evaluation = await evaluatorAgent.evaluateJob(job, resume);
      job.desiredSkills = evaluation.desiredSkills;
      job.resumeAlterations = evaluation.resumeAlterations;
      await dbService.insertJobListing(job);
      console.log(`Processed job: ${job.title}`);
    }

    const matcherAgent = new InterviewMatcherAgent(config.openaiApiKey);
    const matchedService = new MatchedJobsService(config.databaseUrl);
    await matchedService.init();

    const matchThreshold = 80; // Only store jobs with a match score ≥ 80 from the ai agent.
    for (const job of jobListings) {
      const matchResult = await matcherAgent.evaluateJob(job, resume);
      if (matchResult.matchScore >= matchThreshold) {
        await matchedService.insertMatchedJob(job, matchResult.matchScore, matchResult.comments);
        console.log(`Matched job inserted: ${job.title} (score: ${matchResult.matchScore})`);
      }
    }
  } catch (error: any) {
    console.error("Error in main:", error.message);
  }
}

main();
