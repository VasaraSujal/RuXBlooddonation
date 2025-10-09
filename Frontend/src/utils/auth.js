// Authentication utility functions for role-based access
// This file handles user role management and authentication logic

/**
 * Login user with specified role
 * @param {string} role - User role ('user', 'ngo', 'donor', etc.)
 * @param {Object} userDetails - Optional user details object
 * @returns {boolean} - Success status
 */
export const loginUser = (role, userDetails = {}) => {
  try {
    // Validate role
    const validRoles = ['user', 'ngo', 'donor', 'hospital', 'admin'];
    if (!validRoles.includes(role)) {
      console.error('Invalid role:', role);
      return false;
    }

    // Create user session object
    const userSession = {
      role,
      loginTime: new Date().toISOString(),
      sessionId: generateSessionId(),
      isAuthenticated: true,
      ...userDetails
    };

    // Store in localStorage
    localStorage.setItem('selectedRole', role);
    localStorage.setItem('userSession', JSON.stringify(userSession));
    localStorage.setItem('authTimestamp', Date.now().toString());

    // Optional: Store in sessionStorage for tab-specific data
    sessionStorage.setItem('currentRole', role);

    console.log(`User logged in successfully as: ${role}`);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

/**
 * Logout current user and clear session data
 * @returns {boolean} - Success status
 */
export const logoutUser = () => {
  try {
    // Clear localStorage
    localStorage.removeItem('selectedRole');
    localStorage.removeItem('userSession');
    localStorage.removeItem('authTimestamp');

    // Clear sessionStorage
    sessionStorage.removeItem('currentRole');

    // Clear any other auth-related data
    const authKeys = ['bloodDonationUser', 'userEmail', 'userRole'];
    authKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    console.log('User logged out successfully');
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

/**
 * Get current user role from localStorage
 * @returns {string|null} - Current user role or null if not logged in
 */
export const getCurrentRole = () => {
  try {
    // First check sessionStorage for current tab
    const sessionRole = sessionStorage.getItem('currentRole');
    if (sessionRole) {
      return sessionRole;
    }

    // Then check localStorage for persistent role
    const persistentRole = localStorage.getItem('selectedRole');
    if (persistentRole) {
      return persistentRole;
    }

    // Check if user session exists
    const userSession = getUserSession();
    if (userSession && userSession.role) {
      return userSession.role;
    }

    return null;
  } catch (error) {
    console.error('Failed to get current role:', error);
    return null;
  }
};

/**
 * Get full user session data
 * @returns {Object|null} - User session object or null
 */
export const getUserSession = () => {
  try {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    return null;
  } catch (error) {
    console.error('Failed to get user session:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - Authentication status
 */
export const isAuthenticated = () => {
  const session = getUserSession();
  const role = getCurrentRole();
  
  // Check if session exists and is valid
  if (session && role && session.isAuthenticated) {
    // Optional: Check if session has expired (24 hours)
    const authTimestamp = localStorage.getItem('authTimestamp');
    if (authTimestamp) {
      const sessionAge = Date.now() - parseInt(authTimestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (sessionAge > maxAge) {
        logoutUser(); // Auto-logout expired sessions
        return false;
      }
    }
    
    return true;
  }
  
  return false;
};

/**
 * Check if current user has specific role
 * @param {string} requiredRole - Role to check against
 * @returns {boolean} - Role match status
 */
export const hasRole = (requiredRole) => {
  const currentRole = getCurrentRole();
  return currentRole === requiredRole;
};

/**
 * Check if current user has any of the specified roles
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean} - Role match status
 */
export const hasAnyRole = (allowedRoles) => {
  const currentRole = getCurrentRole();
  return allowedRoles.includes(currentRole);
};

/**
 * Get user dashboard route based on role
 * @param {string} role - User role
 * @returns {string} - Dashboard route path
 */
export const getDashboardRoute = (role) => {
  const roleRoutes = {
    'user': '/user',
    'ngo': '/ngo',
    'hospital': '/ngo',
    'donor': '/user',
    'admin': '/admin'
  };
  
  return roleRoutes[role] || '/';
};

/**
 * Auto-redirect user to appropriate dashboard
 * @param {Function} navigate - React Router navigate function
 */
export const autoRedirectToDashboard = (navigate) => {
  const role = getCurrentRole();
  if (role && isAuthenticated()) {
    const dashboardRoute = getDashboardRoute(role);
    navigate(dashboardRoute);
    return true;
  }
  return false;
};

/**
 * Switch user role (for demo purposes)
 * @param {string} newRole - New role to switch to
 * @param {Function} navigate - React Router navigate function
 * @returns {boolean} - Success status
 */
export const switchRole = (newRole, navigate) => {
  if (loginUser(newRole)) {
    const dashboardRoute = getDashboardRoute(newRole);
    navigate(dashboardRoute);
    return true;
  }
  return false;
};

/**
 * Generate unique session ID
 * @returns {string} - Unique session identifier
 */
const generateSessionId = () => {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

/**
 * Get user permissions based on role
 * @param {string} role - User role
 * @returns {Object} - Permissions object
 */
export const getUserPermissions = (role) => {
  const permissions = {
    user: {
      canFindBlood: true,
      canDonateBlood: true,
      canViewRequests: true,
      canManageStock: false,
      canSendAlerts: false,
      canViewAnalytics: false
    },
    ngo: {
      canFindBlood: true,
      canDonateBlood: false,
      canViewRequests: true,
      canManageStock: true,
      canSendAlerts: true,
      canViewAnalytics: true
    },
    hospital: {
      canFindBlood: true,
      canDonateBlood: false,
      canViewRequests: true,
      canManageStock: true,
      canSendAlerts: true,
      canViewAnalytics: true
    },
    donor: {
      canFindBlood: false,
      canDonateBlood: true,
      canViewRequests: true,
      canManageStock: false,
      canSendAlerts: false,
      canViewAnalytics: false
    },
    admin: {
      canFindBlood: true,
      canDonateBlood: true,
      canViewRequests: true,
      canManageStock: true,
      canSendAlerts: true,
      canViewAnalytics: true
    }
  };
  
  return permissions[role] || permissions.user;
};

/**
 * Check if user has specific permission
 * @param {string} permission - Permission to check
 * @returns {boolean} - Permission status
 */
export const hasPermission = (permission) => {
  const role = getCurrentRole();
  if (!role) return false;
  
  const userPermissions = getUserPermissions(role);
  return userPermissions[permission] || false;
};

// Export utility object for easier imports
export const AuthService = {
  loginUser,
  logoutUser,
  getCurrentRole,
  getUserSession,
  isAuthenticated,
  hasRole,
  hasAnyRole,
  getDashboardRoute,
  autoRedirectToDashboard,
  switchRole,
  getUserPermissions,
  hasPermission
};

export default AuthService;