import {useEffect, useRef, useState} from 'react';
import api from '../api';
import {Product} from '../types';
import {ListItem} from './list/item';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Header} from './header';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const pageSize = 10;
  const hasAnyMoreItemsToFetch = useRef(true);

  const getProducts = async (): Promise<Product[]> => {
    try {
      if (!hasAnyMoreItemsToFetch.current) return [];
      setIsLoading(true);
      const productsResponse = await api.getProducts({
        _page: page,
        _limit: pageSize,
      });

      return productsResponse;
    } finally {
      setIsLoading(false);
    }
  };

  const searchProducts = async (search: string) => {
    try {
      setIsLoading(true);
      const productsResponse = await api.getProducts({
        search,
      });
      setSearchedProducts(productsResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePagination = async () => {
    if (isLoading || searchText) return;
    const newProducts = await getProducts();
    setProducts([...products, ...newProducts]);
    setPage(page + 1);
    if (newProducts.length < pageSize) hasAnyMoreItemsToFetch.current = false;
  };

  const ListFooterComponent = () =>
    isLoading ? <ActivityIndicator style={styles.spinner} /> : null;

  const renderProduct = ({item}: ListRenderItemInfo<Product>) => {
    return (
      <ListItem
        title={item.model}
        subTitle={`${item.brand}: Released ${item.release_year}`}
        imageUrl={item.thumbnail}
        tag={item.price.toString()}
      />
    );
  };

  useEffect(() => {
    handlePagination();
  }, []);

  useEffect(() => {
    if (searchText) searchProducts(searchText);
    else setSearchedProducts([]);
  }, [searchText]);

  return (
    <>
      <FlatList
        data={searchText.length ? searchedProducts : products}
        renderItem={renderProduct}
        style={{paddingBottom: 50}}
        onEndReached={handlePagination}
        ListHeaderComponent={
          <>
            <Header />
            <TextInput
              style={styles.searchInput}
              value={searchText}
              placeholder="Search"
              onChangeText={txt => setSearchText(txt.trim())}
            />
          </>
        }
        ListHeaderComponentStyle={styles.listHeader}
        ListFooterComponent={ListFooterComponent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EDEEFD',
  },
  spinner: {
    marginVertical: 24,
  },
  listHeader: {
    marginBottom: 24,
  },
});
