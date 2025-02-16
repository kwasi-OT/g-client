export const ROUTES = {
    COMMON: {
        HOME: '/',
        INSTRUCTOR: '/instructor',
        PLAN: '/instructor/plan',
        RECORD: '/instructor/record',
        LAUNCH: '/instructor/launch',
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password',
        UNAUTHORIZED: '/unauthorized',
        NOT_FOUND: '/not-found'
    },
    STUDENT: {
        BASE: '/student',
        HOME: '/student/home',
        DASHBOARD: '/student/dashboard',
        PROFILE: '/student/profile',
        REGISTER: '/student/register',
        COURSES: '/student/courses'
    },
    ADMIN: {
        BASE: '/admin',
        HOME: '/admin/home',
        DASHBOARD: '/admin/dashboard',
        USERS: '/admin/users',
        SETTINGS: '/admin/settings'
    }
};

export const USER_ROLES = {
    STUDENT: 'student',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
};