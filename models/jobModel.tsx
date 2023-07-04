export type JobModel = {
  employer_name?: string;
  employer_logo?: string;
  employer_website?: string;
  employer_company_type?: string;
  job_title: string;
  job_description?: string;
  job_benefits?: string[];
  job_apply_is_direct?: boolean;
  job_apply_link?: string;
  job_city?: string;
  job_country?: string;
  job_employment_type?: string;
  job_id: string;
  job_is_remote?: boolean;
  job_highlights?: {
    Qualifications: string[];
    Responsibilities: string[];
    Benifits: string[];
  };
  job_google_link?: string;
};
