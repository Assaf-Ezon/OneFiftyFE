import { WordDetails } from "../basic_data_objects/word_details"

// type of the "new words" dict that is generated on "profile data" request
export type NewWords = {
    [groupId: number]: { 
        [word: string]: WordDetails 
    }
}