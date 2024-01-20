import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecommended = async () => {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }

    let users = [];

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId,
                        },
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    } else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });
    }

    return users;
}
