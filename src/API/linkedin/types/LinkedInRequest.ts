
export interface ILinkedInRequest {
  country: string;
  keyword: string;
  location: string;
  time_range: string;
  job_type: string;
  experience_level?: string;
  remote?: string;
  company?: string;
  selective_search: boolean; // When true, filter out jobs whose titles do not contain the keyword
  limit?: number;            // Optional: number of items to fetch per request
  page?: number;             // Optional: for pagination if needed
}

export class LinkedInRequest implements ILinkedInRequest {
  constructor(
    public country: string,
    public keyword: string,
    public location: string,
    public time_range: string,
    public job_type: string,
    public experience_level: string = "",
    public remote: string = "",
    public company: string = "",
    public selective_search: boolean = false,
    public limit?: number,
    public page?: number
  ) {}

  public toJSON(): ILinkedInRequest {
    return {
      country: this.country,
      keyword: this.keyword,
      location: this.location,
      time_range: this.time_range,
      job_type: this.job_type,
      experience_level: this.experience_level,
      remote: this.remote,
      company: this.company,
      selective_search: this.selective_search,
      limit: this.limit,
      page: this.page,
    };
  }
}
