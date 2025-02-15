export const ROUTES = {
    COMMON: {
        HOME: '/',
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