"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, CopyIcon } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
    value?: string;
};

export const CopyButton = ({
    value,
}: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        if (!value) return;

        setIsCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000)
    };

    const Icon = isCopied ? CheckCheck : CopyIcon;

    return (
        <Button
            onClick={onCopy}
            disabled={!value || isCopied}
            variant="ghost"
            size="sm"
        >
            <Icon className="h-4 w-4" />
        </Button>
    );
};