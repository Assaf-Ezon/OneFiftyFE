import { WordDetails } from "./WordDetails";

// type of word data in statistics format
export type WordStatisticsData = {
    Word: WordDetails;                 
    ConsecutiveSuccesses: number; 
    LastSeen: string;           
    Successes: number;          
    Failures: number;            
}
