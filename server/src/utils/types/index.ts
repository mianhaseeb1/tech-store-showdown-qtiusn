import { Request, Response, NextFunction } from 'express'

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type Controller = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Route = {
    method: HttpMethod;
    route: string;
    middlewares: Middleware[];
    controller: Controller;
};

export type RequestObject = Request & {
    currentUser?: {
        id: string;
        email: string;
        name: string;
    };
}

export type Secret = {
    port: string;
    dbConfig: {
        DATABASE_URL: string;
    }
    jwtConfig: {
        SECRET: string;
        EXPIRES_IN: string;
    };
    bcryptConfig: {
        SALT_ROUNDS: string;
    };
}

export enum AddressType {
    SHIPPING = 'shipping',
    BILLING = 'billing',
}

export type IAddressType = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    type: AddressType;
    userId: string;
}
