import os
import requests
from typing import Optional, Dict, Any
import logging

class BaseClient:
    ROBOT_LIBRARY_SCOPE = "GLOBAL"

    def __init__(self):
        self.base_url = os.getenv("BASE_URL", "http://localhost:5000")
        self.session = requests.Session()
        self.timeout = int(os.getenv("REQUEST_TIMEOUT", "30"))
        self.logger = logging.getLogger(__name__)
        
    def _build_url(self, path: str) -> str:
        """Build complete URL from path"""
        return f"{self.base_url}{path}"
    
    def _log_request(self, method: str, url: str, **kwargs):
        """Log request details"""
        self.logger.info(f"{method} {url}")
        if 'json' in kwargs:
            self.logger.debug(f"Request body: {kwargs['json']}")
    
    def _log_response(self, response: requests.Response):
        """Log response details"""
        self.logger.info(f"Response status: {response.status_code}")
        self.logger.debug(f"Response body: {response.text}")
    
    def post(self, path: str, json: Optional[Dict] = None, 
             headers: Optional[Dict] = None, **kwargs) -> requests.Response:
        """Make POST request"""
        url = self._build_url(path)
        self._log_request("POST", url, json=json)
        
        response = self.session.post(
            url,
            json=json,
            headers=headers,
            timeout=self.timeout,
            **kwargs
        )
        
        self._log_response(response)
        return response
    
    def get(self, path: str, headers: Optional[Dict] = None, 
            params: Optional[Dict] = None, **kwargs) -> requests.Response:
        """Make GET request"""
        url = self._build_url(path)
        self._log_request("GET", url)
        
        response = self.session.get(
            url,
            headers=headers,
            params=params,
            timeout=self.timeout,
            **kwargs
        )
        
        self._log_response(response)
        return response
    
    def put(self, path: str, json: Optional[Dict] = None, 
            headers: Optional[Dict] = None, **kwargs) -> requests.Response:
        """Make PUT request"""
        url = self._build_url(path)
        self._log_request("PUT", url, json=json)
        
        response = self.session.put(
            url,
            json=json,
            headers=headers,
            timeout=self.timeout,
            **kwargs
        )
        
        self._log_response(response)
        return response
    
    def patch(self, path: str, json: Optional[Dict] = None, 
              headers: Optional[Dict] = None, **kwargs) -> requests.Response:
        """Make PATCH request"""
        url = self._build_url(path)
        self._log_request("PATCH", url, json=json)
        
        response = self.session.patch(
            url,
            json=json,
            headers=headers,
            timeout=self.timeout,
            **kwargs
        )
        
        self._log_response(response)
        return response
    
    def delete(self, path: str, headers: Optional[Dict] = None, 
               **kwargs) -> requests.Response:
        """Make DELETE request"""
        url = self._build_url(path)
        self._log_request("DELETE", url)
        
        response = self.session.delete(
            url,
            headers=headers,
            timeout=self.timeout,
            **kwargs
        )
        
        self._log_response(response)
        return response
    
    def set_auth_token(self, token: str):
        """Set authorization token for all subsequent requests"""
        self.session.headers.update({"Authorization": f"Bearer {token}"})
    
    def clear_auth_token(self):
        """Clear authorization token"""
        if "Authorization" in self.session.headers:
            del self.session.headers["Authorization"]
    
    def close_session(self):
        """Close the session"""
        self.session.close()