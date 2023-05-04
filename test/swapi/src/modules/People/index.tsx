import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BASE_URL = 'https://swapi.dev/api';

export type PeopleProps = Array<{
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: Array<string>;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: Array<string>;
  starships: Array<string>;
  url: string;
  vehicles: Array<string>;
}>;

const getPeople = async (): Promise<PeopleProps> => {
  const peopleJson = await fetch(`${BASE_URL}/people`);

  const {results} = await peopleJson.json();

  if (!results?.length) return [];

  return results;
};

export const People = (): JSX.Element => {
  const [people, setPeople] = useState<PeopleProps>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetPeople = async () => {
    setLoading(true);

    const results = await getPeople();

    if (!results?.length) {
      setLoading(false);
      return;
    }

    setPeople(results);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Star Wars</Text>

      <FlatList
        keyExtractor={item => item.name}
        style={styles.flatList}
        data={people}
        renderItem={({item}) => (
          <View style={styles.item}>
            {/* quebrar em um component DefaultText */}
            <View
              style={[styles.textContainer, {backgroundColor: 'lightgray'}]}>
              <Text>Name: </Text>
              <Text>{item.name}</Text>
            </View>

            <View style={styles.extraInfosContainer}>
              {/* Usar o componente de texto */}
              <View style={styles.textContainer}>
                <Text>Height: </Text>
                <Text>{item.height}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text>Hair color: </Text>
                <Text>{item.hair_color}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text>Eye color: </Text>
                <Text>{item.eye_color}</Text>
              </View>
              {/* Mostrar a quebra de textos */}
              {/* <View style={styles.textContainer}>
                <Text>Eye color: </Text>
                <Text>{item.eye_color}</Text>
              </View> */}
            </View>
          </View>
        )}
      />

      {loading && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}

      <TouchableOpacity onPress={handleGetPeople} style={styles.button}>
        <Text>Get People</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
    padding: 10,
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  flatList: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  item: {
    backgroundColor: 'lightgray',
    marginVertical: 4,
    padding: 8,
  },
  textContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 4,
    marginLeft: 8,
    padding: 8,
  },
  extraInfosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
