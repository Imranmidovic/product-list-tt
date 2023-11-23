import {Image, StyleSheet, Text, View} from 'react-native';

export const ListItem = (props: {
  imageUrl: string;
  title: string;
  subTitle: string;
  tag?: string;
}) => {
  const {imageUrl, title, subTitle, tag} = props;
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: imageUrl}} style={styles.itemImage} />
      <View style={styles.textArea}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        {!!tag && <Text style={styles.tag}>{tag}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    flexDirection: 'row',
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#EDEEFD',
  },
  textArea: {
    flex: 1,
    paddingLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D3B38',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#3D3B38',
  },
  tag: {
    textAlign: 'right',
  },
});
