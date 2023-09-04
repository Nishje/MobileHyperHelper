export type ApiTypes = {
    "/users": {
        POST: {
            request: {
                username: string;
                password: string;
                email: string;
            };
            response: Response;
        };
    };
    "/users/me": {
        GET: {
            request: {};
            response: Record<string, string>;
        };
    };
    "/sessions": {
        POST: {
            request: {
                email: string;
                password: string;
            };
            response: void;
        };
    };
    "/todos": {
        GET: {
            request: {};
            response: object[];
        };
        DELETE: {
            request: {};
            response: {};
        };
    };
};
