import { StyleSheet } from 'react-native';
import { FilterSearchNavigation } from 'src/navigation/DiscoverNavigator';

const FilterSearch = () => {
    return <FilterSearchNavigation />;
};

export default FilterSearch;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        alignSelf: 'stretch',
        marginTop: 25,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: 2000,
    },
});
