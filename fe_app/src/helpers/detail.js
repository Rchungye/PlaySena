import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect} from 'react';

export default function Detail({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
    });
  }, [navigation, route.params.title]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={route.params.image}
      />

      <View style={styles.detail}>
        <Text style={styles.detail_text}>
          &#12288;&#12288;{route.params.desc}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
  },
  title_text: {
    fontSize: 18,
    color: '#000000',
    margin: 12,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  detail: {
    alignSelf: 'flex-start',
  },
  detail_text: {
    fontSize: 16,
    color: '#333333',
    margin: 6,
  },
});