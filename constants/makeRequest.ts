import { ApiTypes } from "./ApiTypes";
import { BASE_URL } from "./links";
// import { HttpMethods } from "./types";

type HttpMethods = "GET" | "PUT" | "PATCH" | "DELETE" | "POST";

type ApiResponseKey<
    T extends keyof ApiTypes,
    M extends HttpMethods & keyof ApiTypes[T]
> = keyof ApiTypes[T][M] & "response";

type ApiRequestKey<
    T extends keyof ApiTypes,
    M extends HttpMethods & keyof ApiTypes[T]
> = keyof ApiTypes[T][M] & "request";

type ApiResponseForMethod<
    T extends keyof ApiTypes,
    M extends HttpMethods & keyof ApiTypes[T]
> = ApiTypes[T][M][ApiResponseKey<T, M>];

type ApiRequestForMethod<
    T extends keyof ApiTypes,
    M extends HttpMethods & keyof ApiTypes[T]
> = ApiTypes[T][M][ApiRequestKey<T, M>];

export async function makeApiRequest<
    T extends keyof ApiTypes,
    M extends HttpMethods & keyof ApiTypes[T]
>(
    path: T,
    method: M,
    body?: ApiRequestForMethod<T, M>
): Promise<ApiResponseForMethod<T, M>> {
    const response: Response = await fetch(`${BASE_URL}/${path}`, {
        method: method,
        credentials: "include",
        body: JSON.stringify(body),
    });

    const data: ApiResponseForMethod<T, M> = await response.json();
    return data;
}

export async function makeCustomRequest<TBody, TResponse>(
    path: string,
    method: HttpMethods,
    body?: TBody
): Promise<TResponse> {
    const response: Response = await fetch(`${BASE_URL}/${path}`, {
        method: method,
        credentials: "include",
        body: JSON.stringify(body),
    });

    const data: TResponse = await response.json();
    return data;
}
