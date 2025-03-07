export const ROUTES = {
    COMMON: {
        HOME: '/',
        INSTRUCTOR: '/instructor',
        INSTAUTH: '/instructor/auth',
        INSTOTP: '/instructor/otp',
        COURSES: '/courses/:categoryId',
        COURSE_DETAILS: '/course/:courseId',
        STAUTH: '/student/auth',
        STOTP: '/student/otp',
        STVERIFY_EMAIL: '/student/verify-email',
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