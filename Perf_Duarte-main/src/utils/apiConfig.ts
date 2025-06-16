// Production backend URL - hardcoded to ensure it works
// Force correct URL and prevent underscore variations
let envUrl = import.meta.env.VITE_API_URL;
if (envUrl && envUrl.includes('pbe_duarte')) {
  console.warn('🚨 FIXING URL: Detected underscore in URL, replacing with hyphen');
  envUrl = envUrl.replace('pbe_duarte', 'pbe-duarte');
}
const API_BASE_URL = envUrl || 'https://pbe-duarte.onrender.com';

// Debug logging to see what URL is being used
console.log('🔧 API Configuration Debug:');
console.log('VITE_API_URL env var:', import.meta.env.VITE_API_URL);
console.log('Final API_BASE_URL (hardcoded):', API_BASE_URL);
console.log('Environment Mode:', import.meta.env.MODE);

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {    // User routes
    login: '/api/users/login',
    register: '/api/users/register',
    userAvailableHours: '/api/users/user-available-hours',
    changePassword: '/api/users/change-password',
      // Information routes
    information: '/api/information/information',
    userId: '/api/information/user-id',
    userTimesheet: '/api/information/user-timesheet',
    groupByUserId: '/api/information/group-by-user-id',
    
    // Client routes
    clients: '/api/clients',
    clientsByUser: '/api/clients/by-user',
    groups: '/api/clients/groups',
    categories: '/api/clients/categories',
    validateTimesheet: '/api/clients/validate-timesheet',
    timesheet: '/api/clients/timesheet',
    groupId: '/api/clients/group-id',
    clientId: '/api/clients/client-id',
    categoryId: '/api/clients/category-id',
    projectsByUser: '/api/clients/projects-by-user',
    projectId: '/api/clients/project-id',
    projectPeopleHours: '/api/clients/project-people-hours',
    projectHoursBreakdown: '/api/clients/project-hours-breakdown',
      // Absence routes
    absences: '/api/absences',
    userAbsences: '/api/absences/user-absences',
    userMonthHours: '/api/absences/user-month-hours'
  }
};

export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
