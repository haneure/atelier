"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import { hostname } from "os";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
}

export const ChatCommunity = ({
    hostName,
    viewerName,
    isHidden,
}: ChatCommunityProps) => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce<string>(value, 500);

    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    const filterParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }

            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[])
        console.log(deduped)
        return deduped.filter((participant) => {
            return participant.name?.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase());
        })
    }, [participants, debouncedValue])

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    }
    
    return (
        <div className="p-4">
            <Input 
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    No results
                </p>
                {filterParticipants.map((participant) => (
                    <CommunityItem 
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
        );
};
