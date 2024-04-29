/*
 * Copyright © 2024 Eidosmedia S.p.a. All rights reserved.
 * Licensed under the terms of the Eidosmedia Software License Agreement.
 * See LICENSE file in project root for terms and conditions.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface IErrorBase<T> {
    error: Error | AxiosError<T>;
    type: 'axios-error' | 'stock-error';
}

interface IAxiosError<T> extends IErrorBase<T> {
    error: AxiosError<T>;
    type: 'axios-error';
}

interface IStockError<T> extends IErrorBase<T> {
    error: Error;
    type: 'stock-error';
}

export class HttpClient {
    protected instance: AxiosInstance | null = null;

    // protected baseUrl = '';

    // constructor(baseUrl?: string) {
    //     this.baseUrl = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
    // }

    protected get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initAxios();
    }

    initAxios() {
        const http = this.initHttp();
        this.instance = http;
        // http.interceptors.response.use(response => response, this.handleError);
        // this.initLogs();
        return http;
    }

    initHttp() {
        // const headers = buildHeaders();
        const http = axios.create({
            // headers
        });
        return http;
    }

    // initLogs() {
    //     this.http.interceptors.request.use(request => {
    //         logRequest(request);
    //         return request;
    //     });

    //     this.http.interceptors.response.use(response => {
    //         logResponseSuccess(response);
    //         return response;
    //     });
    // }

    request<T = never, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config);
    }

    get<T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        const params = {
            ...(config?.params || {})
        };
        return this.http.get<T, R>(url, {
            ...config,
            params
        });
    }

    post<T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
        return this.http.post<T, R>(url, data, config);
    }

    put<T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
        return this.http.put<T, R>(url, data, config);
    }

    patch<T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
        return this.http.patch<T, R>(url, data, config);
    }

    delete<T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config);
    }

    // Handle global app errors
    // We can handle generic app errors depending on the status code
    // protected handleError(error: AxiosError, convertError: IErrorConverter = convertCatchException): Promise<IError> {
    //     const { response } = error;
    //     // response && logResponseError(response);

    //     const convertedError = convertError(error);
    //     return Promise.reject(convertedError);
    // }
}

/**
 *
 * @param callback
 */
export function axiosErrorHandler<T>(callback: (err: IAxiosError<T> | IStockError<T>) => void) {
    return (error: Error | AxiosError<T>) => {
        if (axios.isAxiosError(error)) {
            callback({
                error,
                type: 'axios-error'
            });
        } else {
            callback({
                error,
                type: 'stock-error'
            });
        }
    };
}

export const http = new HttpClient();
