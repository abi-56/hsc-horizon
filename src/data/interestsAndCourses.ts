/** Dynamic interests based on chosen HSC subject */
export const subjectInterests: Record<string, { value: string; label: string }[]> = {
  pcm: [
    { value: 'software-development', label: 'Software Development & Coding' },
    { value: 'ai-ml', label: 'Artificial Intelligence & Machine Learning' },
    { value: 'mechanical-design', label: 'Mechanical & Product Design' },
    { value: 'electronics', label: 'Electronics & Embedded Systems' },
    { value: 'civil-architecture', label: 'Civil Engineering & Architecture' },
    { value: 'data-science', label: 'Data Science & Analytics' },
    { value: 'space-research', label: 'Space Science & Research' },
  ],
  pcb: [
    { value: 'medicine', label: 'Medicine & Surgery (MBBS)' },
    { value: 'dentistry', label: 'Dentistry (BDS)' },
    { value: 'pharmacy', label: 'Pharmacy & Drug Research' },
    { value: 'biotechnology', label: 'Biotechnology & Genetics' },
    { value: 'nursing', label: 'Nursing & Healthcare' },
    { value: 'veterinary', label: 'Veterinary Science' },
    { value: 'agriculture', label: 'Agriculture & Food Science' },
  ],
  commerce: [
    { value: 'chartered-accountancy', label: 'Chartered Accountancy (CA)' },
    { value: 'banking-finance', label: 'Banking & Finance' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'entrepreneurship', label: 'Entrepreneurship & Startups' },
    { value: 'international-business', label: 'International Business & Trade' },
    { value: 'human-resources', label: 'Human Resources Management' },
  ],
  humanities: [
    { value: 'psychology', label: 'Psychology & Counseling' },
    { value: 'journalism', label: 'Journalism & Mass Communication' },
    { value: 'law', label: 'Law & Legal Studies' },
    { value: 'social-work', label: 'Social Work & NGO Management' },
    { value: 'design', label: 'Design & Visual Arts' },
    { value: 'performing-arts', label: 'Performing Arts & Film' },
    { value: 'political-science', label: 'Political Science & Public Policy' },
  ],
};

/** Course progression after UG and PG for each subject */
export const courseProgression: Record<string, { ug: string[]; pg: string[] }> = {
  pcm: {
    ug: ['B.Tech / B.E.', 'B.Sc (Physics / Maths)', 'BCA', 'B.Arch', 'B.Sc Data Science'],
    pg: ['M.Tech', 'M.Sc', 'MCA', 'MBA (Tech Management)', 'M.S. (Abroad)'],
  },
  pcb: {
    ug: ['MBBS', 'BDS', 'B.Pharm', 'B.Sc Nursing', 'B.Sc Biotech', 'BAMS / BHMS'],
    pg: ['MD / MS', 'M.Pharm', 'M.Sc Microbiology', 'MPH (Public Health)', 'Ph.D. Life Sciences'],
  },
  commerce: {
    ug: ['B.Com', 'BBA', 'BBA LLB', 'B.Com (Hons)', 'CA Foundation'],
    pg: ['M.Com', 'MBA', 'CA Final', 'CMA', 'M.Sc Finance'],
  },
  humanities: {
    ug: ['BA (Hons)', 'BA LLB', 'BFA', 'B.Des', 'BA Journalism', 'BA Psychology'],
    pg: ['MA', 'LLM', 'MFA', 'M.Des', 'MA Psychology', 'MSW'],
  },
};
