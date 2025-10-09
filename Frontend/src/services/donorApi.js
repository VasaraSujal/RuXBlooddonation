// API service for BloodConnect+ Frontend
// Comprehensive API client for all backend services

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// HTTP client with error handling
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
      
      const error = new Error(data.message || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      error.code = data.code;
      throw error;
    }

    // Return the data property from our API response format
    return data.data || data;
  }

  async get(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseURL}${endpoint}`);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  async post(endpoint, data = null) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : null,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  async put(endpoint, data = null) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : null,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Donor API service
export const donorApi = {
  // Get all donors with filtering and pagination
  async getAllDonors(params = {}) {
    const queryParams = {
      page: params.page || 1,
      limit: params.limit || 10,
      ...params.bloodGroup && { bloodGroup: params.bloodGroup },
      ...params.available !== undefined && { available: params.available },
      ...params.search && { search: params.search },
      ...params.sortBy && { sortBy: params.sortBy },
      ...params.sortOrder && { sortOrder: params.sortOrder },
      ...params.minAge && { minAge: params.minAge },
      ...params.maxAge && { maxAge: params.maxAge },
      ...params.gender && { gender: params.gender },
      ...params.isVerified !== undefined && { isVerified: params.isVerified },
    };

    return await apiClient.get('/donors', queryParams);
  },

  // Get donor by ID
  async getDonorById(donorId) {
    if (!donorId) {
      throw new Error('Donor ID is required');
    }
    return await apiClient.get(`/donors/${donorId}`);
  },

  // Create new donor
  async createDonor(donorData) {
    if (!donorData || !donorData.name || !donorData.bloodGroup) {
      throw new Error('Name and blood group are required');
    }
    return await apiClient.post('/donors', donorData);
  },

  // Update donor
  async updateDonor(donorId, updates) {
    if (!donorId) {
      throw new Error('Donor ID is required');
    }
    return await apiClient.put(`/donors/${donorId}`, updates);
  },

  // Delete donor
  async deleteDonor(donorId) {
    if (!donorId) {
      throw new Error('Donor ID is required');
    }
    return await apiClient.delete(`/donors/${donorId}`);
  },

  // Find nearby donors
  async findNearbyDonors(params = {}) {
    const { lat, lng, maxDistance = 10, bloodGroup, limit = 20 } = params;
    
    if (!lat || !lng) {
      throw new Error('Latitude and longitude are required');
    }

    const queryParams = {
      lat,
      lng,
      maxDistance,
      limit,
      ...bloodGroup && { bloodGroup },
    };

    return await apiClient.get('/donors/nearby', queryParams);
  },

  // Get donor donation history
  async getDonorHistory(donorId, params = {}) {
    if (!donorId) {
      throw new Error('Donor ID is required');
    }

    const queryParams = {
      page: params.page || 1,
      limit: params.limit || 10,
      ...params.startDate && { startDate: params.startDate },
      ...params.endDate && { endDate: params.endDate },
      ...params.status && { status: params.status },
    };

    return await apiClient.get(`/donors/${donorId}/history`, queryParams);
  },

  // Add donation record
  async addDonationRecord(donorId, donationData) {
    if (!donorId) {
      throw new Error('Donor ID is required');
    }
    if (!donationData || !donationData.hospitalName || !donationData.date) {
      throw new Error('Hospital name and date are required');
    }
    return await apiClient.post(`/donors/${donorId}/history`, donationData);
  },

  // Get donor rewards
  async getDonorRewards(donorId, params = {}) {
    if (!donorId) {
      throw new Error('Donor ID is required');
    }

    const queryParams = {
      page: params.page || 1,
      limit: params.limit || 10,
      ...params.type && { type: params.type },
      ...params.isRedeemed !== undefined && { isRedeemed: params.isRedeemed },
    };

    return await apiClient.get(`/donors/${donorId}/rewards`, queryParams);
  }
};

// Utility functions for frontend integration
export const donorUtils = {
  // Format donor data for display
  formatDonor(donor) {
    return {
      ...donor,
      displayName: donor.name || 'Unknown',
      distanceText: donor.distance ? `${donor.distance.toFixed(1)} km` : '',
      bloodGroupDisplay: donor.bloodGroup || 'Unknown',
      availabilityText: donor.available ? 'Available' : 'Not Available',
      lastDonationText: donor.lastDonation 
        ? new Date(donor.lastDonation).toLocaleDateString()
        : 'Never donated',
      totalDonationsText: `${donor.totalDonations || 0} donation${(donor.totalDonations || 0) !== 1 ? 's' : ''}`,
      rewardPointsText: `${donor.rewardPoints || 0} points`,
      ageText: donor.age ? `${donor.age} years` : 'Age not specified',
      isRareBlood: ['AB-', 'AB+', 'A-', 'B-', 'O-'].includes(donor.bloodGroup),
    };
  },

  // Validate donor data
  validateDonorData(donorData) {
    const errors = [];
    
    if (!donorData.name || donorData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!donorData.bloodGroup) {
      errors.push('Blood group is required');
    } else if (!['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(donorData.bloodGroup)) {
      errors.push('Invalid blood group');
    }
    
    if (donorData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorData.email)) {
      errors.push('Invalid email format');
    }
    
    if (donorData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(donorData.phone)) {
      errors.push('Invalid phone number format');
    }
    
    if (donorData.age && (donorData.age < 18 || donorData.age > 65)) {
      errors.push('Age must be between 18 and 65');
    }
    
    if (donorData.weight && donorData.weight < 50) {
      errors.push('Weight must be at least 50 kg');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Calculate eligibility for donation
  calculateEligibility(donor) {
    const now = new Date();
    const lastDonation = donor.lastDonation ? new Date(donor.lastDonation) : null;
    const daysSinceLastDonation = lastDonation 
      ? Math.floor((now - lastDonation) / (1000 * 60 * 60 * 24))
      : 365; // If never donated, assume eligible
    
    const minDaysBetweenDonations = 56; // 8 weeks
    const isEligible = daysSinceLastDonation >= minDaysBetweenDonations;
    const daysUntilEligible = isEligible ? 0 : minDaysBetweenDonations - daysSinceLastDonation;
    
    return {
      isEligible,
      daysUntilEligible,
      nextEligibleDate: isEligible 
        ? now.toISOString().split('T')[0]
        : new Date(now.getTime() + daysUntilEligible * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reason: isEligible 
        ? 'Eligible to donate'
        : `Must wait ${daysUntilEligible} more days since last donation`
    };
  },

  // Sort donors by various criteria
  sortDonors(donors, sortBy = 'name', sortOrder = 'asc') {
    return [...donors].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle special sorting cases
      if (sortBy === 'distance') {
        aValue = a.distance || 999;
        bValue = b.distance || 999;
      } else if (sortBy === 'lastDonation') {
        aValue = a.lastDonation ? new Date(a.lastDonation) : new Date(0);
        bValue = b.lastDonation ? new Date(b.lastDonation) : new Date(0);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  },

  // Filter donors by criteria
  filterDonors(donors, filters = {}) {
    return donors.filter(donor => {
      // Blood group filter
      if (filters.bloodGroup && donor.bloodGroup !== filters.bloodGroup) {
        return false;
      }
      
      // Availability filter
      if (filters.available !== undefined && donor.available !== filters.available) {
        return false;
      }
      
      // Search filter (name, email, phone)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchFields = [donor.name, donor.email, donor.phone].filter(Boolean);
        if (!searchFields.some(field => field.toLowerCase().includes(searchTerm))) {
          return false;
        }
      }
      
      // Age filter
      if (filters.minAge && donor.age < filters.minAge) {
        return false;
      }
      if (filters.maxAge && donor.age > filters.maxAge) {
        return false;
      }
      
      // Gender filter
      if (filters.gender && donor.gender !== filters.gender) {
        return false;
      }
      
      // Verification filter
      if (filters.isVerified !== undefined && donor.isVerified !== filters.isVerified) {
        return false;
      }
      
      // Distance filter
      if (filters.maxDistance && donor.distance > filters.maxDistance) {
        return false;
      }
      
      return true;
    });
  }
};

// Authentication API service
export const authApi = {
  async login(credentials) {
    return await apiClient.post('/auth/login', credentials);
  },

  async register(userData) {
    return await apiClient.post('/auth/register', userData);
  },

  async quickRegister(userData) {
    return await apiClient.post('/auth/quick-register', userData);
  },

  async logout() {
    return await apiClient.post('/auth/logout');
  },

  async refreshToken() {
    return await apiClient.post('/auth/refresh');
  },

  async getProfile() {
    return await apiClient.get('/auth/profile');
  },

  async updateProfile(updates) {
    return await apiClient.put('/auth/profile', updates);
  },

  async changePassword(passwordData) {
    return await apiClient.put('/auth/change-password', passwordData);
  },

  async forgotPassword(email) {
    return await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token, newPassword) {
    return await apiClient.post('/auth/reset-password', { token, newPassword });
  }
};

// Hospital API service
export const hospitalApi = {
  async getAllHospitals(params = {}) {
    return await apiClient.get('/hospitals', params);
  },

  async getHospitalById(hospitalId) {
    return await apiClient.get(`/hospitals/${hospitalId}`);
  },

  async createHospital(hospitalData) {
    return await apiClient.post('/hospitals', hospitalData);
  },

  async updateHospital(hospitalId, updates) {
    return await apiClient.put(`/hospitals/${hospitalId}`, updates);
  },

  async deleteHospital(hospitalId) {
    return await apiClient.delete(`/hospitals/${hospitalId}`);
  }
};

// Blood Request API service
export const requestApi = {
  async createRequest(requestData) {
    return await apiClient.post('/requests', requestData);
  },

  async getAllRequests(params = {}) {
    return await apiClient.get('/requests', params);
  },

  async getRequestById(requestId) {
    return await apiClient.get(`/requests/${requestId}`);
  },

  async updateRequestStatus(requestId, statusData) {
    return await apiClient.put(`/requests/${requestId}/status`, statusData);
  },

  async respondToRequest(requestId, responseData) {
    return await apiClient.post(`/requests/${requestId}/respond`, responseData);
  },

  async getUrgentRequests(params = {}) {
    return await apiClient.get('/requests/urgent', params);
  }
};

// Blood Stock API service
export const stockApi = {
  async addStock(stockData) {
    return await apiClient.post('/stock', stockData);
  },

  async getAllStock(params = {}) {
    return await apiClient.get('/stock', params);
  },

  async getStockById(stockId) {
    return await apiClient.get(`/stock/${stockId}`);
  },

  async updateStock(stockId, updates) {
    return await apiClient.put(`/stock/${stockId}`, updates);
  },

  async reserveStock(stockId, reservationData) {
    return await apiClient.post(`/stock/${stockId}/reserve`, reservationData);
  },

  async getStockAvailability() {
    return await apiClient.get('/stock/availability');
  },

  async getExpiringStock(params = {}) {
    return await apiClient.get('/stock/expiring', params);
  },

  async updateQualityControl(stockId, qualityData) {
    return await apiClient.put(`/stock/${stockId}/quality`, qualityData);
  }
};

// Alert API service
export const alertApi = {
  async createAlert(alertData) {
    return await apiClient.post('/alerts', alertData);
  },

  async getAllAlerts(params = {}) {
    return await apiClient.get('/alerts', params);
  },

  async getAlertById(alertId) {
    return await apiClient.get(`/alerts/${alertId}`);
  },

  async updateAlert(alertId, updates) {
    return await apiClient.put(`/alerts/${alertId}`, updates);
  },

  async respondToAlert(alertId, responseData) {
    return await apiClient.post(`/alerts/${alertId}/respond`, responseData);
  },

  async getActiveAlerts(params = {}) {
    return await apiClient.get('/alerts/active', params);
  },

  async getAlertStats() {
    return await apiClient.get('/alerts/stats');
  },

  async cancelAlert(alertId) {
    return await apiClient.delete(`/alerts/${alertId}`);
  },

  async getEmergencyAlerts(params = {}) {
    return await apiClient.get('/alerts/emergency', params);
  }
};

// Notification API service
export const notificationApi = {
  async getNotifications(params = {}) {
    return await apiClient.get('/notifications', params);
  },

  async markAsRead(notificationId) {
    return await apiClient.put(`/notifications/${notificationId}/read`);
  },

  async markAllAsRead() {
    return await apiClient.put('/notifications/read-all');
  },

  async deleteNotification(notificationId) {
    return await apiClient.delete(`/notifications/${notificationId}`);
  },

  async clearAllNotifications() {
    return await apiClient.delete('/notifications');
  },

  async getPreferences() {
    return await apiClient.get('/notifications/preferences');
  },

  async updatePreferences(preferences) {
    return await apiClient.put('/notifications/preferences', preferences);
  },

  async getUnreadCount() {
    return await apiClient.get('/notifications/unread-count');
  }
};

// Chat API service
export const chatApi = {
  async getConversations(params = {}) {
    return await apiClient.get('/chat/conversations', params);
  },

  async getMessages(conversationId, params = {}) {
    return await apiClient.get(`/chat/conversations/${conversationId}/messages`, params);
  },

  async sendMessage(conversationId, messageData) {
    return await apiClient.post(`/chat/conversations/${conversationId}/messages`, messageData);
  },

  async startConversation(conversationData) {
    return await apiClient.post('/chat/conversations', conversationData);
  },

  async markMessagesAsRead(conversationId) {
    return await apiClient.put(`/chat/conversations/${conversationId}/read`);
  },

  async deleteConversation(conversationId) {
    return await apiClient.delete(`/chat/conversations/${conversationId}`);
  },

  async getUnreadCount() {
    return await apiClient.get('/chat/unread-count');
  }
};

// AI Matching API service
export const aiApi = {
  async matchDonors(matchingData) {
    return await apiClient.post('/ai/match-donors', matchingData);
  },

  async matchStock(matchingData) {
    return await apiClient.post('/ai/match-stock', matchingData);
  },

  async getDonationRecommendations() {
    return await apiClient.get('/ai/donation-recommendations');
  },

  async predictDemand(predictionData) {
    return await apiClient.post('/ai/predict-demand', predictionData);
  }
};

// Location API service
export const locationApi = {
  async getNearbyUsers(params = {}) {
    return await apiClient.get('/location/nearby', params);
  },

  async updateLocation(locationData) {
    return await apiClient.put('/location/update', locationData);
  },

  async getCurrentLocation() {
    return await apiClient.get('/location/current');
  },

  async calculateDistance(distanceData) {
    return await apiClient.post('/location/distance', distanceData);
  },

  async getBloodBanks(params = {}) {
    return await apiClient.get('/location/blood-banks', params);
  },

  async getHospitals(params = {}) {
    return await apiClient.get('/location/hospitals', params);
  },

  async searchLocations(params = {}) {
    return await apiClient.get('/location/search', params);
  }
};

// Admin API service
export const adminApi = {
  async getStats() {
    return await apiClient.get('/admin/stats');
  },

  async getAllUsers(params = {}) {
    return await apiClient.get('/admin/users', params);
  },

  async getUserById(userId) {
    return await apiClient.get(`/admin/users/${userId}`);
  },

  async verifyUser(userId, verificationData) {
    return await apiClient.put(`/admin/users/${userId}/verify`, verificationData);
  },

  async suspendUser(userId, suspensionData) {
    return await apiClient.put(`/admin/users/${userId}/suspend`, suspensionData);
  },

  async deleteUser(userId, deletionData) {
    return await apiClient.delete(`/admin/users/${userId}`, deletionData);
  },

  async getLogs(params = {}) {
    return await apiClient.get('/admin/logs', params);
  },

  async getAuditTrail(params = {}) {
    return await apiClient.get('/admin/audit', params);
  },

  async exportData(exportData) {
    return await apiClient.post('/admin/export', exportData);
  }
};

// Utility functions for API error handling
export const apiUtils = {
  handleApiError(error) {
    console.error('API Error:', error);
    
    const errorMessage = error.message || 'An unexpected error occurred';
    const errorCode = error.code || 'UNKNOWN_ERROR';
    const statusCode = error.status || 500;
    
    // Handle specific error types
    switch (statusCode) {
      case 400:
        return { message: 'Invalid request data', code: errorCode, status: statusCode };
      case 401:
        return { message: 'Authentication required', code: errorCode, status: statusCode };
      case 403:
        return { message: 'Access denied', code: errorCode, status: statusCode };
      case 404:
        return { message: 'Resource not found', code: errorCode, status: statusCode };
      case 429:
        return { message: 'Too many requests, please try again later', code: errorCode, status: statusCode };
      case 500:
        return { message: 'Server error, please try again later', code: errorCode, status: statusCode };
      default:
        return { message: errorMessage, code: errorCode, status: statusCode };
    }
  },

  isNetworkError(error) {
    return error.message.includes('fetch') || error.message.includes('network');
  },

  shouldRetry(error) {
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    return retryableStatuses.includes(error.status);
  },

  formatApiResponse(response) {
    return {
      success: response.success || true,
      data: response.data || response,
      message: response.message || 'Success',
      pagination: response.pagination
    };
  }
};

// Authentication utilities
export const authUtils = {
  getToken() {
    return localStorage.getItem('authToken');
  },

  setToken(token) {
    localStorage.setItem('authToken', token);
  },

  removeToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  },

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  getUserFromToken() {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
        name: payload.name
      };
    } catch {
      return null;
    }
  },

  logout() {
    this.removeToken();
    window.location.href = '/login';
  }
};

// Export all services as default
const api = {
  auth: authApi,
  donor: donorApi,
  hospital: hospitalApi,
  request: requestApi,
  stock: stockApi,
  alert: alertApi,
  notification: notificationApi,
  chat: chatApi,
  ai: aiApi,
  location: locationApi,
  admin: adminApi,
  utils: apiUtils,
  authUtils
};

export default api;