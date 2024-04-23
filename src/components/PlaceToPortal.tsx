import {FC, ReactNode} from "react";
import {portalIds} from "../types/portalIds";
import {createPortal} from "react-dom";

interface IPlaceToPortalProps {
    children: ReactNode[] | ReactNode;
    portalId: keyof typeof portalIds;
}

export const PlaceToPortal: FC<IPlaceToPortalProps> = ({portalId, children}) => {
    const portal = document.getElementById(portalIds[portalId]);

    return portal && createPortal(children, portal);
};