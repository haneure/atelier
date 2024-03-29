"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
    const self = await getSelf();

    let blockedUser;

    try {
        blockedUser = await blockUser(id);
    } catch {
        // This means user is a guest or the user is not found in the database
    }

    try {
        // TODO: For guest, use client to get the IP or something else as ID, so even when
        // guest refresh the browser, he is still getting blocked
        roomService.removeParticipant(self.id, id)
    } catch {
        // This means user is not in the room
    }

    revalidatePath(`/u/${self.username}/community`)

    return blockedUser;
}

export const onUnblock = async (id: string) => {
    const self = await getSelf();
    const unblockedUser = await unblockUser(id);

    revalidatePath(`/u/${self.username}/community`)

    return unblockedUser;
}