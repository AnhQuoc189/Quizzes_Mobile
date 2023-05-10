import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import {
    useCommentQuizMutation,
    useCreateQuizMutation,
    useDeleteQuizMutation,
    useLikeQuizMutation,
    useUpdateQuizMutation,
} from 'src/services/quizApi';
import { useSelector } from 'react-redux';
export default function LeaderBoard() {
    // const [formQuiz, { data, isLoading, error }] = useCreateQuizMutation();
    // const [likeQuiz, { data, isLoading, error }] = useLikeQuizMutation();
    // const [commentQuiz, { data, isLoading, error }] = useCommentQuizMutation();
    // const [updateQuiz, { data, isLoading, error }] = useUpdateQuizMutation();
    // const [deleteQuiz, { data, isLoading, error }] = useDeleteQuizMutation();

    const userData = useSelector((state) => state.auths?.authData);
    const userId = userData?.data?.user?._id;
    const accessToken = userData?.data?.accessToken;

    const TestApi = () => {
        // formQuiz({ accessToken, newQuiz: 'Co cai dau bui' });
        // likeQuiz({ accessToken, userId });
        // commentQuiz({ accessToken, userId, comment: 'AnhQuocdacomment' });
        // updateQuiz({
        //     accessToken,
        //     quizId: '123125123a124125412',
        //     updateQuiz: 'AnhQuocdacomment',
        // });
        // deleteQuiz({ accessToken, quizId: '123123qate123123123a' });
    };

    const Test = () => {};
    return (
        <SafeAreaView>
            <View style={{ marginTop: 100 }}>
                <TouchableOpacity onPress={TestApi}>
                    <Text>LeaderBoard</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
