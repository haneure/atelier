import { createViewerToken } from "@/actions/token";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string
                }

                const name = decodedToken?.name;
                if (name) {
                    setName(name);
                }
                
                const identity = decodedToken.jti;
                if (identity) {
                    setIdentity(identity);
                }
            } catch {
                toast.error("Something went wrong");
            }
        }

        createToken();
    }, [hostIdentity])

    return {
        token,
        name,
        identity,
    };
};