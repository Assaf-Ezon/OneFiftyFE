import { Screens } from "./screens";
import { IMAGES } from "../../image_handler";

export const GAMES = {
    KDK: {
        id: 1,
        name: 'ידעתי/לא ידעתי',
        page_name: Screens.KDK,
        description: 'משחקונים קצרים שבודקים האם הינך יודע את המילים.',
        image_route: IMAGES.kdk,
    },
    MC: {
        id: 2,
        name: 'רב ברירה',
        page_name: Screens.MC,
        description: 'בחר את הפירוש הנכון מבין ארבעת הפירושים.',
        image_route: IMAGES.mc,
    },
} as const;
