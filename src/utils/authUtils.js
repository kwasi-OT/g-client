export const authUtils = {
    // Set token in localStorage
    setToken: (token) => {
        localStorage.setItem('token', token);
    },
    
    // Get token from localStorage
    getToken: () => {
        return localStorage.getItem('token');
    },
    
    // Remove token from localStorage
    removeToken: () => {
        localStorage.removeItem('token');
    },
    
    // Check if token is valid
    isTokenValid: (token) => {
        if (!token) return false;
        
        try {
            // Decode JWT payload
            const payload = JSON.parse(atob(token.split('.')[1]));
            
            // Check expiration
            return payload.exp > Math.floor(Date.now() / 1000);
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    },
    
    // Add token to axios default headers
    setupAxiosInterceptors: (axios) => {
        axios.interceptors.request.use(
            (config) => {
                const token = authUtils.getToken();
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }
};