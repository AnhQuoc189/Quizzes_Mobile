import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import BoxQuiz from '../BoxQuiz';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuizes } from 'src/slices/quizSlice';
import { useGetAllQuizzesQuery } from 'src/services/quizApi';
import filter from 'lodash.filter';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { API } from 'src/constants/api';

const QuizFilter = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [data, setData] = useState();
    const [result, setResults] = useState([]);
    const [showData, setShowData] = useState(true);
    const userData = useSelector((state) => state.auths?.authData);
    const searchQuery = useSelector((state) => state.searchs.searchQuery);
    const accessToken = userData?.data?.accessToken;

    const quizes = useSelector((state) => state.quizs.allquizes);

    useEffect(() => {
        if (quizes) {
            setData(quizes);
        }
    }, [quizes]);

    useEffect(() => {
        if (isFocused && data) {
            setShowData(false);
            const contains = ({ name, creatorName }, query) => {
                if (
                    name?.toLowerCase().includes(query) ||
                    creatorName?.toLowerCase().includes(query)
                ) {
                    return true;
                }
                return false;
            };

            const fotmatQuery = searchQuery.toLowerCase();
            const filterData = filter(data, (quiz) => {
                return contains(quiz, fotmatQuery);
            });
            setResults(filterData);
        }
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            {/* {!result.length && <ActivityIndicator size="large" color="#333" />} */}
            {!data && <ActivityIndicator size="large" color="#333" />}
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                data={showData ? data : result}
                refreshing
                renderItem={({ item }) => (
                    <BoxQuiz
                        key={item}
                        quizData={item}
                        navigation={navigation}
                        mylibrary={false}
                        direct="DetailQuiz"
                        decover={true}
                    />
                )}
            />
        </View>
    );
};

export default QuizFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        padding: 15,
        marginBottom: 70,
    },
});
