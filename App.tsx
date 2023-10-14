import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Animated, RefreshControl, TouchableOpacity, Image, Button, Modal, Linking } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import Calculator from './src/components/Calculator';
import styles from './src/styles/homeStyles';

const initialData = [
  { id: '1', name: 'Văn Vui Vẻ', mssv: 'B2016942', facebook: 'https://www.facebook.com/VanSilver.ytb/', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
  { id: '2', name: 'Tâm Mọng', mssv: 'B2007124', facebook: 'https://www.facebook.com/profile.php?id=100011405509487', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
  { id: '3', name: 'Điền Độ', mssv: 'B2007154', facebook: 'https://www.facebook.com/Ronaldiens/', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
  { id: '4', name: 'Băng Quyền Quán Quân', mssv: 'B2016883', facebook: 'https://www.facebook.com/profile.php?id=100029465510458', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
  { id: '5', name: 'Hậu đậu', mssv: 'B2016896', facebook: 'https://www.facebook.com/long.hao.1829', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
  { id: '6', name: 'Anonymous', mssv: 'B20xxxxx', facebook: 'https://www.facebook.com/', image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png' },
];
const allData = [...initialData];

const ItemSeparator = () => {
  return (
    <View style={styles.separator} />
  );
};

const App = () => {
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [shuffledData, setShuffledData] = useState(allData);
  const animatedScale = useRef(new Animated.Value(1)).current;

  // phần khai báo cho modal facebook
  const [facebookModalVisible, setFacebookModalVisible] = useState(false);
  const [facebookProfileLink, setFacebookProfileLink] = useState("");

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
      
      {/* dẫn đường dẫn cục bộ */}
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
  const FacebookModal = ({ isVisible, onClose, profileLink }) => {
    // Component cho Modal Facebook
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>【Ｆａｃｅｂｏｏｋ】</Text>
          <TouchableOpacity onPress={() => Linking.openURL(profileLink)}>
            <Image source={require('./src/assets/images/Facebook_Logo.png')} style={styles.modalImage} />
            {/* <Text style={styles.facebookLink}>{profileLink}</Text> */}
          </TouchableOpacity>
          <Button title="Close" onPress={onClose} />
        </View>
      </Modal>
    );
  };
  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Home"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'home', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Calculator"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'calculator', type: 'ionicon', color: 'white' }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>

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

        </TabView.Item>

        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          
          <Calculator />
          
        </TabView.Item>
      </TabView>
    </>
  );
};
export default App;
