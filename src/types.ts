
/**
 * Interface for our internal job listing.
 */
export interface IJobListing {
    id?: string;             // Unique identifier (mapped from the BrightData response)
    title: string;
    company: string;
    location: string;
    description: string;
    datePosted: string;      // ISO date string
    numberOfApplicants: number;
    connections?: string[];  // e.g., alumni or connections
  
    // Fields to be populated by an AI agent:
    desiredSkills?: string[];
    resumeAlterations?: string;
  }
  
  /**
   * Output from the general job evaluation AI agent.
   */
  export interface IAIAgentOutput {
    desiredSkills: string[];
    resumeAlterations: string;
  }
  
  /**
   * Output from the interview match AI agent.
   */
  export interface IInterviewMatchOutput {
    matchScore: number;
    comments: string;
  }
  