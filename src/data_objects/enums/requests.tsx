import { setProfilePicture } from "../../requests/change_profile_picture_request";
import getProfileData from "../../requests/profile_data_request";
import { getLeaderboardData } from "../../requests/top_rated_request";
import updateUserStatistics from "../../requests/update_stats_request";

export const Requests = {
    GetProfileData: getProfileData,
    SetProfilePicture: setProfilePicture,
    GetLeaderboardData: getLeaderboardData,
    UpdateUserStatistics: updateUserStatistics,
} as const;