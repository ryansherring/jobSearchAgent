
import { BaseAIAgent } from './BaseAIAgent';
import { IJobListing, IInterviewMatchOutput } from '../types';
import { Configuration, OpenAIApi } from 'openai';

export class InterviewMatcherAgent extends BaseAIAgent<IInterviewMatchOutput> {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    super();
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  // NOTE TO SELF: The evaluateJob method should also take keywords for weight to exclude or include from this to filter further similar to last scraper.
  public async evaluateJob(
    listing: IJobListing,
    resume: string,
    linkedInProfile?: string
  ): Promise<IInterviewMatchOutput> {
    let profileText = "";
    if (linkedInProfile) {
      profileText = `LinkedIn Profile: ${linkedInProfile}\n`;
    }
    const prompt = `
Given the following job listing:
Title: ${listing.title}
Company: ${listing.company}
Location: ${listing.location}
Description: ${listing.description}
Date Posted: ${listing.datePosted}
Number of Applicants: ${listing.numberOfApplicants}

And the following candidate information:
Resume: ${resume}
${profileText}
Evaluate the likelihood of securing an interview.
Provide a match score (0–100) and a brief explanation.
Return your answer in JSON format with keys "matchScore" (number) and "comments" (string).
If the candidate's linkedInProfile is provided, consider it in your evaluation under seperate comments.
    `;
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 150,
        temperature: 0.7,
      });
      const text = response.data.choices[0].text;
      const output: IInterviewMatchOutput = JSON.parse(text || '{}');
      return output;
    } catch (error: any) {
      console.error("Error in InterviewMatcherAgent.evaluateJob:", error.message);
      throw error;
    }
  }
}
