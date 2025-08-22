"use server";

import { TSession } from "@/types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

export interface DecryptedSession {
    user: number | null;
    role: "user" | "superAdmin" | "admin" | "guest";
    iat: number;
    exp: number;
}

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload as unknown as DecryptedSession;
    } catch (error) {
        console.log("Failed to verify session:", error);
    }
}

export async function getSession(): Promise<TSession> {
    const cookie = (await cookies()).get("session")?.value;
    if (cookie) {
        const session = await decrypt(cookie);
        if (session?.user) {
            return { isAuth: true, user: session.user, role: session.role };
        }
    }

    return { isAuth: false, user: null, role: "guest" };
}
