import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import {
    useCommentQuizMutation,
    useCreateQuizMutation,
    useDeleteQuizMutation,
    useLikeQuizMutation,
    useUpdateQuizMutation,
} from 'src/services/quizApi';

import { createQuiz } from 'src/slices/quizSlice';

import { useSelector, useDispatch } from 'react-redux';
export default function LeaderBoard() {
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
