import { StyleSheet } from 'react-native';
import Metrics from '../../Themes/Metrics'
import Colors from '../../Themes/Colors'
export const colors = {
    black: '#1a1917',
    gray: '#888888',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'center',
        alignSelf:'flex-start',
        backgroundColor: Colors.transparent,
    },
    scrollview: {
        paddingTop: Metrics.baseMargin
    },
    scrollviewContentContainer: {
        paddingBottom: Metrics.baseMargin/2
    },
    title: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 8,
        backgroundColor: 'transparent',
        color: colors.black,
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: Metrics.baseMargin
    },
    sliderContentContainer: {
    },
    paginationContainer: {
        paddingVertical: 4,
        marginBottom:8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.92)'
    }
});
