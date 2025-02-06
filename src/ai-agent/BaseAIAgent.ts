
import { IJobListing } from '../types';

export abstract class BaseAIAgent<T> {
  /**
   * Evaluate the given job listing using the candidate's resume and (optionally) a LinkedIn profile.
   * Returns a value of type T.
   */
  public abstract evaluateJob(
    listing: IJobListing,
    resume: string,
    linkedInProfile?: string
  ): Promise<T>;
}
