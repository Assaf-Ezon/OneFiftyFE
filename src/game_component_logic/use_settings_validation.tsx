import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLearningSettingsContext } from "../context/settings_context/learning_context";
import { Screens } from "../data_objects/enums/screens";

// validates if settings are filled
export const useSettingsValidation = () => {
    const navigation = useNavigation();

    const { isSettingsFilled, toggleLearningSettings } = useLearningSettingsContext();

    useEffect(() => {
        if (!isSettingsFilled()) {
            toggleLearningSettings();
            navigation.navigate(Screens.LEARNING as never);
        }
    }, []);
}