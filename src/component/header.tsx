import {StyleSheet, Text, View} from 'react-native';

export const Header = (props: {title?: string}) => {
  const {title = 'Products'} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    backgroundColor: '#F5F6FE',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    color: '#6E11E8',
    fontSize: 38,
    fontWeight: '600',
  },
});
