import { Screens } from "./data_objects/enums/screens";
import { IMAGES } from "./image_handler";


export const GAMES = [
    {
        id: 1,
        name: 'ידעתי/לא ידעתי',
        page_name: Screens.KDK,
        description: 'משחקונים קצרים שבודקים האם הינך יודע את המילים.',
        image_route: IMAGES.kdk,
    },
    {
        id: 2,
        name: 'רב ברירה',
        page_name: Screens.MC,
        description: 'בחר את הפירוש הנכון מבין ארבעת הפירושים.',
        image_route: IMAGES.mc,
    },
    {
        id: 3,
        name: 'מתח את הקו',
        page_name: '',
        description: 'מתח את הקו בין המילה לפירוש המתאים.',
        image_route: IMAGES.mc,
    },
];