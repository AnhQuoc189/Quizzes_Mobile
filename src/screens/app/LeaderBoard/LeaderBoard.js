// Libraries
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import {
    useCommentQuizMutation,
    useCreateQuizMutation,
    useDeleteQuizMutation,
    useLikeQuizMutation,
    useUpdateQuizMutation,
} from 'src/services/quizApi';
import { createQuiz } from 'src/slices/quizSlice';

// Components, colors, constants
import {
    Header,
    DurationTabs,
    Weekly,
    AllTime,
} from 'src/components/leaderboard';
import { colors } from 'src/styles/color';
import { userLeaderboard } from 'src/constants/userLeaderboard.constant';

// 2 button Tab thời gian
const durationTabs = ['Weekly', 'All Time'];

export default function LeaderBoard({ navigation }) {
    const [formQuiz, { data, isLoading, error }] = useCreateQuizMutation();
    const dispatch = useDispatch();
    // const [likeQuiz, { data, isLoading, error }] = useLikeQuizMutation();
    // const [commentQuiz, { data, isLoading, error }] = useCommentQuizMutation();
    // const [updateQuiz, { data, isLoading, error }] = useUpdateQuizMutation();
    // const [deleteQuiz, { data, isLoading, error }] = useDeleteQuizMutation();

    const userData = useSelector((state) => state.auths?.authData);
    const userId = userData?.data?.user?._id;
    const accessToken = userData?.data?.accessToken;

    // useEffect(() => {
    //     if (data) {
    //         console.log(data);
    //     }
    // });
    const TestApi = async () => {
        // console.log('CC');
        const { data } = await formQuiz({
            accessToken,
            newQuiz: {
                name: 'QuocTuan',
                backgroundImage: '',
                description: 'Hehe',
                creatorName: 'QuocAnh',
                pointsPerQuestion: 1,
                isPublic: true,
                tags: [],
                likesCount: [],
                questionList: [],
            },
        });
        console.log(data);
        dispatch(createQuiz(data));
        // likeQuiz({ accessToken, userId });
        // commentQuiz({ accessToken, userId, comment: 'AnhQuocdacomment' });
        // updateQuiz({
        //     accessToken,
        //     quizId: '123125123a124125412',
        //     updateQuiz: 'AnhQuocdacomment',
        // });
        // deleteQuiz({ accessToken, quizId: '123123qate123123123a' });
    };

    //
    // NhatDev IS HERE

    const [activeTab, setActiveTab] = useState(durationTabs[0]);

    const displayTabContent = () => {
        switch (activeTab) {
            case 'Weekly':
                return <Weekly data={userLeaderboard} />;
            case 'All Time':
                return <AllTime data={userLeaderboard} />;
            default:
                break;
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.primary,
                paddingTop: 16,
                paddingHorizontal: 10,
            }}
        >
            <Header title="Leaderboard" navigation={navigation} direct="Home" />

            <DurationTabs
                durationTabs={durationTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {displayTabContent()}
        </SafeAreaView>
    );
}
