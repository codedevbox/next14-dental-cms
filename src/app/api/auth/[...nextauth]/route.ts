import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import type { Adapter } from "next-auth/adapters";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

import { fetchUserByLogin } from "@/db/queries/users";
import { signInSchema } from "@/components/admin/auth/signInSchema";


const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        Credentials({
            credentials: {
                login: {
                    label: "Login",
                    type: "text",
                    placeholder: "Your Login",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials) => {
                try {
                    let user = null;

                    const { login, password } = await signInSchema.parseAsync(credentials);

                    user = await fetchUserByLogin(login);
                    if (!user) {
                        throw new Error("User not found.")
                    }

                    const isPassowrdCorrect = await bcrypt.compare(password, user.password);
                    if (!isPassowrdCorrect) {
                        throw new Error("User name or password is not correct");
                    }

                    const { password: pwd, ...userWithoutPass } = user;
                    return userWithoutPass;
                }
                catch (error) {
                    if (error instanceof ZodError) {
                        console.error("Validation error:", error.errors);
                    } else {
                        console.error("Authorization error:", error);
                    }
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session({ session, token }) {
            session.user = token.user;
            return session;
        },
        jwt({ token, user }) {
            if (user) token.user = user as User;
            return token;
        },
    },
    pages: {
        signIn: "/en/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
};

const hander = NextAuth(authOptions);

export {hander as GET, hander as POST};
