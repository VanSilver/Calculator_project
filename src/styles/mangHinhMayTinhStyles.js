import { StyleSheet } from 'react-native';

const mangHinhMayTinhStyles = StyleSheet.create({
    view_may_tinh: {
        flex: 1,
        backgroundColor: "#E8E8E8",
        flexDirection: "column",
    },
    resultView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 20,
    },
    resultView2: {
        flex: 2,
        justifyContent: "center",
        alignItems: "flex-end",
        borderBottomWidth: 2,
    },
    result: {
        fontSize: 30,
    },
    keyboard: {
        flex: 4,
        backgroundColor: 'black',
    },
    row: {
        flex: 1,
        flexDirection: "row",
        borderColor: "black",
        // borderBottomWidth: 2,
    },
    cell: {
        backgroundColor: '#F0F8FF',
        flex: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 75,
    },
    cellText: {
        fontSize: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(240, 248, 255, 1)",
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: "black",
        borderWidth: 2,
        marginBottom: 10,
    },
});

export default mangHinhMayTinhStyles;