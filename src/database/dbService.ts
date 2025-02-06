
import { Pool } from 'pg';
import { IJobListing } from '../types';

export class DatabaseService {
  private pool: Pool;

  constructor(private connectionString: string) {
    this.pool = new Pool({ connectionString });
  }

  public async init(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS job_listings (
        id SERIAL PRIMARY KEY,
        job_id TEXT UNIQUE,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT,
        date_posted TIMESTAMPTZ,
        number_of_applicants INTEGER,
        connections TEXT[],
        desired_skills TEXT[],
        resume_alterations TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await this.pool.query(createTableQuery);
  }

  public async insertJobListing(listing: IJobListing): Promise<void> {
    const query = `
      INSERT INTO job_listings (
        job_id, title, company, location, description, date_posted, number_of_applicants,
        connections, desired_skills, resume_alterations
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (job_id) DO UPDATE SET
        title = EXCLUDED.title,
        company = EXCLUDED.company,
        location = EXCLUDED.location,
        description = EXCLUDED.description,
        date_posted = EXCLUDED.date_posted,
        number_of_applicants = EXCLUDED.number_of_applicants,
        connections = EXCLUDED.connections,
        desired_skills = EXCLUDED.desired_skills,
        resume_alterations = EXCLUDED.resume_alterations;
    `;
    const values = [
      listing.id,
      listing.title,
      listing.company,
      listing.location,
      listing.description,
      listing.datePosted,
      listing.numberOfApplicants,
      listing.connections,
      listing.desiredSkills,
      listing.resumeAlterations,
    ];
    await this.pool.query(query, values);
  }
}
