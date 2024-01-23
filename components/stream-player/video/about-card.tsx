"use client";

import { VerifiedMark } from "@/components/verified-mark";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { BioModal } from "./bio-modal";

interface AboutCardProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followedByCount: number;
}

export const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount,
}: AboutCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    const followedByLabel = followedByCount === 1 ? "follower" : "followers";

    return (
        <div className="px-4">
            <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        About {hostName}
                        <VerifiedMark />
                    </div>
                    {isHost && 
                        <BioModal initialValue={bio} />
                    }
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">
                        {followedByCount}
                    </span>{" "}
                    {followedByLabel}
                </div>
                <Label className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                    Bio
                </Label>
                <p
                    className={cn(
                        "text-sm",
                        bio ? "" : "text-muted-foreground italic"
                    )}
                >
                    {bio || ". . . This user prefers to stay mysterious."}
                </p>
            </div>
        </div>
    );
};
