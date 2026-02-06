import { InjectionToken } from '@angular/core';

// This is the unique "key" for the dependency injection system
export const API_CONFIG = new InjectionToken<string>('api_config_token');
export const GOOGLE_MAP_KEY = new InjectionToken<string>('google_map_key_token');
