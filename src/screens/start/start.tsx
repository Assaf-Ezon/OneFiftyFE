import { View, Image, Text, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Popup from './popups/popups';

import StartScreenStyle from './start_style';

import { IMAGES } from '../../image_handler';

import { useProfile } from '../../context/general_context/profile_context';
import { useWords } from '../../context/general_context/words_context';
import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';

import AuthenticationHandler from '../AuthenticationHandler';

import getProfileData from '../../requests/profile_data_request';
import { getLeaderboardData, getUserRankByName } from '../../requests/top_rated_request';


const StartScreen = ({ navigation }: {navigation: any}) => {
    // contexts
    const {setProfile} = useProfile();
    const {hebrewWords, 
        setHebrewWords, 
        englishWords, 
        setEnglishWords, 
        hebrewUserStatistics, 
        setHebrewUserStatistics, 
        englishUserStatistics, 
        setEnglishUserStatistics, 
        hebrewNewWords, 
        updateNewHebrewWords, 
        englishNewWords, 
        updateNewEnglishWords} = useWords();

    const {setStackIndexByName} = useStackManagerContext();
    
    const auth = new AuthenticationHandler();

    // loading flag
    const [loading, setLoading] = useState<boolean>(false);

    // popup flag and index
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [popupIndex, setPopupIndex] = useState<number>(1);


    const [request, response, promptAsync] = auth.getAuthCode();

    // activated when there is a response
    useEffect(() => { 
        const processResponse = async () => {
            if (response && response.type == 'success') {
                setLoading(true);
                await saveInfo();
                await handleUserData();
            } else {
                setLoading(false);

                setPopupIndex(1);
                setPopupOpen(true);
            }
        };
        processResponse();
    }, [response]); 

    // saves token and name inside the local storage
    const saveInfo = async () => {
        if (response && response.type == 'success') {
            const success = await auth.getAuthToken(request, response);
            if (!success) {
                setLoading(false);

                setPopupIndex(1);
                setPopupOpen(true);
            }
        }  
    };

    // sets profile and words context with fetched data
    const handleUserData = async () => {
        const data = await getProfileData();
        
        // the user data is what we need
        if (data && typeof data !== 'number' && 'UserData' in data) { 
            // the version is latest
            if (!data.UserData.IsActive) {
                setPopupIndex(2);
                setPopupOpen(true);
            } 
            // the user is active
            else {
                const leaderboardData = await getLeaderboardData('OverallScore', false);

                var userRank = 0;

                if (leaderboardData && typeof leaderboardData !== 'number' && 'Scores' in leaderboardData) {
                    const name = await AuthenticationHandler.getInstance().getName();
                    var userRank = getUserRankByName(leaderboardData.Scores, typeof name === 'string' ? name : '');
                } 
                
                setProfile({
                  name: data.UserData.DisplayName,
                  email: data.UserData.Email,
                  rank: userRank,
                  score: data.UserData.Score,
                  dateJoined: new Date(data.UserData.DateJoined), 
                  expirationDate: new Date(data.UserData.ExpirationDate), 
                  profileImage: IMAGES.profile_images[data.UserData.ProfilePicture],
              });

                setHebrewWords(data.HebrewWordsDictionary);
                setEnglishWords(data.EnglishWordsDictionary);
                setHebrewUserStatistics(data.HebrewUserStatistics);
                setEnglishUserStatistics(data.EnglishUserStatistics);
            }
        } else {
            setLoading(false);

            setPopupIndex(1);
            setPopupOpen(true);
        }
    };

    // handles calculating new words for hebrew - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(hebrewWords).length > 0 && Object.keys(hebrewUserStatistics).length > 0) {
            updateNewHebrewWords();
        }
    }, [hebrewWords, hebrewUserStatistics]);

    // handles calculating new words for english - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(englishWords).length > 0 && Object.keys(englishUserStatistics).length > 0) {
            updateNewEnglishWords();
        }
    }, [englishWords, englishUserStatistics]);

    // changes the navigation stack when the new word dict is built
    useEffect(() => {
        if (Object.keys(hebrewNewWords).length > 0 && Object.keys(englishNewWords).length > 0) {
            setLoading(false);
            setStackIndexByName(StackNames.Main);
        }
    }, [hebrewNewWords, englishNewWords]);

    return(
      <View style={StartScreenStyle.container}>
        <View style={[{opacity: loading || popupOpen ? 0.2 : 1}, StartScreenStyle.image]} pointerEvents={ loading || popupOpen ? 'none' : 'auto' }>
            <Image source={IMAGES.start_screen} />       
        </View>

        {loading ? <View style={StartScreenStyle.loadingContainer}><ActivityIndicator size="large" color="#0000ff" style={StartScreenStyle.loading} /></View> : null}   
        {popupOpen ? <Popup index={popupIndex} setPopupOpen={setPopupOpen} /> : null}

        <View style={[{opacity: loading || popupOpen ? 0.2 : 1}, StartScreenStyle.textContainer]} pointerEvents={ loading || popupOpen ? 'none' : 'auto' }>
            <Text style={StartScreenStyle.title}>
                150 - לומדת פסיכומטרי{'\n'}
                למד מילים בכל מקום
            </Text>
            <Text style={StartScreenStyle.paragraph}>
                150 הינו כלי ללימוד מילים בעברית ובאנגלית כחלק מהכנה{'\n'}
                למבחן הפסיכומטרי. מגוון משחקונים ולומדות לצורך שינון{'\n'}
                ולמידה של מילים חדשות.
            </Text>
            <View style={StartScreenStyle.btnContainer}>
                <Pressable style={StartScreenStyle.btn} onPress={() => {promptAsync({ showInRecents: true })} }>
                    <Text style={StartScreenStyle.btnText}>בואו נתחיל</Text>            
                </Pressable>
            </View>
        </View>
      </View>
    );
};

export default StartScreen;