
export interface ILinkedInResponse {
  job_posting_id: string;
  job_title: string;
  company_name: string;
  job_location: string;
  job_summary: string;
  job_posted_date: string;
  job_num_applicants: number;
  // [key: string]: any;
}

export class LinkedInResponse implements ILinkedInResponse {
  public job_posting_id: string;
  public job_title: string;
  public company_name: string;
  public job_location: string;
  public job_summary: string;
  public job_posted_date: string;
  public job_num_applicants: number;
  public raw: any;

  constructor(raw: any) {
    this.job_posting_id = raw.job_posting_id;
    this.job_title = raw.job_title;
    this.company_name = raw.company_name;
    this.job_location = raw.job_location;
    this.job_summary = raw.job_summary || raw.job_description_formatted || "";
    this.job_posted_date = raw.job_posted_date;
    this.job_num_applicants = raw.job_num_applicants;
    this.raw = raw;
  }
}
