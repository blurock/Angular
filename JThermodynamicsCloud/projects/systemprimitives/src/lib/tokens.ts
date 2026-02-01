import { InjectionToken } from '@angular/core';

// This is the unique "key" for the dependency injection system
export const API_CONFIG = new InjectionToken<string>('api_config_token');
