
import { BaseAIAgent } from './BaseAIAgent';
import { IJobListing, IAIAgentOutput } from '../types';
import { Configuration, OpenAIApi } from 'openai';


/**
 * AI agent that evaluates a job listing and a resume to suggest desired skills and resume alterations.
 * We do not want to use this agent to directly alter resume's or profiles because there's enough AI slop out there already.
 * These are merely for suggestions to the user.
 */
export class JobEvaluatorAgent extends BaseAIAgent<IAIAgentOutput> {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    super();
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  public async evaluateJob(
    listing: IJobListing,
    resume: string
  ): Promise<IAIAgentOutput> {
    const prompt = `
Given the following job listing:
Title: ${listing.title}
Company: ${listing.company}
Description: ${listing.description}
Date Posted: ${listing.datePosted}
Number of Applicants: ${listing.numberOfApplicants}

And the following resume:
${resume}

Please extract the desired skills for the role and suggest any resume alterations to improve the candidate's match.
Return your answer in JSON format with keys "desiredSkills" (an array) and "resumeAlterations" (a string).
    `;
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 150,
        temperature: 0.7,
      });
      const text = response.data.choices[0].text;
      const output: IAIAgentOutput = JSON.parse(text || '{}');
      return output;
    } catch (error: any) {
      console.error("Error in JobEvaluatorAgent.evaluateJob:", error.message);
      throw error;
    }
  }
}
