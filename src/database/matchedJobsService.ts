
import { Pool } from 'pg';
import { IJobListing } from '../types';

export class MatchedJobsService {
  private pool: Pool;

  constructor(private connectionString: string) {
    this.pool = new Pool({ connectionString });
  }

  public async init(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS job_matches (
        id SERIAL PRIMARY KEY,
        job_id TEXT UNIQUE,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT,
        date_posted TIMESTAMPTZ,
        number_of_applicants INTEGER,
        match_score NUMERIC,
        comments TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await this.pool.query(createTableQuery);
  }

  public async insertMatchedJob(
    listing: IJobListing,
    matchScore: number,
    comments: string
  ): Promise<void> {
    const query = `
      INSERT INTO job_matches (
        job_id, title, company, location, description, date_posted, number_of_applicants, match_score, comments
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (job_id) DO UPDATE SET
        title = EXCLUDED.title,
        company = EXCLUDED.company,
        location = EXCLUDED.location,
        description = EXCLUDED.description,
        date_posted = EXCLUDED.date_posted,
        number_of_applicants = EXCLUDED.number_of_applicants,
        match_score = EXCLUDED.match_score,
        comments = EXCLUDED.comments;
    `;
    const values = [
      listing.id,
      listing.title,
      listing.company,
      listing.location,
      listing.description,
      listing.datePosted,
      listing.numberOfApplicants,
      matchScore,
      comments,
    ];
    await this.pool.query(query, values);
  }
}
