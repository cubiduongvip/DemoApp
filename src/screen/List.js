import React from 'react';
import axios from 'axios';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

export default class List extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Danh sách'
  });

  state = { isLoading: true, data: null };

  componentWillMount = () => {
    this.getList();
  };

  getList = () => {
    this.setState({ isLoading: true });
    axios
      .get('http://113.190.240.90:2004/api/v1/Zone/list', {
        params: { app_type: 1 }
      })
      .then(response => {
        setTimeout(() => {
          const { data } = response;
          if (data && data.status && data.status.toString() === '1') {
            this.setState({ isLoading: false, data: data.data });
          } else {
            Alert.alert('Thông báo', 'Lỗi api');
            this.setState({ isLoading: false });
          }
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          Alert.alert('Thông báo', 'Lỗi mạng');
          this.setState({ isLoading: false });
        }, 2000);
      });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.navigate('Item', { item, name: item.name });
        }}
      >
        <View style={styles.styleItem}>
          <Text>{`Id: ${item.id}`}</Text>
          <Text>{`Name: ${item.name}`}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.styleContainerDangTai}>
          <View style={styles.styleContentDangTai}>
            <Text style={styles.styleTextDangTai}>Đang tải...</Text>
            <ActivityIndicator size="large" color="#00f" />
          </View>
        </View>
      );
    }
    if (!this.state.data) {
      return (
        <View style={styles.styleContainerThuLai}>
          <Text style={styles.styleTextThuLai}>Danh sách trống</Text>
          <Button title="Thử lại" onPress={this.getList} />
        </View>
      );
    }
    return (
      <View style={styles.styleContainer}>
        <FlatList
          data={this.state.data}
          keyExtractor={(v, i) => i.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  styleContainer: { flex: 1 },
  styleTextThuLai: { fontSize: 15, fontWeight: '100', color: 'gray' },
  styleContainerThuLai: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  styleTextDangTai: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 10
  },
  styleContentDangTai: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  styleContainerDangTai: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0004'
  },
  styleItem: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  }
});
