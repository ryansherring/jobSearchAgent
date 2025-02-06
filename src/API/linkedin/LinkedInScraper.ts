
import { BaseAPIClient } from '../APIClient';
import { LinkedInRequest } from './types/LinkedInRequest';
import { LinkedInResponse } from './types/LinkedInResponse';
import { IJobListing } from '../../types';

export class LinkedInScraper extends BaseAPIClient {
  constructor(apiKey: string, endpoint: string) {
    super(apiKey, endpoint);
  }

  public async fetchData(requests: LinkedInRequest[]): Promise<IJobListing[]> {
    const allJobListings: IJobListing[] = [];
    for (const req of requests) {
      const response = await this.httpClient.post('', req.toJSON());
      const rawData = response.data;
      let jobListings: IJobListing[] = rawData.map((item: any) => {
        const liResponse = new LinkedInResponse(item);
        return {
          id: liResponse.job_posting_id,
          title: liResponse.job_title,
          company: liResponse.company_name,
          location: liResponse.job_location,
          description: liResponse.job_summary,
          datePosted: liResponse.job_posted_date,
          numberOfApplicants: liResponse.job_num_applicants,
          connections: [] // not currently supported, when i switch to my own scraper i'll add this
        };
      });
      // Apply selective_search filtering if enabled.
      if (req.selective_search) {
        jobListings = jobListings.filter(job =>
          job.title.toLowerCase().includes(req.keyword.toLowerCase())
        );
      }
      allJobListings.push(...jobListings);
    }
    return allJobListings;
  }
}
