import { StyleSheet } from 'react-native';

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
    modalContainer: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'rgba(250, 250, 250, 0.9)',
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

  export default styles;