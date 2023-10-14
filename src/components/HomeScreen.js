import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Animated, RefreshControl, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';

const initialData = [
    { id: '1', name: 'Văn Vui Vẻ', mssv: 'B2016942', facebook: 'https://www.facebook.com/VanSilver.ytb/', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
    { id: '2', name: 'Tâm Mọng', mssv: 'B2007124', facebook: 'https://www.facebook.com/profile.php?id=100011405509487', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
    { id: '3', name: 'Điền Độ', mssv: 'B2007154', facebook: 'https://www.facebook.com/Ronaldiens/', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
    { id: '4', name: 'Băng Quyền Quán Quân', mssv: 'B2016883', facebook: 'https://www.facebook.com/profile.php?id=100029465510458', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
    { id: '5', name: 'Hậu đậu', mssv: 'B2016896', facebook: 'https://www.facebook.com/long.hao.1829?mibextid=ZbWKwL', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
    { id: '6', name: 'Anonymous', mssv: 'B20xxxxx', facebook: 'https://www.facebook.com/', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
];
const allData = [...initialData];

const ItemSeparator = () => {
    return (
        <View style={styles.separator} />
    );
};

const HomeScreen = () => {

    const [refreshing, setRefreshing] = useState(false);
    const [shuffledData, setShuffledData] = useState(allData);
    const animatedScale = useRef(new Animated.Value(1)).current;

    // phần khai báo cho modal facebook
    const [facebookModalVisible, setFacebookModalVisible] = useState(false);
    const [facebookProfileLink, setFacebookProfileLink] = useState(""); // Thêm state này

    const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    const onRefresh = () => {
        const shuffled = shuffleArray(allData);
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            setShuffledData(shuffled);
            animatedScale.setValue(0);
            Animated.timing(animatedScale, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }).start();
        }, 2000);
    };
    const renderItem = ({ item, index }) => (
        <Animated.View style={[styles.item, { transform: [{ scale: index === 0 ? animatedScale : 1 }] }]}>
            {/* dẫn đường dẫn online */}
            {/* <Image source={{ uri: item.image }} style={styles.itemImage} />  */}
            <Image source={require('./src/assets/images/Logo_Dai_hoc_Can_Tho.png')} style={styles.itemImage} />
            <TouchableOpacity onPress={() => handleNamePress(item.name)}>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemMssv}>{item.mssv}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
    const handleNamePress = (name) => {
        // Xử lý khi tên người dùng được nhấn
        const member = allData.find((member) => member.name === name);
        if (member) {
            setFacebookModalVisible(true);
            setFacebookProfileLink(member.facebook);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={shuffledData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="black"
                        title="Đang làm mới..."
                        titleColor="black"
                    />
                }
                ItemSeparatorComponent={ItemSeparator}
                onEndReachedThreshold={0.1}
            />
            <FacebookModal
                isVisible={facebookModalVisible}
                onClose={() => setFacebookModalVisible(false)}
                profileLink={facebookProfileLink}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 1,
    },

    flatList: {
        flex: 1,
    },

    item: {
        backgroundColor: 'lightblue',
        padding: 28,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    separator: {
        height: 2,
        backgroundColor: 'black', // Màu của phần tách
    },

    itemImage: {
        width: 70,
        height: 70,
        marginRight: 1,
    },

    itemTextContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    itemText: {
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    },

    itemMssv: {
        color: 'black',
        fontSize: 25,
    },

    headerContainer: {
        backgroundColor: 'blue',
        width: '100%',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '10%',
    },
    bottomRow: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '150%',
        height: '20%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 0.9)', // Màu nền xám xuyên qua màn hình chính
        padding: 28,
    },
    modalTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    modalImage: {
        width: 250,
        height: 250,
    },
    facebookLink: {
        fontSize: 16,
        color: 'blue', // Màu của liên kết
        textDecorationLine: 'underline', // Gạch chân liên kết
        marginBottom: 1,
    },
});

export default HomeScreen;