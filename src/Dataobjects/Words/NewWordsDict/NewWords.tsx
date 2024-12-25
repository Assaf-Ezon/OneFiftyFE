import { WordDetails } from "../BasicDataObjects/WordDetails"

// type of the "new words" dict that is generated on "profile data" request
export type NewWords = {
    [groupId: number]: { 
        [word: string]: WordDetails 
    }
}